# 普通酒馆小白 OS 商店 APP 施工方案

- 状态：已完成
- 依据：[商店 APP 终态设计](./shop-app-target-design.md)
- 原则：从第一行代码起位于终态边界内；完成领域、原子事务、Prompt、UI 和回归后才注册入口
- 确认日期：2026-08-30

## 1. 开工前检查

| 问题 | 结论 |
|---|---|
| 功能所有者 | `domains/shop`拥有目录、事件链、库存/效果和 Prompt 的纯规则；`apps/shop/application`拥有根协议、Economy 联动与应用服务；`apps/shop/host`拥有 Controller/Prompt 宿主适配；`ui`拥有界面 |
| 唯一事实来源 | 商品来自静态 catalog；库存/效果来自有效 Shop events 的线性重放；余额来自 Economy 流水 |
| 临时态 vs 持久态 | 页签、折叠、表单、dialog、busy 和投影缓存临时；购买/激活/关闭事件持久 |
| 外部依赖 | OS 根 store、普通剧情指纹、Economy、SillyTavern extension prompt、shell runtime |
| 注册入口 | host app registry、shell app registry、Shop Prompt runtime、根 validator/reconciler composition |
| 删除路径 | 删两个 Shop 目录和四处注册，清`domains.shop`与 Prompt key；Economy 独立保留 |
| 真正兼容对象 | SillyTavern 1.18 事件/Prompt 协议、浏览器/WebView、现行 OS chat root v2 |
| 无需兼容 | 未进入 upstream 的普通 OS Shop 草稿、Tavern Shop schema、Dexie/Phone boundary/archive |
| 最少必要测试 | 纯规则、原子购买、Prompt 最终位置、剧情回滚、Controller 关键行为、类型/构建/浏览器 |

## 2. 施工依赖方向

```text
Shop Vue
   ↓ serializable command / DTO
apps/shop/host/controller
   ↓
apps/shop/application/service ─────→ domains/shop pure rules
   ├─→ application/root-protocol ──→ domains/economy pure ledger command
   └─→ host/story-action-runner + chat-data-store
                               ↓
                 一个 xiaobaiOs 根保存与读回

domains/shop/prompt ─→ apps/shop/host/prompt-runtime ─→ SillyTavern
```

禁止：Economy import Shop、Wallet 代理购买、Vue 接触根 metadata、Shop import `modules/tavern/**`、`index.ts`出现商品 action 分支。

## 3. 阶段 A：把现有剧情写门提升为真实多领域能力

商店是第一个读写 Economy 的业务领域。施工前先把当前只由 Economy 使用、但语义实际属于 OS host 的剧情写门整理到正确层，不能让 Shop 反向依赖“钱包实现细节”。

### A1. 目标文件

```text
modules/xiaobai-os/host/story-write-gate.ts
modules/xiaobai-os/host/story-action-runner.ts
modules/xiaobai-os/host/story-reconciliation-runtime.ts
modules/xiaobai-os/host/production-composition.ts
```

- `story-write-gate.ts`：当前聊天处于故事保存确认期间时冻结所有剧情绑定写入。
- `story-action-runner.ts`：捕获 identity、内存故事、SHA-256 指纹和 commit guard，并在唯一根写队列中执行命令。
- `story-reconciliation-runtime.ts`：等服务端故事与内存前缀一致后，在一次根 mutation 中调用实际注册的 domain reconcilers。
- `production-composition.ts`：构造 store、Economy、Shop、APP runtime 和后台服务；`index.ts`只保留公共启停 API。

原先误放在 Economy 下的 story write gate 与 reconciliation runtime 已迁入`host/`，原文件已删除且没有转发壳。Economy repository 改为消费 host runner；公开余额、流水、冲正行为保持。

### A2. 通用契约

```ts
interface StoryBoundActionContext {
    identityKey: string;
    fingerprint: StoryFingerprint;
    anchor: XiaobaiOsStoryAnchor;
}

interface StoryDomainReconciler {
    key: string;
    reconcile(root: XiaobaiOsChatData, fingerprint: StoryFingerprint): DomainImpact;
}
```

只注册当前真实存在的领域，不为未来 APP 预埋空 reconciler。reconciler 返回完整候选分支与影响，不自行保存、不发 UI 消息。

### A3. 必须保持的原行为

- Wallet 激活和每次资金命令前仍执行对账。
- 编辑事件不等待服务端长轮询。
- 故事保存未确认期间所有资金/Shop 写入冻结。
- 根保存明确失败恢复旧对象；读回未确认保留候选并冻结。
- 四次元壁 repository 继续共用根写队列，但不被故事门错误冻结为“经济命令”。
- 切聊使排队动作与迟到 reconciliation generation 失效。

### A4. 验证

- 现有 OS 基线测试先原样通过，再增加多 reconciler 的可观察行为测试。
- 用公开输入输出证明 Wallet、四次元壁保存、编辑/swipe/删除回滚行为不变。
- 不写检查“文件已移动”或源码 includes 的测试。

## 4. 阶段 B：Shop 纯领域

新增：

```text
domains/shop/types.ts
domains/shop/catalog.ts
domains/shop/invariants.ts
domains/shop/timeline.ts
domains/shop/prompt.ts
domains/shop/README.md
tests/shop-domain.test.js
tests/shop-prompt.test.js
```

### B1. 类型和目录

1. 定义 catalog、input、duration、event/action、inventory、activation、错误和投影类型。
2. 独立录入 25 件审核商品；产品 ID、价格和效果语义可参考 Tavern，但普通 OS 文件不得 import Tavern。
3. 每件商品的可信规则与展示 description 分离。
4. 参数不直接插入可信句子；Prompt 输出把参数与静态 rule 分开。
5. 参数编码除 XML 转义外还要中和`{{...}}`，因为 SillyTavern 会对 extension prompt 再做宏展开。
6. catalog 构造时拒绝重复 ID、非法金额、未声明参数槽、permanent 配关闭规则等内部错误。

### B2. 纯命令

至少实现：

```text
createEmptyShopState
purchaseShopItem
activateShopItem
deactivateShopItem
projectShopState
validateShopDomain
reconcileShopWithStory
buildShopPromptBlock
```

纯命令不读取 SillyTavern、不访问 Economy repository、不保存 metadata、不 import Vue。

### B3. 时间线

- event revision 从 1 连续递增，eventId/actionId唯一，anchor 不得倒退。
- activate event 持久化规范化 parameters；不能只存 activationId 后再依赖 UI 草稿恢复。
- 相同 actionId 同规范化 action 完整重放；不同 action 冲突。
- reconcile 从第一条 story anchor 失效事件起裁掉后缀。
- 库存、activation 和关闭状态由有效事件线性重放；禁止每个 event 再保存完整 state。
- 空 events 等价于未拥有库存；不得为了打开页面写 revision 0。

### B4. 最低纯测试

- 25 件目录稳定、价格为正安全整数、ID 唯一。
- 使用只消费一件，数量不足失败不改变输入对象。
- exact duplicate 激活拒绝；不同目标可按 stacking 规则共存。
- manual 可关闭一次；permanent/turns 不可手动关闭。
- 一回合、N 回合、regenerate/swipe/continue 的目标回合边界正确。
- 参数规范化、限长和 XML 转义不能闭合标签。
- `{{user}}`、`{{char}}`或其他宏形态进入参数后仍是惰性文本，不能被 SillyTavern 二次解释。
- Prompt 无内部 ID/价格/anchor，空态不产生标题。
- 在旧 Assistant 回复完成后才激活的效果，不得倒灌进该回复的 regenerate/swipe。
- 第一条失效 event 之后全部裁切。

## 5. 阶段 C：Shop application + Economy 原子服务

新增：

```text
apps/shop/application/root-protocol.ts
apps/shop/application/service.ts
tests/shop-repository.test.js
```

### C1. 服务接口

```ts
interface ShopService {
    readCurrent(): ShopDomainView;
    purchaseCurrent(input: PurchaseInput): Promise<ShopDomainView>;
    activateCurrent(input: ActivateInput): Promise<ShopDomainView>;
    deactivateCurrent(input: DeactivateInput): Promise<ShopDomainView>;
}
```

Controller 只得到序列化 DTO，不得到 OS 根引用。

### C2. 购买事务

Runner 在动作执行前捕获 story fingerprint，进入根 mutation 后：

1. 读取并对账 Economy 与 Shop。
2. 校验 expected revision/eventId、catalog 和购买上限。
3. 调用 Economy pure`postAction`追加：

```text
from: player
to: system:sink
kind: shop_purchase
sourceDomain: shop
sourceId: itemId
idempotencyKey: shop:purchase:<actionId>
```

4. 用同一 actionId 追加 purchase event；quantity 由事件投影增加。
5. 校验 Shop、Economy、交叉 action 和根 v2。
6. commit guard 再次确认故事与聊天 identity，单次保存并读回。

价格只能从 catalog 取，不能来自 iframe payload。

### C3. 使用和关闭

- 使用、关闭不追加零金额流水。
- 仍经过 runner，避免切聊、剧情变化或未确认保存期间写入。
- Host 在提交前再次确认当前没有进行中的主 RP；只靠按钮 disabled 不构成边界。
- 成功结果以服务端确认后的 Shop DTO 返回；刷新 UI 失败不能反报领域动作失败。

### C4. 根 validator

生产 composition 注册`domains.shop` validator，并增加交叉不变量：每条`shop_purchase`资金 action 都有同 actionId 的 purchase event；purchase event 的 item/金额与 catalog 一致。未知其他 domains 保持原值，不由 Shop validator解释。

### C5. 集成测试

- 购买成功：一次保存后余额减少且 quantity 增加。
- 余额不足、CAS 过期、故事变化：两边都不变。
- actionId 重放不重复扣款或加库存。
- 保存明确失败恢复两边；未确认保留候选且冻结第二次使用。
- 使用/关闭不创建 Economy 交易。
- 切聊前排队的购买不能落到新聊天。
- 回滚到购买/使用/关闭前，Shop 与 Wallet 投影一致。

## 6. 阶段 D：主 RP Prompt runtime

新增：

```text
apps/shop/host/prompt-runtime.ts
```

### D1. 事件与请求分类

- 监听`GENERATION_STARTED`并先清空 Shop key；被命令中断、quiet、impersonate或上一请求异常都不能沿用旧值。
- 监听`GENERATION_AFTER_COMMANDS`，此时 slash command 已确定不会中断，Prompt 尚未收集。
- 根据 generation type 构造目标故事前缀和目标 Assistant turn。
- normal：当前前缀，目标为已完成 Assistant 数 + 1。
- regenerate/swipe：虚拟移除被替换的末尾 Assistant 后再投影。
- continue：保留当前 Assistant 故事前缀，但目标 turn 仍是当前回复序号。
- quiet/impersonate/未知类型：清空 Shop key。
- dry run只读使用相同投影，保证 Prompt Inspector 与真实请求一致。

### D2. 写入 extension prompt

使用一个 Shop 专属 key：

```text
value: buildShopPromptBlock(...)
position: IN_CHAT
depth: 1
role: SYSTEM
scan: false
```

必须用最终请求或 SillyTavern 公开 Prompt 观察结果证明位置：normal/regenerate/swipe 位于当前 USER 正前方，continue 位于被续写 Assistant 正前方。不能只测`setExtensionPrompt`被调用。

### D3. 清理

每次 generation started 先清空；generation ended/stopped、CHAT_CHANGED、OS disable、LittleWhiteBox disable 和 runtime cleanup 也全部清空同一个 key。投影出错先清空再报告，禁止上一请求或上一聊天残留。

### D4. 行为测试

- normal 的一回合商品只影响下一 Assistant。
- 原回复重答/swipe 时效果仍在；后续新回合出现一次到期规则，再下一回合消失。
- 原回复完成后才激活的商品不会倒灌进该回复的重答/swipe，而是等待下一个新 Assistant 回合。
- continue 不重复消耗。
- quiet、四次元壁和任务外部 Agent 请求不包含 Shop。
- story rollback 后不注入未来 activation。
- 用户动态参数只能出现在 parameters 数据区，不能改变 rule 区字节。

## 7. 阶段 E：Controller、UI 与注册

新增：

```text
apps/shop/descriptor.ts
apps/shop/types.ts
apps/shop/host/controller.ts
apps/shop/host/presentation.ts
apps/shop/ui/*.vue
apps/shop/ui/shop.css
apps/shop/README.md
tests/shop-controller.test.js
```

### E1. Host Controller

- activate 时若 Economy 尚不存在，先走其既有开户流程，再完成故事对账并读取 catalog、Shop view、balance/write state；打开页面不创建 Shop 数据。
- `shop/refresh`、`shop/purchase`、`shop/activate`、`shop/deactivate`、`shop/confirm-save`是全部协议。
- 每条写命令带 chat identity、expected revision/eventId 和 actionId。
- 同时只允许一个 busy action；切聊/deactivate使 request generation 失效。
- 成功后返回 Shop 与 Wallet 所需的最新余额字段；钱包 APP 下次打开仍自行读取 Economy。

### E2. UI

- `/shelf`与`/inventory`在 Shop 组件内维护，不修改 OS 系统路由。
- 货架支持真实分类过滤；固定 25 项无需虚拟列表。
- 背包分为生效中、持有、已耗尽。
- 使用 dialog 根据 catalog DTO 渲染字段，切项和关闭时销毁草稿。
- 永久效果二次确认；manual 才显示关闭。
- 余额不足、写冻结、故事对账、生成中分别显示原因。

### E3. 注册

只有 A–E 全部完成并通过相关测试后，才同时添加：

- host app runtime registry 一条 Shop registration。
- shell app registry 一条 Shop component/descriptor。

图标使用独立 SVG 路径或组件；不要继续扩张`XiaobaiOsHome.vue`里的`v-if/else`图标分支。施工时把图标收敛为 APP definition 持有的组件或 path data，这是已经出现多个真实 APP 后的必要抽象。

## 8. 阶段 F：全量验证与提交

### 自动质量门

```text
npm run build:xiaobai-os
npm run test:xiaobai-os
npm run test:tauritavern-chat-surface
npm run lint
npm run build:assistant:manifest
npm run test:assistant:workspace
git diff --check
```

### 真实浏览器验收

1. 聊天 A 首次购买：确认一次扣款、一次入库和服务端读回。
2. 购买但不使用：主 RP Prompt 不出现效果。
3. 使用一回合商品：下一回复、regenerate、swipe 都有效；后续回合正确结束。
4. 使用 5 回合、manual、permanent 商品，检查刷新和关闭后的恢复。
5. Prompt Inspector 分别验证 Chat Completion 与 Text Completion：normal/regenerate/swipe 的 depth 1 system 位于当前 USER 前，continue 位于被续写 Assistant 前；quiet 请求无 Shop。
6. 输入含`</effect>`、换行和伪指令，确认只作为 parameters 文本。
7. 编辑、swipe、中间删除、尾删和创建分支，确认钱包与背包共同回滚。
8. 模拟明确保存失败、读回未确认和第三值冲突，确认 UI 不伪报成功。
9. 切聊天 B，确认余额、库存、效果和 dialog 草稿均不串聊。
10. 桌面、390×844、暗色、亮色、键盘与 reduced motion 验收。

### 提交边界

推荐在一个完整功能提交中交付；若中间提交，未完成阶段不得注册可见入口。最终提交必须包含源码、测试、文档、assistant manifest 和构建产物。

## 9. 通盘 Review

### 所有权

- [ ] Economy、Wallet、OS lifecycle 不含商品判断。
- [ ] Shop 不 import Tavern、任务、银行或四次元壁领域。
- [ ] Prompt runtime 只调用纯投影，不拥有库存。
- [ ] `index.ts`仅公共生命周期；production composition只组装，不实现业务。

### 数据与错误

- [ ] 无余额副本、完整 state 快照链、localStorage锁或每回合倒计时记录。
- [ ] 价格和规则不信任 iframe。
- [ ] action幂等、CAS、根保存和 story guard 顺序完整。
- [ ] 未确认保存冻结该聊天的全部 OS 根写入。

### Prompt

- [ ] 真实最终位置正确，不以 contains 测试代替。
- [ ] 重答/swipe/continue 的目标回合正确。
- [ ] quiet和外部 Agent不泄漏。
- [ ] 动态参数与可信规则隔离。
- [ ] 投影失败先清空旧值。

### UI 与删除

- [ ] 所有看起来可操作的元素都是真实按钮/字段。
- [ ] 生成中、余额不足、冻结和冲突有不同文案。
- [ ] 删 Shop 目录、注册和一次数据清理即可退场。
- [ ] 没有任务、不明物或地图占位代码。

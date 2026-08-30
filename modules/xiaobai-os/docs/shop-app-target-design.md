# 普通酒馆小白 OS 商店 APP 终态设计

- 状态：已实施
- 适用范围：普通 SillyTavern / `modules/xiaobai-os/**`
- 不适用范围：`modules/tavern/**`小白酒馆商店
- 确认日期：2026-08-30

## 1. 产品定位

商店是普通小白 OS 的消费与剧情效果领域。玩家使用钱包中的小白币购买固定奇物，商品进入当前普通聊天的背包；只有玩家随后明确“使用”，才会产生主剧情效果。

```text
钱包余额 ──购买──→ 背包库存 ──使用──→ 主 RP 效果
   ↑                    │                  │
Economy 唯一账本         Shop 唯一状态链      只读 Prompt 投影
```

商店不生成商品、不调用模型、不自行修改主聊天消息。商品价格、持续时间、输入项和效果规则均来自人工审核的静态目录。

### 已确认决策

- 购买与使用是两个独立动作；购买不会立即影响剧情。
- 第一版采用 25 件固定商品及当前审核后的价格和效果语义，但在普通 OS 内独立建模，不 import Tavern catalog。
- 商品只作用于普通主 RP；普通 OS 当前没有独立“信息”通讯领域，因此不向四次元壁、任务生成、后台总结或 quiet 请求注入。
- 效果进入当前 USER 消息正前方的`SYSTEM / IN_CHAT / depth 1`位置。
- 一回合表示一次目标 Assistant 回复；重答、swipe 和 continue 不额外消耗回合。
- 使用动作不插入伪造的主聊天消息。
- 购买扣款、背包入库和剧情锚点在同一次 OS 根保存中确认。
- 不明物和任务均不在本阶段消费商品。

## 2. 所有权和不变量

### `domains/shop`拥有

- 静态商品目录、价格、输入声明和人工效果规则。
- 背包数量、效果实例、使用与手动关闭状态。
- Shop 领域版本、幂等、CAS、不变量和按故事前缀裁切的纯规则。
- 当前主剧情下的效果投影。

### `apps/shop`拥有

- `application/`：OS 根协议、Shop-Economy 交叉不变量、剧情对账、命令编排和应用服务。
- `host/`：Controller、iframe/SillyTavern 协议适配和 Prompt 生命周期。
- `ui/`：交互、错误文案和渲染；不接触根数据或资金规则。

### 外部能力仅提供

- Economy：余额、不可变流水和非透支规则。
- OS host：当前聊天 identity、剧情快照、根写队列和服务端读回确认。
- SillyTavern：前台生成事件与`setExtensionPrompt`。
- OS shell：APP 注册、导航、设备窗口和生命周期。

### 核心不变量

1. 余额只来自`domains.economy.transactions`，Shop 不保存余额副本。
2. 商品事实只来自静态 catalog；UI 不传价格、持续时间或效果文本。
3. 当前背包与效果只由当前剧情前缀内的 Shop 事件链重放得出，不另存`currentState`或完整状态快照。
4. 购买的 Shop 事件和 Economy 流水必须在同一个`xiaobaiOs`候选根中保存或共同失败。
5. 使用和关闭不产生资金流水，但仍通过根写队列、story anchor、actionId 和版本 CAS。
6. Prompt 构建只读，不扣库存、不追加版本、不推进回合。
7. 动态参数只是数据，不能成为 Prompt 指令。
8. 剧情编辑、swipe、删除、移动、分支或漏事件重载后，Shop 与 Economy 必须恢复到同一有效剧情前缀。
9. 保存结果未确认时，该聊天的 Shop 写操作与其他 OS 根写操作共同冻结。
10. 未完成实现前不注册商店图标或空页面。

## 3. 终态目录

```text
modules/xiaobai-os/
├─ apps/shop/
│  ├─ descriptor.ts
│  ├─ types.ts
│  ├─ application/
│  │  ├─ root-protocol.ts
│  │  └─ service.ts
│  ├─ host/
│  │  ├─ controller.ts
│  │  ├─ prompt-runtime.ts
│  │  └─ presentation.ts
│  ├─ ui/
│  │  ├─ ShopApp.vue
│  │  ├─ ShopShelf.vue
│  │  ├─ ShopInventory.vue
│  │  ├─ ShopActionDialog.vue
│  │  └─ shop.css
│  └─ README.md
├─ domains/shop/
│  ├─ types.ts
│  ├─ catalog.ts
│  ├─ invariants.ts
│  ├─ timeline.ts
│  ├─ prompt.ts
│  └─ README.md
└─ tests/
   ├─ shop-domain.test.js
   ├─ shop-repository.test.js
   ├─ shop-prompt.test.js
   └─ shop-controller.test.js
```

`prompt-runtime.ts`只负责 Shop 当前唯一真实 Prompt 消费者，不提前建立“未来多 APP Prompt SDK”。任务真正施工且形成第二个消费者时，再由 composition 收敛顺序。

## 4. 持久模型

### 4.1 为什么持久化

库存和持续效果必须跨刷新、切聊、浏览器重启和聊天导出保留，并且需要随普通剧情分支与回滚，因此不能是 Vue 状态、localStorage 缓存或运行期计时器。

### 4.2 唯一位置

```ts
interface ShopDomainV1 {
    schemaVersion: 1;
    events: ShopEvent[];
}

interface ShopEvent {
    revision: number;
    eventId: string;
    actionId: string;
    action: ShopAction;
    anchor: XiaobaiOsStoryAnchor;
    assistantTurn: number;
    createdAt: number;
}

type ShopAction =
    | { kind: 'purchase'; itemId: string }
    | {
        kind: 'activate';
        itemId: string;
        activationId: string;
        parameters: Record<string, string>;
    }
    | { kind: 'deactivate'; itemId: string; activationId: string };

// 只读重放得到，不持久化为第二份状态
interface ShopActivation {
    activationId: string;
    itemId: string;
    parameters: Record<string, string>;
    startsAtAssistantTurn: number;
    activatedByEventId: string;
    deactivatedByEventId?: string;
    transitionAtAssistantTurn?: number;
}
```

- `domains.shop`在第一次成功购买时创建；打开商店和浏览货架不创建 Shop 数据。
- `events`按 revision 严格递增；`revision + eventId`是 CAS token。
- `action`保存完整规范化业务输入，`assistantTurn`保存动作发生前已完成的 Assistant 回复数。激活从其下一目标回复开始；关闭转换同样落在下一目标回复。
- 库存、激活和关闭状态由事件链线性重放；不在每一步复制整个背包，避免聊天 metadata 随操作次数平方膨胀。
- 同一`actionId`、相同规范化 action 返回已存在结果；同一`actionId`配不同 action 必须报冲突。UI 每次明确动作生成新 actionId，超时重试沿用原 actionId。
- 不另建 IndexedDB、余额缓存、持久投影缓存或持久锁。运行期可按最后一个 eventId 缓存只读投影，切聊或事件链变化即丢弃。

## 5. 商品目录

| 商品 | 价格 | 持续 |
|---|---:|---|
| 花 | 50 | 1 回合 |
| 精致礼盒 | 120 | 1 回合 |
| 不生气贴纸 | 80 | 5 回合 |
| 崇拜滤镜 | 200 | 5 回合 |
| 嫉妒种子 | 300 | 5 回合 |
| 记忆顺滑剂 | 100 | 1 回合 |
| 记忆橡皮擦 | 300 | 1 回合 |
| 身份卡 | 500 | 10 回合 |
| 反转贴纸 | 250 | 5 回合 |
| 吐真剂 | 500 | 3 回合 |
| 隐私摄像头 | 1200 | 手动关闭 |
| 言听计从 | 1200 | 永久 |
| 隐身斗篷 | 300 | 5 回合 |
| 言出法随 | 2000 | 永久 |
| 万人迷 | 800 | 5 回合 |
| 诚实之世 | 1500 | 3 回合 |
| 和平光环 | 400 | 5 回合 |
| 平凡面孔 | 300 | 5 回合 |
| 换形卡 | 600 | 10 回合 |
| 妙手回春 | 150 | 1 回合 |
| 时停怀表 | 2000 | 永久 |
| 岁月之门 | 2000 | 手动关闭 |
| 咫尺符 | 300 | 1 回合 |
| 结界 | 500 | 5 回合 |
| 呼风唤雨 | 200 | 1 回合 |

目录为代码中的冻结产品事实。每项还必须声明：稳定 ID、类别、展示文案、输入字段、叠加规则、购买上限、可信效果规则、可选到期/关闭规则。

改价或改变金融含义时发布新商品 ID；仅修改展示文案不得改变已有激活实例的解释。已发布 ID 不可被另一种商品复用。

## 6. 购买、使用与关闭

### 6.1 购买

购买输入只包含：`itemId`、`actionId`和 UI 观察到的`expectedRevision + expectedEventId`。服务从 catalog 读取真实价格，在同一次根 mutation 中：

1. 捕获当前聊天与剧情指纹。
2. 按当前故事裁切 Shop 和 Economy 的失效后缀。
3. 校验 Shop 事件链 CAS、购买上限和玩家余额。
4. 追加`player -> system:sink`的`shop_purchase`流水。
5. 追加 purchase event；背包数量由事件重放增加。
6. 校验完整候选根，保存并从服务端读回确认。

明确失败时两边恢复；结果未确认时保留候选并冻结，不显示“已购买”。

### 6.2 使用

背包点击使用后，UI只展示 catalog 声明的输入：目标人物、身份、外貌、年代、地点、天气或世界规则。建议值可来自当前可见剧情中的名字，但建议不是合法性边界，用户仍可输入新人物或地点。

提交时：

- 输入执行 NFKC、控制字符清理、空白整理和 Unicode code-point 限长。
- 生成不可复用的 activation ID。
- 在当前事件投影上校验数量后追加 activate event；背包数量与 activation 由重放同时变化。
- 相同`itemId + 规范化参数`已有有效实例时拒绝重复激活，不扣库存。
- 使用期间若主 RP 已经开始生成，动作被 UI 和 Host 双重拒绝，避免对已组装 Prompt 的归属产生歧义。

购买时已经完成付款，使用不再扣币。

### 6.3 手动关闭与永久效果

- 只有`manual`效果可关闭；关闭只追加 deactivate event，投影据此结束对应 activation。
- `permanent`使用前必须二次确认；成功后没有关闭入口。
- `turns`效果自动按目标 Assistant 回合投影，不写“倒计时递减”版本。

## 7. 回合语义

Shop 使用“目标 Assistant 回复序号”，不使用现实时间、数组长度或定时器。

- 当前可见剧情已完成 N 次 Assistant 回复，新的普通生成目标回合是 N+1。
- 使用发生在此刻时，`startsAtAssistantTurn = N + 1`。
- `rounds = R`在`[start, start + R)`目标回合内有效。
- regenerate/swipe 的目标是被替换的 Assistant 回合，不消耗新回合；投影先构造移除旧目标回复的虚拟剧情前缀。
- continue 仍属于当前 Assistant 回合，沿用该回合效果。
- quiet、任务 Agent、四次元壁 Agent、Prompt 预处理和后台总结不属于主 RP 回合。
- 原 Assistant 回复完成后才使用的商品，重答/swipe 该旧回复时会因 activation event 的故事 anchor 不在虚拟前缀内而不生效，不能倒灌到过去。

一次性商品因此完整影响下一次 Assistant 回复。该回复重答或换 swipe 时效果仍在；只有玩家继续到下一次新的 Assistant 回复，才进入到期边界。

## 8. Prompt 投影

### 8.1 注入时机和位置

Shop runtime 在 SillyTavern `GENERATION_AFTER_COMMANDS`时为本次请求重新投影：

```text
position: IN_CHAT
depth: 1
role: SYSTEM
normal/regenerate/swipe: 当前 USER 消息正前方的 system 块
continue: 被续写 Assistant 消息正前方的 system 块
```

只对真实主 RP 的 normal/regenerate/swipe/continue 路径启用。dry-run/Prompt Inspector可使用同一只读投影以保持 token 预览一致，但不得写状态。每次`GENERATION_STARTED`先清空旧值，quiet、impersonate及其他后台生成保持为空；只有通过命令阶段的主 RP 才在`GENERATION_AFTER_COMMANDS`写入本次投影。

每次投影都依据该生成真正使用的可见剧情前缀读取有效 Shop 事件；不能长期把一段字符串挂在`extension_prompts`里。生成结束、聊天切换、OS 停用和 cleanup 均清空该 key。

### 8.2 内容边界

```xml
<xiaobai_os_shop_effects>
  <effect>
    <parameters>
      <target_name>规范化且转义后的普通文本</target_name>
    </parameters>
    <rule>来自静态目录的可信规则，只通过字段名引用参数。</rule>
  </effect>
</xiaobai_os_shop_effects>
```

- 动态值与可信规则分开，禁止把用户文本直接替换进命令句。
- 动态值统一转义`& < >`，并在写入前中和`{{...}}`形式，防止 SillyTavern 对 extension prompt 再做宏展开；Prompt 明确参数只是名称或描述，不是指令。
- 展示 description 不自动扩写为规则。
- Prompt 不暴露 itemId、activationId、actionId、eventId、价格或 story hash。
- 只有 catalog 明确带到期规则的有限状态效果，才在首个到期目标回合投影一次人工审核的解除说明；赠礼、治愈、传送、天气和记忆改变等一次性既成事实不投影反向撤销。
- manual 关闭同理只在下一目标回合投影一次关闭说明。
- 无有效效果和转换时设置空字符串，不输出空标题。

任务成为第二个真实 Prompt 消费者前，不为它创建空 contributor。届时应把任务事实放在 Shop 效果之前，并保证 Shop 仍是当前 USER 前最后一段约束。

## 9. 剧情回滚与分支

- 每个 Shop event 自带普通故事 anchor。
- 对账找到第一条 anchor 失效的 Shop event 后裁掉该事件及其后全部事件。
- Economy 仍按自己的 action 后缀裁切；composition 在同一次根 mutation 中执行两者并校验交叉 action。
- 回到购买前：扣款和库存共同消失。
- 回到使用前：商品恢复为未使用库存，activation 消失。
- 回到关闭前：manual 效果重新有效。
- 回到持续期间：剩余回合从当前分支的 Assistant 序号重新投影。
- 分支复制聊天 metadata 后，首次读取按分支剧情指纹裁掉未来事实；原聊天不受影响。

裁掉的数据不会因把正文改回原文本而复活，用户需重新执行业务动作。

## 10. UI 目标

视觉方向为“朱漆奇物柜”：深墨背景、克制朱红封签、纸张与金属细节。它属于同一小白 OS，但不复用钱包的金棕账本外观。

APP 内只有两个根页签：

```text
货架：分类、商品卡、价格、效果、购买
背包：生效中、持有、已耗尽
```

- 商品卡不伪造库存、折扣、倒计时或随机推荐。
- 钱包未 ready、余额不足、保存冻结或正在生成时，按钮禁用且显示具体原因。
- 购买与使用均有确认层；永久效果明确提示不可关闭。
- 使用表单只渲染商品声明的字段，并在切商品、切聊、关闭 APP 时清空。
- 生效中显示作用对象和自然持续文案；不暴露内部回合号。
- 已耗尽默认折叠，折叠和页签只属于当前 APP activation 的 Vue 临时态。
- 桌面设备和移动全屏都维持 44px 触控目标、可见 focus、真实 label/dialog 语义和独立滚动。

## 11. 错误和并发

- 余额不足：不扣款、不入库。
- CAS 冲突：刷新 Shop 与 Wallet，只提示状态已变化，不自动重放付费动作。
- 保存未确认：保留候选现场，冻结后续写入，提供统一确认入口。
- 聊天切换：旧请求和对话框失效，不能提交到新聊天。
- Prompt 投影失败：清空 Shop 注入并记录错误；不能把半段或上一聊天效果留给模型。下一次任何生成开始时也先清空旧值。
- 未知商品或未知 Shop schema：停止读取/写入并明确报错，不按当前目录猜测。
- 快速双击：Controller 单 busy action，领域 actionId 幂等为最终防线。

## 12. 删除路径

删除商店：

1. 决定保留或清理历史`sourceDomain = shop`流水；若保留，Wallet 使用交易自身标题展示，不依赖 Shop。
2. 删除`apps/shop/`、`domains/shop/`及 host/shell 注册。
3. 删除 Shop Prompt runtime，并清空 SillyTavern extension prompt key。
4. 从 composition 的 validator/reconciler 列表移除 Shop。
5. 对可升级聊天删除`domains.shop`。
6. 删除 Shop 测试和文档链接。

Economy 与钱包继续保留，不留下 Shop 类型、旧 API、空 hook 或兼容壳。

## 13. 非目标

- 不由模型生成商品、价格或效果。
- 不让商品修改四次元壁、任务 Agent、银行随机结果或未定稿的不明物。
- 不做装备栏、属性面板、随机抽卡、促销和限时活动。
- 不扫描或重写历史主聊天正文。
- 不为普通 OS 不存在的私人消息渠道注入效果。
- 不把 Tavern IndexedDB、Phone boundary、session turn 或 catalog 运行时搬入普通 OS。

# 普通酒馆经济平台与钱包第一阶段施工方案

- 状态：已施工并完成 Review 与真实浏览器验收
- 设计依据：[经济平台终态设计](./economy-platform-target-design.md)
- 本阶段交付：根级数据写入边界、普通剧情锚点、Economy 核心、钱包 APP、剧情回滚
- 不交付：信息、地图、任务、商店、银行/游戏和宠物的页面、类型或占位实现

## 0. 实施结果

- 根级 chat data store、APP runtime registry、剧情快照适配、Economy 账本/回滚和钱包 APP 均已落地。
- Economy 自己拥有剧情写入门与对账运行时；host 只提供 SillyTavern 快照、事件和持久读回，不包含账本文案或回滚业务。
- 已用真实 SillyTavern 验证编辑、swipe、尾删、中间单删、保存确认、切聊、重新对账和从历史楼层创建分支。分支只保留分支点前有效流水，原聊天不受影响。
- 已验证桌面与 390×844 移动端钱包界面。测试 Token 返回 401 时，四次元壁会恢复输入并只显示归一化错误告警，不会把原始 JSON 保存或显示成 AI 回复；本次不声称供应商成功生成。
- 自动检查和最终提交以本文第 12 节列出的质量门为准。

## 1. 完成定义

第一阶段完成时，用户可以：

1. 在已开启的小白 OS 桌面看到“钱包”图标。
2. 首次进入当前聊天的钱包后看到 100 小白币开户余额和一笔开户流水。
3. 刷新页面、关闭再打开 OS 后读取同一聊天的已确认账本。
4. 切换普通聊天后看到该聊天自己的钱包；空聊天不借用上一聊天数据。
5. 编辑、swipe、删除、移动或分支导致剧情前缀变化时，看到失效流水被安全回滚。
6. 保存明确失败时看到动作失败且账本不变；保存结果未确认时看到冻结状态，不能继续发生资金写入。
7. 继续正常使用四次元壁，四次元壁的数据和行为没有因根仓库调整而改变。

同时必须满足：

- Economy 是独立共享领域，钱包是只读 APP。
- 根`index.ts`、四次元壁 Controller 和钱包 Controller 均不出现其他未来 APP 的业务分支。
- 不 import`modules/tavern/**`，不创建 IndexedDB、localStorage 账本或余额快照。
- 不保留测试线 OS chat schema v1 的运行时兼容分支。
- upstream 四次元壁旧数据仍可一次性迁移到当前 OS 根。

## 2. 开工前边界检查

| 问题 | 结论 |
|---|---|
| 功能所有者 | `domains/economy`拥有账本；`apps/wallet`拥有钱包 UI；`host`拥有普通聊天与保存适配 |
| 唯一事实来源 | 当前聊天`chat_metadata.extensions.LittleWhiteBox.xiaobaiOs.domains.economy.transactions` |
| 临时态 | APP 路由、分页、加载、对账任务、请求 generation、保存冻结标记 |
| 持久态 | 已确认的交易流水；余额由流水推导 |
| 外部依赖 | SillyTavern 当前聊天、事件、元数据保存与聊天 API 读回；Web Crypto SHA-256 |
| 注册入口 | 根 composition 注册 Economy story runtime 与 Wallet runtime；shell 注册一个钱包 descriptor |
| 删除路径 | 删 Wallet 可保留 Economy；删 Economy 前必须先移除所有消费者，再删 domain 与数据根 |
| 兼容对象 | upstream 当前四次元壁设置/聊天数据、SillyTavern 1.18 事件/API、浏览器/WebView |
| 不兼容对象 | origin 测试线 OS schema v1、小白酒馆 DB/schema/session |
| 最少测试 | 账本不变量、幂等/冲正、剧情指纹、回滚、根保存状态机、聊天隔离、钱包可观察行为、四次元壁回归 |

## 3. 施工后的源码结构

```text
modules/xiaobai-os/
├─ types.ts
├─ index.ts
├─ host/
│  ├─ app-runtime-registry.ts
│  ├─ chat-data-store.ts
│  ├─ story-adapter.ts
│  ├─ story-fingerprint.ts
│  ├─ legacy-migration.ts
│  ├─ settings-repository.ts
│  ├─ lifecycle.ts
│  ├─ frame-bridge.ts
│  ├─ story-write-gate.ts
│  ├─ story-action-runner.ts
│  ├─ story-reconciliation-runtime.ts
│  ├─ production-composition.ts
│  └─ sillytavern-context.ts
├─ domains/economy/
│  ├─ types.ts
│  ├─ invariants.ts
│  ├─ ledger.ts
│  ├─ timeline.ts
│  ├─ repository.ts
│  └─ README.md
├─ apps/fourth-wall/
│  ├─ types.ts
│  └─ host/create-runtime.ts
├─ apps/wallet/
│  ├─ descriptor.ts
│  ├─ host/controller.ts
│  ├─ ui/
│  └─ README.md
└─ tests/
   ├─ chat-data-store.test.js
   ├─ story-fingerprint.test.js
   ├─ economy-ledger.test.js
   ├─ economy-rollback.test.js
   ├─ wallet-controller.test.js
   └─ fixtures/
```

文件名表达职责，不要求为了目录图创建空文件。施工时只有出现真实代码才创建。

## 4. 阶段 A：先修正 OS 公共所有权

### A1. 根类型退回 OS

当前`apps/fourth-wall/types.ts`同时声明`XiaobaiOsSettings`、`XiaobaiOsChatData`、聊天 identity 和 APP runtime DTO。增加第二个 APP 前必须拆开：

- `modules/xiaobai-os/types.ts`只放 OS 根、聊天 identity、runtime/descriptor 和 frame 公共形状。
- 四次元壁消息、会话、Prompt 和媒体类型继续留在`apps/fourth-wall/types.ts`。
- Economy 与 Wallet 不 import 四次元壁类型。
- 根数据中 APP/domain 分支保持可选；打开钱包不创建四次元壁，打开四次元壁也不创建 Economy。

### A2. APP runtime registry

当前 lifecycle 只接收一个同时判断`appId`的 runtime。改为通用 registry：

```ts
interface XiaobaiOsAppRuntime {
    activate(context): Promise<unknown> | unknown;
    deactivate(reason): void;
    handleMessage(message): Promise<unknown> | unknown;
    cancelForeground(reason): void;
    cancelAll(reason): void;
}
```

- registry 按 descriptor id 查找一个前台 runtime。
- activate/deactivate/APP 消息只路由到目标或当前前台 runtime。
- window、chat、start/stop 等宿主生命周期广播给去重后的已注册 runtime 与后台 service；各功能仍在自己的 runtime 内处理，不塞进一个 Controller。
- 未知 app/action 明确失败，不 fallback 到四次元壁。

### A3. Composition root 收薄

把四次元壁 Agent、设置弹窗、图片、语音和吐槽的依赖装配移到`apps/fourth-wall/host/create-runtime.ts`。根`index.ts`只做：

1. 创建 SillyTavern adapters。
2. 创建根 chat data store 和 settings store。
3. 创建实际存在的 APP runtimes。
4. 注册 descriptors、Economy 剧情对账 runtime 与 cleanup。

不把钱包 action 增加到现有 801 行四次元壁 Controller。

## 5. 阶段 B：建立唯一根级 chat data store

### B1. 公共接口

替换当前只暴露 FourthWall 方法的`chat-metadata-repository.ts`。根 store 只负责 OS 根，不认识会话、余额或钱包：

```ts
interface XiaobaiOsChatDataStore {
    readCurrent(): XiaobaiOsChatDataV2 | null;
    mutateCurrent<T>(command: RootMutation<T>): Promise<T>;
    confirmPending(): Promise<ConfirmResult>;
    getWriteState(): 'ready' | 'saving' | 'unconfirmed' | 'conflict';
}
```

领域 repository 只在`mutateCurrent`闭包中选择自己的分支。所有 APP 共用同一写队列。

### B2. Mutation 流程

每次写入：

1. mutation 调用时只捕获发起聊天的 identity token；任务真正执行时确认当前聊天仍匹配该 token，再读取当下的 metadata 对象。不能在排队前持有 metadata 引用，也不能切聊后改写新聊天。
2. 校验当前 OS 根版本。
3. 克隆根对象，在克隆上执行纯 mutation。
4. 校验候选根结构，并由 composition 中已注册的分支 validator 校验四次元壁与 Economy 当前模型。
5. 再次核对 chat identity、metadata 引用与可选 story anchor。
6. 一次安装候选并调用 SillyTavern 元数据保存。
7. 从服务端读回整个`xiaobaiOs`根做 JSON 语义比较；对象键顺序不构成差异，数组顺序仍是数据。

明确失败恢复旧对象；未确认保留候选并把 store 置为`unconfirmed`，拒绝后续 mutation。

### B3. 未确认恢复

`confirmPending()`只做读回核实：

- 服务端等于候选：确认并回到`ready`。
- 服务端等于旧对象：恢复旧对象，回到`ready`，原动作返回未保存。
- 服务端是其他值：进入`conflict`，保持只读并要求刷新。
- 网络仍失败：保持`unconfirmed`。

不做字段级自动 merge。资金事实不能靠猜测合并。

当前 SillyTavern 临时聊天若尚无稳定`chatId`，host 不制造替代 identity，也不创建 OS 数据；钱包和四次元壁明确提示先打开可持久化聊天。

### B4. 四次元壁适配

在`apps/fourth-wall/host/repository.ts`中基于根 store 实现现有四次元壁 read/prepare/mutate/delete 接口。其公开行为保持不变：

- 首次进入才创建四次元壁分支。
- upstream legacy`fw`仍在首次进入时迁移。
- 保存结果未确认仍保留候选现场，但因根 store 冻结，不允许第二次写扩大不确定性。

## 6. 阶段 C：普通聊天剧情指纹

### C1. Host snapshot DTO

从 SillyTavern 读取只含以下字段的消息快照：

```ts
interface StoryMessageSnapshot {
    role: 'user' | 'assistant' | 'system';
    name: string;
    text: string;
}
```

不得把`getContext().chat`对象、Vue Proxy、DOM 或完整 message extra 存进 OS 数据。

### C2. 规范化与哈希

- 使用带版本前缀的稳定 JSON 编码。
- 从开局常量开始链式计算 SHA-256。
- 空聊天锚点固定为`floor: -1`。
- 说话者取 SillyTavern 当前消息与持久聊天记录中的`name`；role/name/text 三者一起参与指纹，内存与服务端使用同一投影规则。
- 每次捕获或对账在一次消息遍历中生成临时前缀 hash 数组，按楼层读取后立即释放；不为每笔交易重复从第 0 层计算，也不持久化 checkpoint。
- 相同 role/name/text 序列必须产生相同 hash。
- 编辑文本、改变角色/说话者、插入、删除、移动或选择不同文本 swipe 必须改变受影响层及之后的 hash。
- 同文本的不同 swipe 视为同一可见剧情，不因 swipe 内部编号不同强制回滚。

### C3. 内存与服务端故事确认

SillyTavern 的`MESSAGE_EDITED`发生在宿主最终保存聊天之前，删除也可能只触发 debounced save。Story runtime 不得在事件回调里立刻永久裁账：

1. 事件到达时同步取消旧资金动作，把当前聊天标为`reconciling`，但不阻塞 SillyTavern 渲染。
2. 捕获本次 in-memory story generation。
3. 后台从聊天 API 读回，等待服务端消息前缀与当前快照一致。
4. 只有确认故事变更已持久化后，才提交 Economy 回滚。
5. 等待期间任何新事件都会使旧 generation 失效。
6. 超时或读回失败时保持资金写入冻结；刷新后按服务端实际聊天重新对账。

这样不会出现“正文编辑最终没保存，但钱已经不可逆回滚”的顺序错误。

## 7. 阶段 D：Economy 纯领域

### D1. 数据与默认事实

第一次`ensureEconomy`创建：

- `schemaVersion: 1`。
- 唯一开户流水：`system:mint -> player`，金额 100。
- 固定幂等键`economy:opening-grant:v1`。
- 开局锚点`floor: -1`。

开户不是 settings 默认值，不在 OS 初始化时创建。

### D2. Pure ledger commands

至少实现：

- `ensureEconomy(ledger)`。
- `postTransaction(ledger, input)`。
- `postAction(ledger, inputs)`，保证多资金腿在一个候选账本中整体通过或整体失败。
- `reverseTransaction(ledger, input)`。
- `projectBalances(ledger)`。
- `listTransactions(ledger, cursor)`。
- `validateLedger(ledger)`。

这些函数不读取 SillyTavern、不保存 metadata、不发 toast、不 import Vue。

### D3. Idempotency

- action ID 标识一次业务动作。
- idempotency key 标识该动作的一条具体资金腿。
- 同一 action 的多条资金腿必须在一次根 mutation 中连续追加，并共享 story anchor、source domain 和 source ID；一旦后续 action 开始，旧 action ID 不得再次追加。
- 同键同输入返回已有交易。
- 同键不同输入报`economy_idempotency_conflict`。
- UI 重试、双击和 iframe 重投不能重复入账。

### D4. 冲正

- 用户业务撤销产生新交易，不修改旧交易。
- 每笔原交易最多有一个有效冲正。
- 冲正锚点不得早于原交易。
- 冲正后仍执行非透支与安全整数校验。

### D5. Repository

Economy repository 只组合：

- 根 store mutation。
- 当前 story anchor 捕获/提交前核对。
- pure ledger command。

公开写入口`postActionCurrent()`在一次根 mutation 中先按当前剧情对账，再给全部资金腿安装同一 anchor；`postCurrent()`是单腿封装。幂等重试若已存在同一 action，会复用原 action anchor，不会因剧情后来只追加消息而误报冲突。

Controller 不接触根数据结构。

## 8. 阶段 E：Economy timeline 与宿主事件

### E1. 对账入口

使用同一个`reconcileLedgerWithStory`判定账本后缀是否失效，并由 story reconciliation runtime 覆盖：

- `MESSAGE_EDITED`。
- `MESSAGE_SWIPED`。
- `MESSAGE_DELETED`。
- `MESSAGE_RECEIVED`，覆盖 SillyTavern 完成 swipe/回复落盘后的最终正文链。
- `CHAT_CHANGED`后的下一次读取。
- Wallet activate。
- 每个 Economy mutation 之前。
- 页面重新加载。

事件监听只负责标记、取消和调度；实际判断只在 timeline 中实现。

### E2. 失效判定

按交易 sequence 从小到大，并以连续且同`actionId`的交易作为 action 批次：

- 开户流水始终有效。
- action 的 story floor 超过当前末层，无效。
- 当前前缀 hash 与 action 共享 anchor 不同，无效。
- 第一笔无效 action 的首笔交易及其后全部交易无效。

回滚返回：

```ts
interface EconomyRollbackImpact {
    changed: boolean;
    firstInvalidSequence: number | null;
    removedTransactionIds: string[];
    removedActionIds: string[];
    previousBalance: number;
    nextBalance: number;
}
```

第一阶段没有其他业务领域，因此只裁账本；接口保留真实返回值供下一消费者施工时组合，不注册空消费者。

### E3. Event timing

- 不让`MESSAGE_EDITED`等待模型调用、长轮询或聊天 API 超时。
- 事件到达时立即使当前 Economy command token 失效。
- Wallet 正在显示时进入“剧情已变化，正在核对账本”状态，禁止按钮动作。
- 对账完成后只推送新的只读投影。
- APP 已关闭时不创建 iframe；只在当前聊天确实已有 Economy 时后台对账。

## 9. 阶段 F：Wallet APP

### F1. Shell 与 Host 注册

Shell descriptor：

```text
id: wallet
name: 钱包
accent: 金棕色
root route: ledger
```

Shell 先通过通用`app/activate`激活钱包。Wallet runtime 只处理：

- 激活回调：确保 Economy、完成对账并返回首屏。
- `wallet/refresh`：重新读取余额与首屏流水。
- `wallet/load-more`：按 sequence 游标读取更早流水。
- `wallet/confirm-save`：尝试核实未确认保存。

钱包没有 post/adjust/set-balance action。

### F2. UI 结构

- 顶部余额卡：小白币余额、加载/冻结状态。
- 流水列表：标题、备注、来源、时间、收支方向与金额。
- 首屏最多 18 笔，滚动到底显式加载更早流水。
- 空态只在账本合法且除开户外没有流水时显示。
- 读取失败、保存未确认、冲突和聊天不可用使用不同文案。
- 移动端输入安全区与滚动由 OS device 壳处理；钱包自己不创建全屏 overlay。

### F3. 临时状态

分页游标、加载标记、错误、请求 sequence 和展开项只活在 Wallet APP activation 内。deactivate、切聊、关闭 OS 时销毁。

## 10. 阶段 G：版本、构建和文档

### G1. Chat schema

- 现行 OS chat root 改为 schema v2，增加`domains`。
- origin 上未进入 upstream 的 schema v1 直接删除支持，不加 v1 converter。
- upstream 旧`fw`fixture 继续存在，迁移器直接生成 v2 root。
- 根 validator 只解释 v2 根结构；生产 composition 为已注册的`apps.fourthWall`和`domains.economy`安装各自所有者提供的分支 validator。未知根版本停止写入，未知可选分支按原值保留，不把未来领域校验继续堆进迁移器。

### G2. Build

- Wallet Vue 与 Economy/host TypeScript 进入现有`build:xiaobai-os`。
- Host bundle 继续只打包`modules/xiaobai-os/**`；SillyTavern 和通用根能力保持 external。
- 重新生成 assistant manifest 和项目结构说明。

### G3. 文档

更新：

- `modules/xiaobai-os/README.md`。
- `modules/xiaobai-os/docs/target-design-and-roadmap.md`。
- assistant 项目结构说明。

不得把施工方案继续堆进四次元壁 README。

## 11. 最少必要测试

| 测试层 | 保护的契约 | 真实故障 |
|---|---|---|
| 纯单测 | 正整数、安全余额、非透支、幂等、冲正、action 批次 | 双扣、负余额、历史被改写、半个业务动作残留 |
| 纯单测 | 稳定剧情指纹 | 编辑/swipe/中间删除后错误保留资金事实 |
| 纯单测 | 第一失效交易后的后缀裁切 | 保留依赖已失效余额的晚期交易 |
| Store 集成 | 单写队列、明确失败恢复、未确认冻结/核实 | APP 并发覆盖、未确认后继续写坏账本 |
| Host 集成 | 编辑事件不阻塞、服务端故事确认、generation 失效 | 正文未保存却先永久回滚、旧事件迟到写入 |
| APP 集成 | Wallet activate/refresh/load-more observable DTO | 切聊串账、分页重复、关闭后旧请求覆盖 |
| 现有回归 | 四次元壁公开行为 | 根仓库和 runtime registry 重构破坏第一阶段 |
| TS/lint/build | 类型、依赖方向与产物 import | 跨 Tavern import、浏览器加载失败 |

不写读取源码查字符串、文件存在清单或私有函数名测试。

## 12. 自动验收

必须通过：

```text
npm run build:xiaobai-os
npm run test:xiaobai-os
npm run test:tauritavern-chat-surface
npm run lint
npm run build:assistant:manifest
npm run test:assistant:workspace
git diff --check
```

已完成的真实浏览器验收：

1. 打开聊天 A 的 Wallet，确认开户 100 与服务端读回。
2. 切聊天 B，确认独立开户；返回 A 数据不变。
3. 在测试交易 fixture 下分别编辑、swipe、尾删、中间单删，确认余额和流水裁切。
4. 从早期楼层创建分支，确认分支只保留有效事实，原聊天不受影响。
5. 在故事保存尚未确认时触发对账，确认 Wallet 冻结且 SillyTavern 编辑 UI 不被长时间阻塞。
6. 模拟 metadata 明确失败和读回未确认，确认恢复/冻结文案与后续写入门禁。
7. 打开四次元壁，复验会话、设置、Prompt、切聊关闭，以及真实生成请求的成功/错误收口契约。本次测试 Token 无效，已确认 401 不会成为 AI 正文；未伪称供应商成功生成。

验收产生的钱包/四次元壁数据必须清理并从服务端读回确认。

## 13. 通盘 Review 清单

### 所有权

- Wallet 没有写余额入口。
- Economy 不 import Wallet、任务、商店、银行或宠物。
- 四次元壁类型不再拥有 OS 根数据。
- 根 lifecycle/runtime registry 不含业务 action 分支。

### 数据

- 流水是唯一资金事实，没有第二份持久余额。
- OS 根只有一个写队列。
- 未确认状态不持久化，但会阻止当前运行继续写。
- 没有 IndexedDB/localStorage 孤儿数据。

### 回滚

- 原生中间删除不能只依赖`chat.length`。
- 分支、移动和漏事件由激活/命令前对账覆盖。
- 故事持久化确认早于永久资金裁切。
- 第一笔失效后全部后续交易一并裁切。

### 错误路径

- 明确失败、未确认、并发冲突、聊天切换、未知 schema 各有独立结果。
- 迟到任务不能解除新 generation 的冻结或覆盖新聊天。
- 保存失败不显示成功余额。

### 删除路径

- 删 Wallet 不误删未来消费者需要的 Economy。
- 第一阶段删 Economy 只需删除 domain、Wallet、注册与`domains.economy`。
- 没有未来 APP 空类型、空页面、空 hook 或兼容壳。

## 14. 第一阶段之外

第一阶段不顺手加入：

- 手动改余额、管理员铸币或调账界面。
- 任务、商店、银行、游戏、宠物、地图的占位图标。
- 为未来领域预建表、版本、Prompt、工具或 Controller 分支。
- 余额 checkpoint、缓存表、跨聊天总资产或全局宠物。
- 小白酒馆数据导入、同步或双向桥。

下一个真实消费者施工时，先完成自己的终态设计，再把领域状态与 Economy 流水纳入同一次根 mutation 和同一回滚验收。

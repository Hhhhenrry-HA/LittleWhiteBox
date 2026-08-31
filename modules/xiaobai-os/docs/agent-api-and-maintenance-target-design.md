# Agent API 设置与后台维护终态设计

## 1. 目标

普通小白 OS 只提供一个 Agent API 设置入口，并为确实需要模型自动维护的 APP 提供一次接受轮一次请求的后台编排。

这层解决的是配置、供应商调用和 SillyTavern 事件时序，不拥有地图、任务或四次元壁的业务语义。普通 OS 仍不依赖`modules/tavern/**`。

## 2. 开工检查结论

| 项目 | 结论 |
| --- | --- |
| 功能所有者 | `agent-core`拥有共享配置格式和供应商调用；`apps/agent-api`拥有 OS 设置界面；`host/agent`拥有普通 OS 调用桥；`host/maintenance`拥有接受轮捕获和运行编排 |
| 唯一事实来源 | Agent 配置继续是`AssistantStorage`中的`settings`；OS APP 开关是`xiaobaiOs`扩展设置；运行队列只在内存 |
| 持久态 | 共享 Agent 配置、Map/Tasks 的启用与自动维护偏好 |
| 临时态 | 配置草稿、连接测试、模型列表、接受轮快照、请求队列、AbortController、running/error/last-run UI 状态 |
| 外部依赖 | SillyTavern `MESSAGE_SENT`与聊天上下文、`agent-core`、`AssistantStorage`、根 chat data store |
| 注册入口 | `production-composition.ts`注册系统 APP、Agent gateway、maintenance runner 和领域 participant；shell 注册桌面组件 |
| 删除路径 | 删除系统 APP与 host 注册，四次元壁/Map/Tasks 改回各自显式依赖；不得留下 Fourth Wall 转发弹窗 |
| 兼容对象 | 保留当前共享 Agent 配置格式和上游真实 Fourth Wall 设置迁移；不兼容测试线专属旧 OS 开关或旧弹窗协议 |
| 最少测试 | 设置读写冲突、User 后单次触发、swipe/regenerate 不触发、关闭时零请求、切聊/关开关使迟到结果失效、领域提交隔离 |

## 3. 终态结构

```text
modules/xiaobai-os/
├─ agent/
│  └─ browser-entry.ts              OS Agent 浏览器 bundle 入口
├─ host/
│  ├─ agent/
│  │  ├─ gateway.ts                 共享配置读取与供应商请求
│  │  └─ bridge-loader.ts           单例加载 OS Agent bundle
│  └─ maintenance/
│     ├─ accepted-turn-source.ts    读取刚被确认的上一轮
│     ├─ registry.ts                领域 participant 注册
│     └─ runner.ts                  单队列、取消、一次请求编排
└─ apps/
   ├─ agent-api/                    桌面设置 APP、Controller、UI
   ├─ fourth-wall/                  只保留四次元壁业务
   ├─ map/maintenance/              Map Prompt、工具和 staged mutation
   └─ tasks/maintenance/            Tasks Prompt、工具和 staged command
```

`host/maintenance`不得出现 Map/Tasks 字段、Prompt 文本或状态分支。新增自动领域只能通过注册一个 participant 接入。

OS Agent bundle 取代当前由 Fourth Wall 命名和拥有的 Agent bundle。供应商适配、配置规范化和设置表单行为继续复用`agent-core`；四次元壁只向 gateway 提交自己的 prompt 和请求选项。

## 4. 统一 Agent API 设置

### 4.1 配置所有权

Agent API 设置是小白扩展的用户级共享配置，不属于某个聊天，也不属于四次元壁：

```text
AssistantStorage / LittleWhiteBox_Assistant.json / settings
```

普通 OS 不在`chat_metadata`或`xiaobaiOs.apps`复制 provider、baseUrl、model、apiKey、temperature 等字段。OS 的 Agent API APP 是这份共享配置的一个正式编辑界面，因此在这里保存会与小白酒馆、Ebook、画图等其他共享 Agent 配置的消费者同步。

`agent-core/settings-repository.js`继续负责规范化、`updatedAt`冲突检测、串行保存和跨页面变更通知。`apps/agent-api`不另建 repository。

### 4.2 桌面 APP

- 「Agent API」是 OS 系统 APP，只要 OS 本身启用就常驻桌面，不受 Map/Tasks 扩展开关控制。
- 四次元壁删除「Agent API 配置」按钮、`open-agent-settings`frame action、专属 dialog 和对应测试，不保留代理入口。
- Map、Tasks、四次元壁不显示 provider/model/key 表单；它们只消费 gateway。
- 打开 APP 只读取共享配置，不联系模型供应商；拉取模型、连接测试必须由用户明确点击。
- 配置未启用或不完整时，页面显示本地判断结果；不能为了显示“是否可用”自动探测网络。
- APP 路由和表单壳必须立即显示，配置读取在页面内呈现明确 loading；不得让 shell 的打开握手等待 Agent bundle、AssistantStorage 或模型列表，不能以 host timeout 代替正常加载态。

### 4.3 视觉与表单契约

页面使用 OS 自己的黑色控制中心风格，但复用`agent-core`已经验证的 provider、预设、模型和保存逻辑，不复制一套字段状态机。

主题必须完整覆盖原生控件：

- 根容器声明正确的`color-scheme`；
- `select`、`option`、`optgroup`同时定义前景色与背景色；
- input、textarea、autofill、disabled、focus、错误和保存状态均使用 OS token；
- 不依赖`color: inherit`猜测 WebView 的原生下拉配色；
- 页面在 OS iframe 内渲染，不再创建宿主 DOM overlay。

OS 页面只展示 API 供应商相关能力。Assistant 权限、delegate、Tavily 等不属于普通 OS 当前需求的区块不显示，但共享配置中的既有值必须原样保留。

## 5. Agent gateway

gateway 是 APP 与`agent-core`之间的窄边界：

```ts
interface XiaobaiOsAgentGateway {
    loadConfig(): Promise<AgentConfig>;
    run(request: AgentRunRequest, signal: AbortSignal): Promise<AgentRunResult>;
    testConnection(request: ExplicitConnectionTest, signal: AbortSignal): Promise<TestResult>;
}
```

- `loadConfig`只读共享配置。
- `run`只在明确的前台动作或 maintenance job 已经获准时调用供应商。
- `testConnection`只能由 Agent API APP 的显式操作触发。
- gateway 不判断哪个 APP 启用，不读 Map/Tasks 数据，不拥有 Prompt。
- API APP 是 gateway 的设置界面，不是其他 APP 的运行依赖；关闭设置页面不影响四次元壁或后台任务。

## 6. 两级开关与入口

Map 和 Tasks 各有两个不同语义的用户级开关：

| 开关 | 关闭后的行为 |
| --- | --- |
| APP 启用 | 桌面不显示该 APP；停止该 APP 的后台 participant 和主聊天 Prompt 投影；聊天数据保留 |
| 自动维护 | APP 仍可打开和读取；不为该领域创建后台工作，不读取 Agent 配置，不调用供应商 |

两项默认均关闭，但入口不放在同一处：

- Map、Tasks 的「APP 启用」复选框只放在 SillyTavern 扩展设置现有的「小白 OS」区块，紧邻 OS 总开关。即使 APP 图标已经隐藏，用户仍能从这里重新开启。
- 「自动维护」只放在对应 APP 的设置页，不复制到扩展设置，也不放进 Agent API APP。它是用户级偏好，作用于所有普通聊天，因此 UI 必须明确标注「所有普通聊天自动维护」。Tasks 没有 active 任务时可本地返回 null；Map 是否出现新空间事实需由 Agent 判断，所以开启 Map 自动维护就表示每个有效接受轮都参加请求，即使最终没有 patch。这个成本差异必须写在开关说明中。
- `autoMaintenance=true`蕴含`enabled=true`。关闭 APP 时同一次设置 mutation 把该 APP 的自动维护重置为`false`；重新开启后仍需用户在 APP 内再次明确开启自动维护，不能恢复一个隐藏的付费行为。

两种开关本身都只保存用户级偏好，不读取 Agent 配置、不发请求，也不创建聊天数据。扩展设置通过 OS `index.ts`导出的窄设置命令写唯一 settings repository，不能直接改`extension_settings`；shell 也不能自行解释或保存设置。

settings repository 为`map|tasks`提供类型化的`setAppEnabled`、`setAutoMaintenance`和当前运行内变更订阅。扩展设置 handler 与 APP Controller 只能调用这些命令；repository 在确定保存成功后发布新快照，确定失败则恢复旧值且不切 runtime。若宿主保存结果不确定，沿用现有 settings 候选语义：保留当前内存候选、按候选切换 runtime并明确提示“保存未确认”，不另造第二套 pending 开关。

运行中的启停由`app-runtime-registry`应用：开启后注册该 APP 的 descriptor、runtime 和主 Prompt runtime；关闭后若该 APP 正在显示，shell 先回到桌面，再移除 descriptor、清空 Prompt、注销 participant 并 abort 该领域请求。Map/Tasks 的开关只能随对应完整 APP 一起暴露，基础设施阶段不得先展示能勾选却没有页面的半成品入口。

用户可在具体 APP 内通过标明会使用 Agent 的「维护一次」「重建」或「刷新」按钮发起显式请求。

若运行中关闭自动维护，该领域的自动 job token 立即失效并请求 abort；即使供应商仍返回，领域提交前也必须再次检查 token 并丢弃迟到结果。显式「维护一次」使用独立的前台授权 token，不依赖自动维护开关，但关闭整个 APP 仍会使它失效。

## 7. 接受轮触发语义

### 7.1 唯一自动触发事件

SillyTavern 的普通发送流程先把 User 消息加入`chat`、执行`saveChatConditional()`，随后才发出`MESSAGE_SENT(messageIndex)`。后台维护只监听这个事件。

事件处理器只同步完成捕获和入队，然后立即返回；不能把 Agent Promise 返回给 SillyTavern 的串行事件总线，不能阻塞本轮主 RP 生成。

### 7.2 被处理的内容

```text
U1 → A1a → swipe A1b → 用户发送并保存 U2
                              ↓
                    维护 U1 + 当前选中的 A1b
```

U2 是“上一轮已经被用户接受”的边界，不是本次维护证据。群聊时，接受轮包含上一条 User 及其后、U2 之前连续出现的全部非系统 Assistant 消息；首条 User 之前若只有角色开场白，可把该开场白作为首个接受来源。

只接受尾部追加的普通 User 消息。向历史中间插入 User、系统消息、空消息或没有可接受 Assistant 内容的事件不创建 job。

捕获快照包含：

- chat identity；
- 触发 User 的消息位置、角色和原始文本；
- 捕获时已完成的普通 Assistant 回复总数；
- 接受来源中每条消息的位置、角色、当前`swipe_id`和当前文本；
- participant generation token 与其领域 revision。

提交前重新读取当前聊天并逐项比较这些原始值。这里不需要消息 hash、Web Crypto、剧情指纹或持久“核对中”状态；任一值变化、聊天切换或来源消失都直接丢弃该迟到结果。

### 7.3 永不触发的事件

- `MESSAGE_RECEIVED`、`GENERATION_ENDED`；
- Assistant 流式片段；
- swipe、regenerate、continue；
- 打开 Map/Tasks APP；
- OS 启动、聊天切换或页面恢复；
- provider/model/API key 的编辑与保存。

因此用户可以无限 swipe，而不会产生任何自动维护 API 消耗。

### 7.4 手动「维护一次」

「维护一次」不是对整段聊天做隐式扫描。用户在 Map 或 Tasks 内点击后，只为当前 APP 捕获聊天尾部最新一组完整的 User + 当前所选 Assistant 内容；群聊仍包含该 User 后连续出现的全部非系统 Assistant 消息。尾部没有完整 Assistant 内容、正在生成、聊天已经切换时不发请求，并给出本地提示。

这个点击本身表示用户明确接受当前所选回复，所以不要求再发送下一条 User。它复用同一套消息位置、文本、`swipe_id`和领域 revision 提交守卫，并进入当前聊天同一条 FIFO 队列，但只运行被点击 APP 的 participant；`autoMaintenance=false`不阻止这次显式请求。

「从当前聊天重建」是另一项高成本操作：它可以读取更长的当前聊天来生成完整候选领域，校验成功后一次替换。按钮必须单独命名并在调用前说明范围，不能让「维护一次」悄悄退化为全聊天重建。

## 8. 一次请求、领域自有

同一接受轮中，只要至少一个已启用 participant 需要维护，runner 组装一次 Agent 请求。Map 与 Tasks 各自提供：

```ts
interface MaintenanceParticipant {
    id: string;
    capture(source: AcceptedTurnSource): ParticipantSnapshot | null;
    prompt(snapshot: ParticipantSnapshot): string;
    tools(snapshot: ParticipantSnapshot): readonly AgentTool[];
    commit(staged: unknown, guard: CommitGuard): Promise<void>;
    invalidate(reason: string): void;
}
```

- participant 自己读取领域状态、构造 Prompt、声明工具、校验参数并维护 staged state。
- runner 只拼接已启用 participant 的静态规则、上下文和工具。
- Agent 工具先写 participant 的内存 staging context，不在模型循环中直接保存聊天数据。
- 请求完成后，各 participant 分别通过根 store 提交；Map 失败不抹掉一个已经合法提交的 Task，反之亦然。
- Tasks 的状态与 Economy 资金腿仍必须在它自己的单次根 mutation 中原子提交。
- Agent 没有通用“写 OS 根”“改余额”或“任意执行 JS”工具。

四次元壁的用户发送、任务大厅刷新和候选人生成是独立的显式请求，不与接受轮 maintenance 合并；它们只共用配置和 gateway。

## 9. 队列、取消与失败

- 当前聊天只有一条 FIFO maintenance 队列，不并行维护两个接受轮。
- 新 User 到来时前一 job 可继续；后一个等待前一个完成，避免旧结果覆盖新状态。
- 关闭 OS 窗口不影响已经获准的自动 job；自动维护属于 host 后台，不由页面寿命拥有。
- 「维护一次」、重建、board 刷新和候选招募属于前台请求；离开对应 APP/页面、再次发起同类请求或关闭 APP 时 abort，迟到结果不得提交。
- 切聊、OS cleanup 或 OS 总开关关闭时，中止 active job 并清空当前运行队列。
- 单个 APP 关闭时只移除该 participant；同一请求中的其他 participant 可继续。
- API 配置缺失、未启用或读取失败时，本次 job 以本地错误结束，不发供应商请求。
- 供应商、请求级解析或整个工具循环失败时，所有 participant 都不写入。单个 participant 的工具参数/领域校验失败只使该 participant 无法提交，另一个拥有完整合法 staged 结果的 participant 仍可提交；错误不能跨领域冒充成功。
- 运行错误和“上次维护”提示只活在当前页面进程。
- 自动失败后不在重载时偷偷补请求。用户可等待下一次接受轮，或在 APP 内明确点击「维护一次」。

后台队列不是用户长期事实，也没有跨重启恢复要求，因此不进入`chat_metadata`。Map/Tasks 的已提交领域状态可以在后续维护中继续被修正；不保存完整聊天副本、pending prompt 或 Agent 原始输出。

## 10. 主聊天 Prompt 与后台维护分离

Map/Tasks 是否向主 RP 投影当前状态，由各 APP 自己的 prompt runtime 决定。该投影：

- 不经过 maintenance runner；
- 不调用 Agent API；
- 使用已提交领域状态的只读、安全摘要；
- 在 APP 禁用时立即移除；
- 遵守现有主生成生命周期，不能遗留 extension prompt。

这样“自动维护关闭”只代表不花费后台 Agent 调用，不会意外禁用用户已经明确启用的静态任务/地图连续性提示。

## 11. 数据、迁移与删除

OS 扩展设置最终包含 Fourth Wall 设置与 Map/Tasks 两级开关，但不包含 Agent 凭据。测试线自己的旧 OS 开关格式直接整理为当前结构；唯一保留的设置迁移是已存在的上游 Fourth Wall 真实格式到当前 OS 格式。

移除这套能力时：

1. 删除 Agent API APP 的 host/shell 注册；
2. 删除 maintenance runner 和 participant 注册；
3. 将仍需模型的 APP 改为明确的新所有者，或一并下线；
4. 不删除共享 Agent 配置文件，除非整个小白 Agent 产品明确下线；
5. 删除 Fourth Wall 旧弹窗协议与测试，不留兼容壳。

## 12. 最少必要验证

| 稳定契约 | 最低成本检查 |
| --- | --- |
| 共享配置不被 OS 私有化或覆盖无关字段 | repository 集成测试 |
| 原生下拉在 OS 暗色界面及目标 WebView 中可读 | 浏览器 computed style + 实际视觉检查 |
| Agent API 路由立即显示，慢配置读取有可见 loading 且不触发 host timeout | 浏览器集成测试 |
| User 保存后只入队一次 | accepted source/runner 集成测试 |
| swipe、regenerate、Assistant 回复零请求 | 宿主事件集成测试 |
| participant 全关时连配置都不读取 | runner 单测 |
| APP 开关始终可重新进入，关闭时同步停止 runtime/Prompt/participant | 设置 repository + lifecycle 集成测试 |
| 关闭 APP 会清除自动维护偏好，重新开启不产生隐式调用 | 设置 repository 集成测试 |
| 切聊、关开关、改 swipe 使迟到提交失效 | runner + chat store 集成测试 |
| 手动维护只读取最新完整接受轮，并且只运行被点击领域 | accepted source/runner 集成测试 |
| Map/Tasks 一次请求但领域提交互不冒充 | participant 集成测试 |
| Fourth Wall 原有生成行为不因设置入口迁移改变 | Fourth Wall Controller 公开行为回归 |

不增加读取源码做`includes`的结构清单测试；目录边界由 TypeScript import、lint、build 和真实运行契约证明。

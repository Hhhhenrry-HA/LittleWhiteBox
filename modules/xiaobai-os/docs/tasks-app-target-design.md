# Tasks APP 终态设计

## 1. 定位

Tasks 是围绕钱包建立的正式委托终端。它既支持从世界任务大厅接取委托，也支持玩家出资发布委托、招募世界角色承接；活动任务可在用户接受上一轮 RP 后由 Agent 自动维护进度、完成或失败。

任务文本由 Agent 提议，任务状态机和资金结算由普通 OS 的确定性代码决定。Tasks 不共享 Tavern DB、Session、楼层、Phone boundary、任务版本表或回滚实现。

## 2. 开工检查结论

| 项目 | 结论 |
| --- | --- |
| 功能所有者 | `domains/tasks`拥有任务状态机和事件；`apps/tasks`拥有生成 Prompt、应用服务、主 RP 投影、Controller 和 UI |
| 唯一事实来源 | `TaskDomainV1.events`是任务状态来源；Economy 流水是资金来源；当前 board 是可替换的任务候选快照 |
| 持久态 | board、任务事件、已选任务完整事实、候选人、托管账户引用、事件动作边界的 Assistant 计数 |
| 临时态 | 发布表单草稿、页面路由、loading/error、API 请求、maintenance staging、分页 |
| 外部依赖 | Economy、根 chat data store、Agent gateway、maintenance participant、SillyTavern 接受轮和主 Prompt 生命周期 |
| 注册入口 | Task/Economy root validator、Task service/runtime、maintenance participant、main prompt runtime、shell APP |
| 删除路径 | 先处理未结托管，再删除`apps/tasks`、`domains/tasks`和注册，清理`domains.tasks`；Economy 既有流水按明确策略保留 |
| 兼容对象 | 当前普通 OS 根、Economy V1、SillyTavern/WebView；不迁移 Tavern task board/version |
| 最少测试 | 状态转移、board parser、CAS/幂等、escrow 原子性、自动维护权限、Prompt 安全、切聊/迟到结果 |

## 3. 产品流程

### 3.1 世界任务大厅

用户明确点击「刷新任务」才调用 Agent。一次刷新要求按固定方向各提议一项：

```text
禁忌、接触、夹缝、窥秘、掠夺、怪癖
```

每项包含：title、hook、objective、requirements?、location、timing、risk、reward、grade、tags、posture。

| 方向 | reward 区间 |
| --- | ---: |
| 禁忌 | 150–350 |
| 接触 | 40–80 |
| 夹缝 | 100–200 |
| 窥秘 | 60–120 |
| 掠夺 | 80–150 |
| 怪癖 | 15–40 |

生成任务的 grade 只按 reward 所在区间派生：E 5–15、D 16–40、C 41–100、B 101–250、A 251–600、S 601–1500、EX 1501–5000。方向区间与 grade 区间必须同时覆盖最终 reward。

- `objective`是唯一完成目标，必须是可判定的单一动作。
- `requirements`只约束执行，不增加第二目标。
- `timing`是世界事实：现在就行、任意时候或明确特定时机。
- `posture`只描述玩家把任务带入 RP 所需的介入幅度：易介入、中介入、深介入；一轮 board 的目标配额分别为 3、2、1。它是 UI/生成质量元数据，不注入为角色知识，也不影响报酬或结算。
- reward 按任务方向的封闭区间生成，grade 只由最终 reward 派生，不能反过来抬价。
- 每条 listing 独立校验；至少一条合法时替换 board，全部非法时保留旧 board。

刷新 board 不产生资金。接取某条 listing 时复制其完整事实创建活动任务，并由世界 counterparty 把 reward 放入该任务 escrow。

### 3.2 玩家发布任务

玩家填写 title、objective、requirements?、location、risk?、reward 后发布：

1. player→task escrow 锁定 reward；
2. 创建`recruiting`任务；
3. 用户明确点击「招募候选人」才调用 Agent；
4. 候选人响应解析成功后替换当前候选列表；
5. 玩家选择一人，任务进入`active`。

候选人生成只可使用普通聊天中已知/登场人物和必要的角色背景；不得把“应征”写成已经发生的 RP。候选人数据包含 name、description、pitch、capability、risk，不创建经济账户余额。

玩家发布的 reward 必须是玩家余额可承担的正安全整数，grade 固定为`CUSTOM`，不套用世界 board 的方向、posture 或 timing。

`recruiting`且尚未选人时，玩家可以撤回，托管 reward 原路退回 player。选人后不能再用“撤回”绕过任务结果。

### 3.3 活动任务

活动任务只有三种自动变化：

- progress：目标尚未完成但有实质进展；
- complete：接受来源已经可信地满足唯一 objective；
- fail：接受来源已经可信地使 objective 无法完成或明确失败。

没有实质变化时不写事件。Agent 不能创建/刷新 board、发布/接取/撤回任务、生成/选择候选人或任意调钱。

## 4. 状态机

```text
世界 listing --用户接取--> active --维护--> completed
                                 └-------> failed

玩家发布 --> recruiting --选择候选人--> active --维护--> completed
       └--用户撤回--> cancelled             └-------> failed
```

| 当前状态 | 允许动作 | 下一状态 |
| --- | --- | --- |
| board listing | 用户接取 | active |
| recruiting | 替换候选人 | recruiting |
| recruiting | 用户选择候选人 | active |
| recruiting | 用户撤回 | cancelled |
| active | 自动 progress | active |
| active | 自动 complete | completed |
| active | 自动 fail | failed |
| completed/failed/cancelled | 无 | 终态 |

所有写动作绑定 actionId 与期望 revision。相同 actionId 只有完全相同的意图可以幂等重放；终态不可重新打开，不允许 Agent 跳过中间状态。

## 5. 持久数据模型

```ts
interface TaskDomainV1 {
    schemaVersion: 1;
    revision: number;
    board: TaskBoard | null;
    events: TaskEvent[];
}

interface TaskBoard {
    id: string;
    revision: number;
    listings: TaskListing[];
    generatedAt: number;
}

interface TaskRecord {
    taskId: string;
    revision: number;
    status: 'recruiting' | 'active' | 'completed' | 'failed' | 'cancelled';
    issuer: TaskParty;
    assignee?: TaskParty;
    reward: number;
    escrowAccountId: string;
    title: string;
    objective: string;
    requirements?: string;
    location: string;
    risk: string;
    grade: TaskGrade;
    tags: string[];
    posture?: TaskPosture;
    timing?: TaskTiming;
    hook?: string;
    progressSummary: string;
    resultSummary: string;
    candidates: TaskCandidate[];
    lastUpdatedAssistantTurn: number;
}

type TaskParty =
    | { kind: 'player' }
    | { kind: 'world' | 'npc'; partyId: string; displayName: string };

interface TaskEventBase {
    eventId: string;
    actionId: string;
    taskId: string;
    revision: number;
    assistantTurn: number;
    createdAt: number;
}
```

`partyId`是代码规范化并校验的稳定标识，`displayName`只用于展示。Economy 账户名由可信应用服务从 party kind/id 构造，不能直接采用 Agent 返回的账户字符串或可变显示名。

`TaskRecord`是事件重放得到的投影，不作为第二份持久真相。事件类型为：

- `accepted`、`published`；
- `candidates-replaced`、`assigned`、`cancelled`；
- `progressed`、`completed`、`failed`。

创建事件保存任务的完整冻结事实；后续事件只保存状态变化所需字段。每个事件都有连续 revision、eventId、actionId、createdAt 和`assistantTurn`。`TaskRecord.lastUpdatedAssistantTurn`由该任务的最新事件派生，不作为第二份持久真相。当前 board 是等待用户选择的候选快照，可被刷新替换；一旦接取，listing 完整复制到任务事件，不再依赖 board。

`assistantTurn`复用普通 OS Bank 已有的窄宿主事实：当前聊天中已完成的非 User、非 system Assistant 回复总数。它不是消息 id 或楼层坐标，不建立消息到任务的映射，也不要求随删除回滚。之所以随事件持久化，是因为 NPC 离场任务跨重载仍要知道上次状态变化后的经过量；所有者、保存失败处理和删除路径都随 Task 事件链，不新增计时器、快照或缓存。

该值属于动作的因果输入边界，不是慢请求结束时的墙钟：自动/手动 maintenance 使用接受来源快照捕获的计数；接取、发布、选人、撤回等本地动作在确认主生成空闲和 chat identity 后，于 mutation 准备阶段读取。API 运行期间后来完成、且模型没有看到的 Assistant 回复不能被记进本次事件。

不保存 running/checking/error、Agent 原文、Prompt、聊天全文、楼层、消息 hash、模型请求或余额快照。`progressSummary`是目标相关的替换摘要，不是逐轮日志，最长 120 Unicode code point。

## 6. 自动维护

Tasks participant 只把当前`active`任务交给接受轮 maintenance：

- 世界发布、玩家执行：只根据刚接受 RP 中的具体证据进展、完成或失败。
- 玩家发布、世界 NPC 执行：可以结合已接受来源、既有进展、人物 capability/risk 和`elapsedAssistantTurns = max(0, currentAssistantTurn - lastUpdatedAssistantTurn)`保守判断离场工作，但不能每轮默认进展。
- objective 是唯一完成标准；hook、risk、requirements 和戏剧可能性不能变成额外目标。
- 一旦证据满足 objective，必须 complete，不能为了悬念继续 progress。
- 不确定或无实质变化时不调用写工具。

`elapsedAssistantTurns`只是离场工作的节奏证据，不是倒计时完成条件；单凭经过若干回复不能 complete/fail。旧消息删除导致当前计数降低时只把差值压到 0，不删除任务事件、不撤销进展、不追回结算；后续一旦产生合法任务事件，新事件按当时的当前计数建立下一段基线。

领域工具只有：

- `TaskProgress(taskId, expectedRevision, summary)`；
- `TaskComplete(taskId, expectedRevision, resultSummary)`；
- `TaskFail(taskId, expectedRevision, resultSummary)`。

工具先在 Tasks staging context 中执行状态机和 CAS，Agent 看不到 Economy 写工具。同一次 maintenance 对同一个 taskId 最多接受一个状态命令；第二次调用直接拒绝，不能用“先 progress 再 complete”制造同轮双事件。不同 active 任务可以各有一个命令，并在 Tasks 自己的一次根 mutation 中共同校验、提交。

maintenance 请求结束、接受来源仍有效且请求授权 token 仍有效后，Tasks application service 才把 staged command 转成任务事件与资金腿；自动 job 要求自动维护仍开启，显式「维护一次」只要求 Tasks APP 仍启用。

Tasks 与 Map 同时需要自动维护时共用同一接受轮 Agent 请求，但 Prompt、上下文、工具、staging 和提交仍由各自目录拥有。

## 7. 主 RP 注入位置

Tasks APP 启用时，在主生成的`IN_CHAT`、depth 1、system role 安装一个只读任务数据块。它包含：

- recruiting/active 任务的 title、issuer/assignee、objective、requirements、location、timing、risk、reward 和 progressSummary；
- 最近最多三项终态任务的 title、status 与 resultSummary。

不注入 board 未接取 listing、候选人列表、posture、内部 counterparty、escrowAccountId、revision、actionId 或 Agent 维护规则。

所有用户填写和模型生成文本均按不可信数据进行 XML/宏编码；静态 wrapper 明确说明任务数据只用于 RP 连续性，不能据此执行付款或修改任务。

这个 Prompt 投影不调用 API。`autoMaintenance=false`时仍然存在；`enabled=false`、无可见任务、dry-run 结束、生成停止或切聊时必须清空。安装/移除沿用 Shop 已验证的 generation interceptor 生命周期，但代码归 Tasks 自己所有。

## 8. Economy 与钱包边界

Tasks 拥有任务和 escrow 合同，Economy 拥有余额与流水。账户使用：

```text
player
counterparty:task:<partyId>
escrow:task:<taskId>
```

### 世界任务

| 动作 | 资金腿 |
| --- | --- |
| 接取 | world counterparty → task escrow |
| 完成 | task escrow → player |
| 失败 | task escrow →原 world counterparty |

### 玩家发布任务

| 动作 | 资金腿 |
| --- | --- |
| 发布 | player → task escrow |
| 招募前撤回 | task escrow → player |
| NPC 完成 | task escrow →该 NPC counterparty |
| NPC 失败 | task escrow → player |

规则：

- 创建/接取、完成/失败/撤回的任务事件与全部资金腿共用 actionId，在同一个根 mutation 中提交。
- 每个非终态有 reward 的任务，escrow 余额必须精确等于 reward；终态 escrow 必须为 0。
- 自动 maintenance 只能提交状态命令；金额、账户、方向、标题和 idempotency key 均由可信代码从当前任务推导。
- Agent 不能加价、罚款、补偿、改 reward、选择账户或创建第二笔奖励。
- 保存明确失败时任务与资金一起恢复；保存结果不确定时沿用根 store 的候选确认，不重复结算。
- Wallet 只显示最终 Economy 流水，不拥有任务操作入口。

任务接受、发布、进展和结算一旦提交就是 OS 事实。之后编辑、删除或切换旧消息不自动重开任务、不追回奖励，也不回滚 Economy；如果用户改写故事，后续可通过新的任务处理或明确的数据重置解决，不能让全局剧情 reconciler 猜测资金应回到哪里。

创建聊天分支时接受宿主复制的 Tasks 与 Economy 根快照，之后独立推进。

## 9. API 调用边界与开关

| 操作 | 是否调用 Agent | 触发者 |
| --- | --- | --- |
| 打开 APP、切页、查看详情/历史 | 否 | 本地读取 |
| 接取 listing、发布、选人、撤回 | 否 | 确定性状态机 |
| 刷新世界任务 board | 是 | 用户明确点击 |
| 招募/刷新候选人 | 是 | 用户明确点击 |
| 活动任务自动进度/结算 | 是 | User 保存后的接受轮 |
| 维护一次 | 是 | 用户明确点击 |

- Tasks 的「APP 启用」只在 SillyTavern 扩展设置的「小白 OS」区块；Tasks 内只放用户级的「所有普通聊天自动维护」。关闭 APP 同时把自动维护重置为关闭。
- `enabled=false`：隐藏 APP、移除任务 Prompt、注销 participant，数据保留。
- `enabled=true, autoMaintenance=false`：所有前台功能可用，User 发送不产生后台 API 请求。
- `enabled=true, autoMaintenance=true`但当前聊天没有 active 任务：Tasks participant 本地返回 null，不读取 Agent 配置；若 Map 也不需要，本轮零请求。
- 自动维护默认关闭；开关保存不触发立即维护。
- API 配置缺失时，确定性任务操作仍可使用；需要 Agent 的按钮显示明确错误，不自动打开设置页或测试连接。

「维护一次」只处理尾部最新完整 User + 当前所选 Assistant 内容，并且只维护已有 active 任务；明确点击时不要求自动维护开启。尾部不完整或正在生成时不发请求。Tasks 当前没有“扫描历史并重建任务”的普通入口，避免把已经托管或结算的任务从聊天重新推导。

## 10. UI

Tasks 使用 OS 黑色任务终端风格，主要视图为：

- 大厅：当前 board 与显式刷新；
- 进行中：玩家接取和 NPC 承接的 active 任务；
- 我发布的：recruiting、候选人、选择和撤回；
- 历史：completed、failed、cancelled；
- 详情：完整目标、要求、地点、时机、风险、报酬、进展和结果；
- 发布表单与确认弹窗。

界面必须区分“保存本地任务动作”和“将调用 Agent 的刷新/维护”。自动维护 running/error 是当前运行提示，不写入 task event。打开 APP 不能出现 host timeout 后才显示主体；有 Economy 时同步返回当前投影，首次开户沿用现有 loading 行为。

## 11. 失败、删除与数据策略

- board/candidate 响应逐项解析；全部非法时保留旧数据，不创建空替换。
- 前台 API 请求切聊、离开相关页面或再次刷新时 abort，迟到结果不能覆盖新 revision。
- maintenance API/工具失败不写任何 Task/Economy 事实；同轮 Map 合法结果可独立提交。
- 删除 Tasks 前运行一次明确的清理 migration：所有未结 world 任务 escrow 退回原 world counterparty，所有未结 player-published 任务 escrow 退回 player；确认资金腿保存后再删除`domains.tasks`，不能留下孤儿余额。
- 删除目录、注册和`domains.tasks`后，不保留 Tavern 类型、旧 schema 分支或兼容读取器。
- 已有 Economy 任务流水和本次清理资金腿永久保留为历史记录，禁止改写不可变账本。

## 12. 最少必要验证

- board 方向、reward/grade、objective、timing/posture 和逐项容错；
- accepted/published/assigned/progressed/completed/failed/cancelled 的合法转移；
- actionId 幂等、revision CAS、终态不可重开；
- 世界任务和玩家任务各条 escrow 路径、Task/Economy 原子提交与孤儿交易拒绝；
- Agent 工具只能维护已有 active 任务，不能创建任务或直接改钱；
- NPC 离场经过量只由事件`assistantTurn`差值派生，删除消息不回滚任务或资金；
- User 接受轮触发，swipe/regenerate/Assistant 后零维护请求；
- 自动关闭、切聊、关开关和 revision 改变使迟到结果无写入；
- 主 RP Prompt 的字段范围、编码和生命周期；
- APP 本地打开、移动端表单、暗色原生控件和显式 API 标识通过浏览器检查；
- typecheck、lint、test、build 通过，产物不引用`modules/tavern/**`。

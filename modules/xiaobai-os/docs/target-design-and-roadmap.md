# 普通酒馆小白 OS：终态设计与开发路线

## 1. 产品定位

普通酒馆小白 OS 与小白酒馆 Phone OS 是两个独立产品。用户可以感知它们属于同一品牌，内部不能共享 Tavern DB、Session、Phone 消息、楼层语义、manager run、回滚协议或领域实现。

普通 OS 的宿主是 SillyTavern 当前聊天；聊天数据根位于当前聊天的`chat_metadata`。同名 APP 可以参考小白酒馆已经验证的产品经验，但必须按普通聊天的身份、事件和保存边界重新实现。

## 2. 终态结构

```text
modules/xiaobai-os/
├─ index.ts                         唯一扩展入口
├─ types.ts                         OS 公共宿主契约
├─ agent/
│  └─ browser-entry.ts              普通 OS Agent bundle 入口
├─ host/
│  ├─ production-composition.ts     组合真实 APP/领域
│  ├─ lifecycle.ts                  图标、窗口、清理
│  ├─ app-runtime-registry.ts       APP 路由
│  ├─ frame-bridge.ts               可信 iframe 消息
│  ├─ chat-data-store.ts            根级单写队列与保存确认
│  ├─ sillytavern-context.ts        窄宿主事实读取
│  ├─ main-generation-runtime.ts    主生成临时状态
│  ├─ agent/                        共享配置读取与供应商调用桥
│  └─ maintenance/                  User 接受轮捕获与通用编排
├─ shell/                           OS 设备外壳与桌面
├─ domains/<domain>/                纯领域规则与持久格式
└─ apps/<app>/                      应用服务、宿主控制、Prompt、工具、UI
```

核心层只提供与业务无关的能力。Map、Tasks 等功能通过少量入口注册，自己的领域模型、存储格式、Prompt、工具和 UI 留在功能目录内。删除功能应接近“删`apps/<app>` + 删`domains/<domain>` + 删注册 + 一次数据清理”。

## 3. 系统设置与 APP 入口

OS 有三类用户级设置入口：

1. SillyTavern 扩展设置页：OS 总开关与 Fourth Wall 能力设置；这里不放 Map/Tasks 开关。
2. Map/Tasks 各自的 APP 设置页：仅在对应 APP 完整交付后提供「所有普通聊天自动维护」，偏好仍由`xiaobaiOs`用户级设置仓库保存。
3. 共享 Agent 配置：`AssistantStorage/settings`，由`agent-core`拥有，供小白酒馆、Ebook、画图、普通 OS 等消费者共用。

Agent provider、model、apiKey 等不得复制进 OS 设置或聊天数据。OS 桌面常驻一个「Agent API」系统 APP，四次元壁删除原专属入口。

Map/Tasks 与银行一样随 OS 固定注册并常驻桌面，不存在各自的`enabled`字段或扩展设置复选框。两者只有 APP 内的「所有普通聊天自动维护」，默认关闭；它只决定 User 接受轮是否为该领域产生 Agent 工作，不影响图标、前台功能或主聊天只读 Prompt。participant 静态注册，automatic 模式通过`autoMaintenance`和 invalidation 停用，不重建 registry。

OS 总开关通过`modules/xiaobai-os/index.ts`导出的窄命令写唯一 settings repository；Map/Tasks Controller 各自只写`autoMaintenance`。settings runtime 仅在关闭自动维护时立即 invalidate 自动 job；shell 不直接读写扩展设置。切聊或 OS cleanup 统一清 Prompt、取消前台请求并停止后台。某 APP 的桌面入口只随完整功能一起交付，不能先出现无页面的占位图标。

完整契约见[Agent API 设置与后台维护终态设计](./agent-api-and-maintenance-target-design.md)。

## 4. 所有权与唯一事实来源

| 能力 | 所有者 | 唯一事实来源 |
| --- | --- | --- |
| 聊天隔离与根保存 | `host/chat-data-store.ts` | 当前聊天 identity 与`chat_metadata` |
| 主生成是否进行中 | `host/main-generation-runtime.ts` | 当前运行内的 SillyTavern generation 生命周期 |
| Agent 配置与供应商调用 | `agent-core`、`host/agent` | `AssistantStorage/settings` |
| 接受轮后台编排 | `host/maintenance` | 当前运行内的 User `MESSAGE_SENT`事件和 participant 队列 |
| 小白币 | `domains/economy` | 不可变资金流水 |
| 银行头寸 | `domains/bank` | Bank 事件链 |
| 赌局 | `domains/game` | Game 事件链和私有游戏状态 |
| 商品库存与效果 | `domains/shop` | Shop 事件链 |
| 世界图册与场景地图 | `domains/map` | 当前聊天的规范 Atlas/Scene |
| 正式任务 | `domains/tasks` | Task 事件链；资金仍以 Economy 流水为准 |
| 四次元壁会话 | `apps/fourth-wall` | `apps.fourthWall.sessions` |

宿主没有“全局剧情状态”。Economy、Wallet、Bank、Game、Shop 不订阅剧情变化、不哈希消息、不进行剧情核对，也不因编辑、swipe、删除而回滚。Map、Tasks 只在各自领域内处理 User 接受轮，不把这一依赖扩散给经济 APP。

## 5. 终态数据形状

用户级 OS 设置：

```ts
interface XiaobaiOsSettings {
    enabled: boolean;
    apps: {
        fourthWall: FourthWallGlobalSettings;
        map: { autoMaintenance: boolean };
        tasks: { autoMaintenance: boolean };
    };
}
```

聊天级数据：

```ts
interface XiaobaiOsChatData {
    schemaVersion: 2;
    apps: {
        fourthWall?: FourthWallData;
    };
    domains: {
        economy?: EconomyLedgerV2;
        bank?: BankDomainV1;
        game?: GameDomainV1;
        shop?: ShopDomainV2;
        map?: MapDomainV1;
        tasks?: TaskDomainV1;
    };
}
```

Task 事件额外保存当时的`observedAssistantCount`，即动作边界看到的非 User、非 system Assistant 消息总数；离场 NPC 任务只用它派生自上次任务事件以来的非负经过量。它不标识消息，不产生删除回滚，生命周期随 Task 事件链。

Agent 配置、运行队列、请求状态、页面路由、缩放、表单草稿和模型原始响应均不进入聊天数据。用户级 OS 偏好与剧情总结、画图一样直接使用 SillyTavern 扩展设置和宿主防抖保存，不建立根 schema 状态机；总开关及各 APP 设置由各自 normalizer 补默认值，旧根版本标记和旧 Map/Tasks `enabled`在入口归一化后不再保存。上游真实 Fourth Wall 格式和用户明确保留的 Economy V1 anchor 账本只在各自入口一次性转换，运行时不留双读分支。

### 分支语义

SillyTavern 创建分支时，OS 接受宿主给出的当前`chat_metadata`快照。OS 不读取消息前缀推断资金、地图或任务应回到哪里，也不维护第二条分支账本。两个分支从复制时的数据开始独立写入。

## 6. User 后自动维护

自动维护只监听普通 User 消息保存成功后的`MESSAGE_SENT`。它把新 User 当作“上一轮已接受”的边界：

```text
U1 → A1a → swipe A1b → 保存 U2
                          └─ 一次后台请求维护 U1 + A1b
```

- U2 不属于本次维护证据；
- Assistant 回复、流式、swipe、regenerate、continue 不触发；
- 事件监听器同步捕获后立即返回，不阻塞 U2 的主 RP 生成；
- Map/Tasks 同时需要工作时合并为同一个 Agent adapter 和 Provider tool loop；工具往返仍可能包含多个 Provider 回合；
- 领域各自提供 Prompt、工具、staging 和提交；
- 切聊、关开关、消息或 swipe 改变、领域 revision 或相关实体 CAS 改变时，尚未进入根保存 commit point 的迟到结果作废；保存请求已经发出后保留真实提交结果，不伪造回滚；
- 所有自动维护均关闭时不读取 Agent 配置，更不做网络检查。

后台队列、AbortController、running/error 是当前运行临时态。打开 APP、切换页面或 OS 启动不会自动调用模型。

APP 内的「维护一次」是独立的显式调用：只捕获聊天尾部最新完整 User + 当前所选 Assistant 内容，不要求自动维护开启，也不扫描整段历史。Map 的「从当前聊天建立/重建」是另一个明确的全量操作；Tasks 不提供从聊天重建已托管/已结算任务的普通入口。

## 7. APP 与普通聊天的边界

### 四次元壁

每次用户明确发送请求时读取当时的普通聊天窗口作为即时上下文。皮下会话历史属于四次元壁自己，不等于主聊天消息。它通过统一 Agent gateway 调用供应商，不再拥有 API 设置 UI。

### 地图

Map 读取被 User 继续后确认的上一轮，只维护已确认空间事实。它提供世界 Atlas 和地点 Scene；打开、查看、缩放均为本地操作。OS 运行时向主 RP 注入仅含 Atlas 连续性资料的`<current_map>`，不投影 Scene；自动维护开关关闭时不产生 Agent 请求。

完整契约见[Map APP 终态设计](./map-app-target-design.md)。

### 任务

Tasks 的任务大厅刷新和候选人招募只能由用户明确触发；接取、发布、选人、撤回是确定性状态机；只有既有 active 任务可在接受轮中自动 progress/complete/fail。任务 Prompt 以`<active_tasks>`向主 RP 注入 updatedAt 最新的 5 个 active/recruiting，不注入终态任务。

任务状态和 Economy 资金腿由可信应用服务原子提交，Agent 不能直接改钱。完整契约见[Tasks APP 终态设计](./tasks-app-target-design.md)，可执行顺序见[Tasks APP 施工方案](./tasks-app-implementation-plan.md)。

### 银行

只读取当前已完成 Assistant 回复数量。期限是即时投影：`remaining = max(0, maturityTurn - currentTurn)`。数量减少不会删除已提交头寸或恢复已结算头寸。

### 商店

购买、使用和效果消耗都是不可逆 Shop 事实。有限效果按成功形成的 normal Assistant 新回复次数消耗；每条回复保存效果收据，swipe、regenerate 和 continue 复用原收据而不重复消耗。删除或编辑消息不退款、不返还道具、不恢复次数；Shop 不保存或计算楼层坐标。

### 钱包与赌场

完全不读普通聊天内容。已有数据时打开 APP 只做内存投影。

## 8. 写入、性能与错误

所有聊天业务写经过根 store：

1. 调用入口捕获目标 chat identity。
2. 根级队列串行化写入。
3. 领域校验 actionId、CAS 和业务输入。
4. 涉及资金时，在一个候选根中同时生成领域事件与 Economy 资金腿。
5. 运行领域内及跨领域不变量。
6. 保存`chat_metadata`并确认 identity 未变化。
7. 明确保存失败恢复旧根；保存结果不确定时保留候选并冻结后续写入，直到读回确认。

Map 与 Tasks 的 Agent 工具只修改内存 staged state；请求成功且边界仍有效后才进入各自的根 mutation。一个领域的 API/解析失败不能冒充另一个领域的成功。

性能契约：

- 已有 Economy：Wallet、Bank、Game、Shop、Tasks 激活同步返回本地投影，不调用`/api/chats/get`；
- 首次没有 Economy：需要钱包的 APP 先返回`loading`，后台只执行一次开户保存；
- Map 激活只读当前根，不为“地图是否存在”调用 Agent；
- Agent API APP 先立即显示本地表单壳，再异步读取共享设置；不自动连接供应商，也不让打开握手等待配置读取；
- 外壳只创建一个窗口与一个 iframe，APP 路由切换复用外壳；
- 主生成状态、Prompt 临时安装、maintenance 队列和未确认保存状态只存在当前运行内，除非业务事实已经提交。

## 9. 当前交付状态

### 已实现

- OS 外壳、发送键左侧入口、APP runtime registry；
- 四次元壁 APP；
- Economy 与只读钱包；
- 固定商品商店与主 RP Prompt 效果；
- 银行；
- 三款纯规则赌场游戏；
- Agent API 系统 APP、共享配置编辑、普通 OS Agent gateway 与通用 Agent bundle；
- 四次元壁已改为消费统一 gateway，不再拥有 API 设置入口或专属 Agent bundle；
- Map 双层地图、显式维护/重建、主 RP 空间摘要与自动维护开关；
- 首个真实自动维护纵切：accepted-turn source、FIFO coordinator、保存栅栏、Provider-aware tool loop、结果归纳、薄 runner facade、Map participant、取消与迟到提交守卫；
- 根级单写队列、CAS、actionId 幂等、跨领域原子提交与保存确认。

### 已实现但仍待真实验收

- Tasks 的产品流程、状态机、持久格式、响应编译、钱包结算、Prompt/工具/Session、UI、保存边界和 participant 接入已落地；runner 已支持 no-work 短路、共享 system 背景、各领域 user `dataMessages`和调用级失败恢复。自动化检查覆盖领域、保存、取消、CAS、生成门禁、双 participant 隔离、构建和 manifest，但真实 SillyTavern/Provider 与移动端仍需验收，不能据此写成完整收尾。实施边界以[Tasks APP 施工方案](./tasks-app-implementation-plan.md)为准。

Map 的当前交付口径以[Map APP 终态设计](./map-app-target-design.md)第 12 节为准：代码检查与真实 SillyTavern 浏览器验收是两层证据，任一未执行都不能写成“完整收尾”。

### 未进入设计

- 不明物：产品形态、成长时钟和经济循环尚未确认；不得注册占位 APP 或预埋数据。
- 宠物：尚无明确消费者和生命周期；不得与不明物混成一个领域。

## 10. 开工路线

### 阶段 A：Agent API 与 gateway（已完成）

1. 把 Agent bundle 和调用桥从 Fourth Wall 所有权提升到普通 OS 基础设施。
2. 新建桌面 Agent API APP，完成暗色原生控件与共享配置同步。
3. 删除 Fourth Wall 旧设置入口、dialog、frame action 和专属测试。

该阶段只完成已有消费者立即需要的 Agent 能力。Map/Tasks 的设置字段、开关、runtime、participant 和`host/maintenance`均不在此阶段预建。

### 阶段 B：完整 Map 与第一个真实维护消费者

1. 实现独立 Map 数据模型、不变量和 intent compiler。
2. 实现 Map repository/application service、空间 Prompt runtime，以及归 Map 自己所有的 Prompt、工具、staged mutation 和 participant。
3. 实现 Atlas/Scene UI、SVG renderer、材质、本地图标和显式维护/重建交互。
4. Map participant 成为真实消费者时，同阶段实现 accepted-turn source、FIFO coordinator、保存栅栏、Provider-aware tool loop、结果归纳和薄 runner facade；其中不得出现 Tasks 字段、Prompt 或预留分支。
5. Map 完整可用后才增加`map.autoMaintenance`、host/shell 固定注册和 Map 内的自动维护入口。完成 User 接受边界、零隐式 API 和真实浏览器验收后一起交付。

### 阶段 C：完整 Tasks 与第二个维护消费者

1. 按施工方案 A–B 完成纯事件状态机、投影、Task/Economy escrow 与交叉不变量。
2. 按施工方案 C 完成独立 board/candidate Prompt、上下文边界、宽容响应编译和显式无工具请求。
3. 按施工方案 D 完成三个高层维护工具和 Tasks Session，同时完成由第二消费者触发的三项通用改造：no-work 短路、静态 system rules/共享 system data/领域 user data/接受证据分层、调用级错误与领域失败去重；验收 Map/Tasks 一个 Provider session、各自 staged、各自事务提交。
4. 按施工方案 E–F 完成主 RP Prompt、Controller，以及大厅、发布、候选人、活动任务、历史、详情和设置 UI。
5. 已按施工方案 G 加入`tasks.autoMaintenance`的 APP 自有默认值、host/shell 固定注册和 APP 内自动维护入口。
6. 完成自动结算、迟到/取消/保存边界、真实 Provider、移动端和全量工程检查后交付；详细完成定义不在路线图重复，以两份 Tasks 文档为准。

每个阶段独立通盘 review、验证和提交。终态文档描述的公共结构不等于独立的先行施工阶段：没有真实 participant 时不创建空 runner，没有完整 APP 时不创建其字段、开关或注册。不得先造一个含业务分支的`world-manager.ts`，也不得用“以后再拆”接受临时上帝文件。

## 11. 每阶段验收

- 需求达成且用户操作含义明确；
- APP 打开不启动隐式 API 检查；
- 自动维护严格位于 User 接受边界，swipe/regenerate 零消耗；
- 功能所有者、唯一事实来源、持久/临时态和删除路径与对应终态文档一致；
- 运行产物不 import`modules/tavern/**`；
- 无测试线旧 schema、旧入口或旧协议兼容壳；
- 最低风险测试、typecheck、lint、build 和关键真实浏览器路径全部通过；
- diff 经过上下游、边界、数据流、错误路径和视觉体验的完整 review。

# 普通酒馆小白 OS 终态设计与开发规划

- 状态：OS 壳、四次元壁、Economy、钱包、商店、银行与游戏均已实施
- 适用范围：普通 SillyTavern / LittleWhiteBox 扩展
- 不适用范围：`modules/tavern/**`小白酒馆
- 确认日期：2026-08-30

## 1. 产品定义

普通酒馆“小白 OS”是普通 SillyTavern 聊天界面上的独立应用容器。

用户可以感知两套 OS 属于同一品牌：桌面、设备框架、图标语言和 APP 体验相近；实现上它们是两个产品，数据和剧情语义互不认识。

第一版运行形态：

- 扩展设置提供“小白 OS”勾选开关，默认关闭。
- 开启后在`#send_but`左侧挂载唯一 OS 图标。
- 桌面浏览器以居中的设备窗口打开；窄屏和移动端使用全屏布局。
- 打开后先显示 OS 桌面，不直接跳进某个 APP。
- 系统级返回、主页、关闭由 OS 壳提供，APP 不自行关闭整个模块。
- 切换普通聊天时关闭 OS 界面、取消当前 APP 请求、清空临时路由；新聊天的数据在重新进入 APP 时读取。
- 关闭 OS 开关时完整卸载入口、界面、监听器、观察器和请求运行时，但保留用户数据。

### 非目标

- 不把小白酒馆嵌入普通聊天。
- 不把 Tavern Phone OS 抽成两边共同运行的业务框架。
- 不同步两套钱包、地图、任务、宠物或聊天记录。
- 不把普通 SillyTavern 消息伪装成 Tavern Phone 消息。
- 不提前注册没有完成领域和存储的 APP。

## 2. 两套 OS 的硬隔离

```text
                         通用能力
               Agent Core / Draw / TTS
                    ↙             ↘
普通 SillyTavern + 小白 OS          小白酒馆 + Phone OS
chat_metadata / ST 消息楼层         Tavern DB / Session / Phone 消息
modules/xiaobai-os                  modules/tavern
```

允许共享的是无业务归属的能力，不是领域事实。

### 禁止依赖

- `modules/xiaobai-os/** → modules/tavern/**`
- `modules/tavern/** → modules/xiaobai-os/**`
- 小白 OS 读取 Tavern IndexedDB 表、Session ID、accepted state 或角色档案结构。
- Tavern APP 读取普通聊天`chat_metadata`中的小白 OS 数据。
- 为了视觉相似而 import Tavern Vue 组件、Controller、领域类型或 CSS。

视觉可以参考并独立实现；代码所有权必须分开。现由 ESLint 的受限 import 规则同时禁止 OS 源码导入 Tavern、Tavern 源码导入 OS，不用运行时判断弥补架构越界。

## 3. 功能所有权与依赖方向

```text
index.js（扩展总入口）
    ↓ 加载宿主构建产物
dist/xiaobai-os-host.js ← xiaobai-os/index.ts
    ├─ host：SillyTavern 适配、根数据写入、APP runtime 路由、剧情指纹
    ├─ shell：桌面、导航、设备窗口、APP 生命周期
    ├─ apps/fourth-wall：会话 / Prompt / generation / media / UI
    ├─ domains/economy：账户规则 / 流水 / 幂等 / 冲正 / 回滚
    ├─ apps/wallet：Economy 的只读余额与流水投影
    ├─ domains/shop + apps/shop：商品 / 库存 / 效果 / Prompt / UI
    ├─ domains/bank + apps/bank：存单 / 理财 / 头寸 / 结算 / UI
    └─ domains/game + apps/game：纯规则游戏 / 私有状态 / 结算 / UI
```

商店、银行与游戏各自拥有领域目录，只通过 Economy 的公开能力产生资金副作用。未来的任务、宠物和地图也必须遵守同一方向；Economy 不依赖这些 APP，钱包也不成为它们的 Controller。

### OS 壳拥有

- 设置开关对应的启动和卸载。
- 发送栏 OS 图标。
- 设备窗口、桌面、系统导航和当前 APP 路由。
- APP 注册表及`activate/deactivate`生命周期。
- APP/领域可选后台服务的启停；当前包括四次元壁实时吐槽与 Economy 剧情对账。
- 宿主 iframe 的建立、可信消息边界和主题同步。
- 聊天切换、扩展停用和页面卸载时的统一取消。
- OS 根聊天数据的单一写入队列与保存结果确认；壳不解释各 APP/domain 分支内容。

OS 壳不拥有任何四次元壁会话、钱包余额、地图节点或宠物状态。

### 四次元壁 APP 拥有

- 皮下会话、消息历史、当前会话选择和会话管理。
- 普通聊天上下文窗口的读取规则和 Prompt。
- Agent 调用、流式生成、重答、取消和错误投影。
- 图片/语音标记在四次元壁 APP 内的展示协议。
- 实时吐槽的触发策略、冷却、生成和历史写入。
- 四次元壁设置、Prompt 模板、UI 和删除路径。

### 普通宿主提供

- 当前 SillyTavern 聊天身份、消息数组、用户与角色名称。
- `CHAT_CHANGED`、消息接收、消息编辑、生成结束等宿主事件。
- 当前聊天元数据读取与保存。
- LittleWhiteBox 全局设置读取与保存。
- 通用 Agent、画图和 TTS 能力。

## 4. 终态目录

```text
modules/xiaobai-os/
├─ README.md
├─ types.ts
├─ index.ts
├─ host/
│  ├─ lifecycle.ts
│  ├─ app-runtime-registry.ts
│  ├─ sillytavern-context.ts
│  ├─ settings-repository.ts
│  ├─ chat-data-store.ts
│  ├─ story-adapter.ts
│  ├─ story-fingerprint.ts
│  ├─ legacy-migration.ts
│  ├─ frame-bridge.ts
│  ├─ story-write-gate.ts
│  ├─ story-action-runner.ts
│  ├─ story-reconciliation-runtime.ts
│  └─ production-composition.ts
├─ shell/
│  ├─ xiaobai-os.html
│  └─ app-src/
│     ├─ main.ts
│     ├─ App.vue
│     ├─ app-registry.ts
│     ├─ components/
│     └─ styles/
├─ apps/
│  ├─ fourth-wall/
│  │  ├─ types.ts
│  │  ├─ domain/
│  │  ├─ host/
│  │  ├─ agent/
│  │  ├─ ui/
│  │  └─ README.md
│  ├─ wallet/
│  │  ├─ descriptor.ts
│  │  ├─ host/
│  │  ├─ ui/
│  │  └─ README.md
│  ├─ shop/
│  │  ├─ descriptor.ts
│  │  ├─ application/
│  │  ├─ host/
│  │  ├─ ui/
│  │  └─ README.md
│  ├─ bank/
│  │  ├─ descriptor.ts
│  │  ├─ application/
│  │  ├─ host/
│  │  ├─ ui/
│  │  └─ README.md
│  └─ game/
│     ├─ descriptor.ts
│     ├─ application/
│     ├─ host/
│     ├─ ui/
│     └─ README.md
├─ domains/
│  ├─ economy/
│  │  ├─ types.ts
│  │  ├─ invariants.ts
│  │  ├─ ledger.ts
│  │  ├─ timeline.ts
│  │  ├─ repository.ts
│  │  └─ README.md
│  ├─ shop/
│  │  ├─ types.ts
│  │  ├─ catalog.ts
│  │  ├─ invariants.ts
│  │  ├─ timeline.ts
│  │  ├─ prompt.ts
│  │  └─ README.md
│  ├─ bank/
│  │  ├─ types.ts
│  │  ├─ products.ts
│  │  ├─ money.ts
│  │  ├─ random.ts
│  │  ├─ invariants.ts
│  │  ├─ timeline.ts
│  │  ├─ view.ts
│  │  └─ README.md
│  └─ game/
│     ├─ types.ts
│     ├─ money.ts
│     ├─ random.ts
│     ├─ games/
│     ├─ invariants.ts
│     ├─ timeline.ts
│     ├─ view.ts
│     └─ README.md
├─ tests/
│  └─ fixtures/
├─ dist/
│  ├─ xiaobai-os-host.js
│  ├─ xiaobai-os-app.js
│  ├─ xiaobai-os-app.css
│  └─ fourth-wall-agent.js
├─ docs/
│  ├─ target-design-and-roadmap.md
│  ├─ phase-1-implementation-plan.md
│  ├─ economy-platform-target-design.md
│  ├─ economy-platform-phase-1-implementation-plan.md
│  ├─ shop-app-target-design.md
│  ├─ shop-app-implementation-plan.md
│  ├─ bank-app-target-design.md
│  ├─ bank-app-implementation-plan.md
│  ├─ game-app-target-design.md
│  └─ game-app-implementation-plan.md
└─ host.css

modules/draw/shared/
├─ chat-message-image-markup.js
└─ chat-message-images.js

modules/tts/
└─ tts-message-voice.js
```

普通聊天媒体增强不属于 OS。`[img:]`图片投影由 Draw 拥有，`[voice:]`语音气泡由 TTS 拥有；两者各自跟随所属功能开关运行。

OS 运行时手写源码使用 TypeScript/Vue，并由独立`tsconfig.xiaobai-os.json`执行严格类型检查。`dist/*.js`是浏览器构建产物；目录外的普通聊天 Draw/TTS 能力维持其各自现有技术栈。

## 5. 普通酒馆的楼层与上下文语义

普通小白 OS 只认 SillyTavern 当前聊天：

- 当前聊天身份来自`getContext()`。
- 当前消息序列来自`getContext().chat`。
- 当前数组下标是本次上下文快照中的普通聊天楼层。
- 编辑和 swipe 改变同一楼层的当前内容；删除消息会改变后续数组下标。
- 四次元壁每次请求读取当时的主聊天窗口，不持久化对普通楼层的长期引用，因此无需伪造稳定 Floor ID。
- 皮下会话历史是四次元壁自己的消息序列，不是普通聊天楼层，也不是 Tavern Phone 消息。

Economy 使用 OS host 的“楼层 + 当前可见剧情前缀 SHA-256”锚点处理编辑、swipe、删除、移动、分支和漏事件重载。未来领域若需随剧情回滚，可复用这一宿主剧情事实，但必须自己定义领域版本如何裁切；不能借用 Tavern accepted snapshot，也不能沿用四次元壁的即时上下文规则。

## 6. 状态模型

### 6.1 全局持久设置

所有者：小白 OS 设置仓库与对应 APP。

为何持久化：OS 启用状态和用户配置需要在刷新后恢复。

```js
extension_settings.LittleWhiteBox.xiaobaiOs = {
    schemaVersion: 1,
    enabled: false,
    apps: {
        fourthWall: {
            image: { enablePrompt: false },
            voice: { enabled: false },
            commentary: { enabled: false, probability: 30 },
            promptTemplates: {
                topuser: '...',
                confirm: '...',
                metaProtocol: '...',
                bottom: '...',
            },
        },
    },
};
```

- `schemaVersion`由设置仓库拥有；不支持的版本必须停止读取并明确报错，不能按当前结构猜测。
- 关闭 OS 只修改`enabled`，不删除 APP 设置。
- 删除整个功能时删除`xiaobaiOs`设置根。

### 6.2 当前聊天持久数据

所有者：OS 根 chat data store 拥有保存协议与单一写队列；四次元壁和 Economy 分别拥有自己的数据分支。

为何持久化：皮下会话、历史和资金事实属于当前普通聊天，需要随聊天导出、分支与删除，并在刷新或再次进入聊天后恢复。

```js
chat_metadata.extensions.LittleWhiteBox.xiaobaiOs = {
    schemaVersion: 2,
    apps: {
        fourthWall: {
            settings: {
                maxChatLayers: 9999,
                maxMetaTurns: 9999,
                stream: true,
                disableAssistantPrefill: false,
            },
            sessions: [
                {
                    id: 'default',
                    name: 'Default',
                    createdAt: 0,
                    history: [],
                },
            ],
            activeSessionId: 'default',
        },
    },
    domains: {},
};
```

`chat_metadata`本身就是当前聊天的元数据，不得再使用`chat_metadata[chatId]`作为现行结构。

`apps.fourthWall`和`domains.economy`均为可选分支：上例表示只进入过四次元壁的聊天。进入四次元壁不创建 Economy，打开桌面也不开户。Economy 只在首次打开钱包或第一个真实经济消费者提交动作时创建；一旦出现，第一笔交易必须是固定开户流水，余额不持久化，只由`transactions`投影。当前测试线尚未进入 upstream 的 OS chat schema v1 在 Economy 施工时直接重整为 v2，不保留日常兼容分支；upstream 四次元壁旧数据仍由升级入口直接转换到 v2。

生命周期：

- 只有当前聊天存在且用户首次进入四次元壁时，才创建默认数据。
- 新建、重命名、删除会话和消息提交后保存当前聊天元数据。
- 首次进入钱包固定写入一笔 100 小白币开户流水；之后所有资金变化只由拥有业务语义的领域经 Economy 提交。
- 切换聊天只释放内存引用，不复制数据到新聊天。
- 删除普通聊天时，数据随聊天文件自然删除。
- 删除四次元壁 APP 时只删除`apps.fourthWall`；删除钱包 APP 不等于删除仍被其他消费者使用的 Economy。

### 6.3 临时运行态

以下状态不能持久化：

- OS 窗口是否打开、当前桌面页和当前 APP 路由。
- iframe ready、待发送消息、主题观察器和窗口尺寸。
- 当前生成请求、AbortController、流式文本和 request ID。
- APP 内弹窗、编辑框、滚动位置、展开状态和 toast。
- 实时吐槽在本次 OS 运行期内的冷却时间、延迟计时器和气泡元素。

前台 APP 状态在离开 APP、关闭 OS 窗口、聊天切换或功能卸载时销毁。实时吐槽的后台订阅和运行期冷却在 OS 开关保持开启时继续存在；切换聊天只取消旧聊天任务，不重置冷却，关闭 OS 开关或 LittleWhiteBox 时才彻底销毁并清零。

## 7. 生命周期契约

### 扩展启动

1. 读取并迁移全局设置。
2. 只有 LittleWhiteBox 总开关开启、小白 OS 开关开启、且聊天表面不是 Tauri 托管表面时，初始化 OS host。
3. host 挂载发送栏图标、必要宿主事件，以及已启用 APP 的后台服务；不提前创建 iframe。默认关闭的实时吐槽不会创建聊天数据。

### 打开 OS

1. 懒创建 overlay 和 iframe。
2. iframe 完成可信握手后接收主题、宿主能力和 APP 清单。
3. 默认进入桌面，不恢复上次路由。
4. 打开 OS 时取消正在生成的外部吐槽并隐藏吐槽气泡，避免后台结果覆盖前台交互。

### 进入四次元壁

1. 捕获当前聊天 identity。
2. 对当前聊天执行一次升级边界迁移。
3. 迁移或读取成功后才激活 APP；没有聊天时显示明确空状态，不创建元数据。
4. 可能跨越页面、会话或聊天边界的异步工作都绑定对应的 activation、聊天 identity、会话或媒体句柄；前台生成和媒体请求另有不可复用的 request ID。

### 离开 APP 或关闭 OS 窗口

- 取消前台生成、图片和语音请求。
- APP 执行`deactivate`，释放 APP 监听器。
- 销毁 iframe 和 overlay；OS 图标继续存在。
- 实时吐槽的后台订阅保留；OS 窗口关闭后只响应后续新的普通聊天事件，不恢复被打开窗口动作取消的旧请求。

### 切换聊天

- 先取消旧聊天全部请求，再销毁 UI。
- 任何旧请求完成时都必须再次核对聊天 identity；不匹配时禁止写入。
- 不自动打开新聊天的 OS，不自动创建新聊天数据。
- 实时吐槽切换到新聊天作用域；只有新事件真实触发时才迁移或创建该聊天的四次元壁会话。

### 关闭 OS 或 LittleWhiteBox 总开关

- 完整执行关闭流程。
- 移除 OS 图标、CSS、宿主事件和共享设置订阅。
- 保留持久数据；下次开启按现行结构恢复。

## 8. 四次元壁 APP 第一版能力

第一阶段迁移的是完整产品，不是聊天框占位：

- 多个皮下会话的新建、切换、重命名和删除。
- 用户消息、Agent 回复、流式输出、取消、重答。
- 消息编辑和删除。
- 思考内容折叠展示。
- 主聊天上下文层数与皮下历史轮数配置。
- 流式开关和 assistant prefill 开关。
- 共享 Agent API 配置面板。
- 自定义 Prompt 模板与恢复默认。
- `[img:]`图片生成协议和`[voice:]`语音协议。
- 实时吐槽开关、概率、冷却、普通消息/编辑事件触发。
- 宿主主题、用户头像和角色头像投影。

行为调整：

- 旧“关闭模块”操作删除；系统开关只在扩展设置中控制。
- 旧拖拽悬浮球删除，吐槽气泡改为锚定发送栏 OS 图标。
- 关闭 OS 窗口、离开 APP 或切换聊天会取消进行中的前台请求；打开 OS、切换聊天或停用功能会取消旧的吐槽请求，避免迟到结果写入错误界面或聊天。
- 会话数据保存失败时不得显示成功。保存前已明确失败时恢复旧内存对象；SillyTavern 已尝试保存但服务端读回无法确认时保留候选现场并报告“保存结果未确认”，禁止用旧对象覆盖可能已成功的远端写入。

## 9. 正式线旧数据迁移

现有四次元壁已经位于`upstream/main`，属于需要保留的正式线数据。

### 9.1 全局设置旧格式

支持且只支持当前上游实际存在的字段：

```text
fourthWall
fourthWallImage
fourthWallVoice
fourthWallCommentary
fourthWallPromptTemplates
dynamicPrompt（仅当前上游保留的更早名称）
```

它们一次性转换到`xiaobaiOs.apps.fourthWall`。旧`fourthWall.enabled === true`时新 OS 保持开启；否则新 OS 默认关闭。转换成功后删除这些旧字段。

### 9.2 当前聊天旧格式

现有实现错误地把当前聊天元数据再次按聊天 ID 嵌套：

```text
chat_metadata[currentChatId].extensions.LittleWhiteBox.fw
```

现行目标是：

```text
chat_metadata.extensions.LittleWhiteBox.xiaobaiOs.apps.fourthWall
```

迁移在每个聊天首次进入四次元壁时执行一次，因为普通宿主不会安全枚举并重写所有未打开的聊天文件。

迁移顺序：

1. 以真实旧格式 fixture 验证当前聊天 ID、`settings`、`sessions`、`activeSessionId`和历史消息。
2. 在内存中构造完整现行对象并执行当前模型不变量检查。
3. 用 SillyTavern 立即元数据保存入口提交新对象并删除旧分支。
4. 保存前明确拒绝时恢复原内存对象和旧分支；保存已发起但读回未确认时保留内存候选与迁移后的分支，等待用户重试或刷新核实。
5. 成功后当前 repository 只返回现行结构，不在日常读写中双读。

旧`fw.history`到`fw.sessions`的更早转换已经存在于当前上游运行时。迁移 fixture 需要分别覆盖当前 sessions 格式和仍可能存在的 history 格式；两者在升级入口转换，现行类型不携带`history`根字段。

旧悬浮球位置`LittleWhiteBox:fourthWallFloatBtnPos`没有新产品语义，不迁移；切换完成后删除。

## 10. 普通聊天媒体能力归位

迁移前的`modules/fourth-wall/fw-message-enhancer.js`同时处理普通主聊天图片和语音标记，但它不属于四次元壁 APP。第一阶段已按能力所有权将两部分分别归位。

现行边界：

- `[img:]`的标记解析、图片槽、懒加载、生成、重试和取消归 Draw。
- `[voice:]`的标记解析、语音气泡、播放状态和停止归 TTS。
- 启动条件只取 LittleWhiteBox 总开关以及各自功能可用状态。
- 不读取`xiaobaiOs.enabled`，不访问四次元壁会话。
- 四次元壁 APP 内的图片/语音渲染仍由 APP 自己拥有。
- 原有已渲染消息、观察器取消、图片请求取消和语音停止行为保持。

不建立同时依赖 Draw/TTS 的第三个协调模块。这样删除小白 OS 不会顺带删除普通聊天媒体能力，关闭任一能力也只清理自己的 DOM 与异步状态。

## 11. 错误与并发边界

- 同一四次元壁 APP 同时只允许一个前台生成请求。
- 前台生成携带不可复用的 request ID、chat identity 和 session ID；图片、语音按各自媒体 request ID 隔离；吐槽按捕获的聊天、消息与会话快照提交。
- 关闭、切聊和重答先使旧 request ID 失效，再 Abort。
- 迟到的流式片段、Agent 完成、图片、语音和吐槽结果只能被丢弃，不能写当前聊天。
- iframe 只接受预期 origin、预期`contentWindow`和`LittleWhiteBox-XiaobaiOS`来源标记。
- iframe 重载后由 host 重新发送当前快照，不重放旧命令。
- 不支持的数据版本、迁移失败、保存失败和保存结果未确认必须在 UI 显示；不得自动重置或伪报成功。
- Agent、画图或 TTS 不可用时，只禁用对应动作并说明原因，不伪造成功结果。

## 12. 开发路线

### 第一阶段：OS 壳 + 四次元壁

- 建立独立 host、shell、APP 注册和构建。
- 完整迁移普通四次元壁。
- 迁移正式线数据。
- 将普通聊天图片/语音增强分别归位到 Draw/TTS。
- 删除旧四次元壁入口、悬浮球和目录。

第一阶段实际边界、源码结构和验收项见[实施说明](./phase-1-implementation-plan.md)。

### 第二阶段：Economy + 钱包（已完成）

已建立 OS 根级单写队列、普通剧情指纹、Economy 纯领域与通用 APP runtime registry，并交付只读钱包 APP。每聊天独立开户 100 小白币；流水是唯一资金事实。实现未 import Tavern Economy，也没有创建第二份余额、checkpoint 或 IndexedDB 账本。

终态边界见[经济平台终态设计](./economy-platform-target-design.md)，具体施工顺序与验收见[经济平台与钱包第一阶段施工方案](./economy-platform-phase-1-implementation-plan.md)。

### 第三阶段：商店（已完成）

商店自己拥有25件固定商品、线性事件链、库存/效果投影和主RP Prompt投影；购买通过Economy，与purchase event原子提交和共同回滚。购买与使用分离，使用后从下一次Assistant回复开始生效；重答、swipe和continue不重复消耗。钱包不解释商品状态。

终态边界见[商店 APP 终态设计](./shop-app-target-design.md)，施工顺序与验收见[商店 APP 施工方案](./shop-app-implementation-plan.md)。

### 第四阶段：银行与游戏（已完成）

银行拥有存款产品、理财产品、线性事件链、头寸投影和金融结算历史。游戏是独立领域与独立 APP，拥有三款纯规则游戏、私有随机状态和游戏活动；它不依赖或嵌入 Bank。存取、金融结算、下注和派彩都通过 Economy，并与各自领域事件原子提交和共同回滚；两者都不调用模型，也不向主 RP 注入内容。

终态边界分别见[银行 APP 终态设计](./bank-app-target-design.md)与[游戏 APP 终态设计](./game-app-target-design.md)，施工和验收分别见[银行 APP 施工方案](./bank-app-implementation-plan.md)与[游戏 APP 施工方案](./game-app-implementation-plan.md)。

### 后续阶段：任务（暂缓，需单独完成自动状态机设计）

任务不是手动“核对进度”的页面，而是一套随普通主剧情自动维护的状态机。它必须自己拥有发布、接受、自动推进、完成/失败判断、结算和领域版本；托管、退款与报酬通过 Economy，在同一次 OS 根提交与同一回滚中确认。自动维护的事件时序、模型调用边界、迟到结果和重答/swipe语义未完整定稿前，不创建任务代码或入口。

### 后续阶段：不明物（暂缓，产品终态未确认）

当前Tavern不明物方案不直接作为普通OS终态。普通酒馆的数据所有权、成长时钟、主剧情关系和经济循环重新确认前，不复制实现、不预建类型，也不注册占位入口。

### 后续阶段：地图

地图自己拥有地点、连接、当前位置与移动语义，只读写普通聊天数据，不使用 Tavern Atlas/Map State。只有产品明确存在通行费或收益时才调用 Economy；不能为了“都围绕钱包”把地图状态塞进账本。

“信息”APP 暂不列入默认路线，因为普通 SillyTavern 主聊天已经承担主要通讯功能；若未来有独立联系人/异步消息需求，再单独立项。

## 13. 删除路径

删除整个普通小白 OS：

1. 删除`modules/xiaobai-os/`和对应构建配置。
2. 删除`index.js`中的唯一注册和`settings.html`中的唯一开关。
3. 删除`extension_settings.LittleWhiteBox.xiaobaiOs`。
4. 对当前/可升级聊天删除`chat_metadata.extensions.LittleWhiteBox.xiaobaiOs`。
5. Draw/TTS 各自保留普通聊天增强；删除 OS 不修改这两个功能。

删除单个 APP：

1. 删除`apps/<app>`。
2. 删除 APP registry 的一条注册。
3. 删除全局和聊天数据中的`apps.<app>`。
4. 删除该 APP 专属构建入口和测试。

共享领域不是某个 APP 的附属数据：删除钱包时，若商店、银行或未来任务等真实领域仍消费 Economy，则保留`domains.economy`；删除 Economy 前必须先删除或迁移全部真实消费者。详细的数据保留和流水处理规则见[经济平台终态设计](./economy-platform-target-design.md#15-删除路径)。

不保留旧类型、旧 API、空注册、永久迁移器或重定向壳。

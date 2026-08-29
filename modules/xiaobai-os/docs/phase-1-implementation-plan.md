# 普通酒馆小白 OS 第一阶段施工方案

- 状态：待施工
- 依据：[终态设计与开发规划](./target-design-and-roadmap.md)
- 第一阶段目标：完整 OS 壳 + 完整四次元壁 APP + 正式线数据迁移
- 原则：切换入口前先完成隐藏实现；最终提交不含假 APP、双入口、双读存储或旧实现兼容壳

## 1. 完成定义

第一阶段完成时，用户可以：

1. 在扩展设置勾选“小白 OS”。
2. 在发送键左侧看到且只看到一个 OS 图标。
3. 点击进入独立 OS 桌面，再打开四次元壁 APP。
4. 使用旧四次元壁已有的完整会话、生成、设置、图片、语音和实时吐槽能力。
5. 切换普通聊天后看到各聊天彼此独立的四次元壁数据。
6. 关闭 APP/OS 窗口、停用模块或切换聊天时，不留下旧请求和跨聊天写入；OS 保持开启时，实时吐槽仍可响应之后的新普通聊天事件。
7. 在升级后继续使用正式线已有四次元壁记录和配置。

同时必须满足：

- `modules/xiaobai-os/**`与`modules/tavern/**`没有双向依赖。
- 旧设置页“四次元壁”按钮、旧悬浮球、旧全屏入口和`modules/fourth-wall/**`全部删除。
- 普通聊天`[img:]`/`[voice:]`增强仍工作，分别由 Draw 和 TTS 拥有。
- 地图、钱包、银行、任务和宠物没有入口或占位页。

## 2. 开工前边界检查

| 问题 | 第一阶段结论 |
|---|---|
| 功能所有者 | `modules/xiaobai-os`拥有 OS；`apps/fourth-wall`拥有四次元壁；Draw/TTS 分别拥有普通聊天图片/语音增强 |
| 唯一事实来源 | 全局配置为`extension_settings...xiaobaiOs`；聊天数据为当前`chat_metadata...xiaobaiOs` |
| 临时态 vs 持久态 | 路由、窗口、请求、流式片段、冷却和 UI 展开临时；开关、配置、会话和历史持久 |
| 外部依赖 | SillyTavern context/events/metadata、Agent Core、Draw、TTS、可信 iframe 通讯 |
| 注册入口 | 根`index.js`只注册`modules/xiaobai-os/index.js`；设置页只有一个 OS 开关 |
| 删除路径 | 删 OS 目录、构建配置、注册和两个`xiaobaiOs`数据根；Draw/TTS 的普通聊天增强独立保留 |
| 真正兼容对象 | upstream 当前四次元壁全局设置、当前聊天`fw`数据、SillyTavern/浏览器/WebView |
| 最少必要测试 | 真实 legacy fixture 迁移、聊天隔离、生命周期取消、可信消息、四次元壁关键行为、类型/构建/lint |

## 3. 施工总顺序

```text
A. 数据契约与迁移（无 UI 入口）
        ↓
B. OS host、shell 与构建（仍不注册）
        ↓
C. 四次元壁完整迁入并内部自查
        ↓
D. 单次切换正式入口、拆媒体增强、删除旧模块
        ↓
E. 自动质量门禁
```

在 C 完成前不改用户入口，因此仓库不会出现可点击的半成品 OS。D 必须作为一个闭合切换完成，不保留新旧入口并存。

## 4. 阶段 A：现行数据契约与一次性迁移

### A1. 新增文件

```text
modules/xiaobai-os/host/settings-repository.js
modules/xiaobai-os/host/chat-metadata-repository.js
modules/xiaobai-os/host/legacy-migration.js
modules/xiaobai-os/tests/settings-migration.test.js
modules/xiaobai-os/tests/chat-metadata-migration.test.js
modules/xiaobai-os/tests/chat-metadata-repository.test.js
modules/xiaobai-os/tests/fixtures/upstream-fourth-wall-settings.json
modules/xiaobai-os/tests/fixtures/upstream-fourth-wall-chat-sessions.json
modules/xiaobai-os/tests/fixtures/upstream-fourth-wall-chat-history.json
```

fixture 必须从当前 upstream 代码所写出的真实字段构造并冻结，不能用现行`xiaobaiOs`类型伪装旧格式。

### A2. 设置仓库

职责仅包括：

- 创建并校验当前`xiaobaiOs.schemaVersion === 1`设置。
- 读取/更新 OS 开关。
- 读取/更新四次元壁全局 APP 设置。
- 将当前上游六类 legacy 字段转换后删除。
- 遇到未知版本时返回结构化错误，不清洗、不覆盖。

迁移决定：

```text
new.enabled = legacy.fourthWall.enabled === true
              或在没有 fourthWall 时 legacy.dynamicPrompt.enabled === true
```

图片、语音、吐槽和 Prompt 模板保持用户值；缺失字段只使用该冻结旧版本明确定义的默认值。

### A3. 当前聊天仓库

仓库接收显式 host adapter，不在测试中直接依赖全局 DOM：

```js
{
    getChatIdentity,
    getChatMetadata,
    saveChatMetadata,
}
```

公开行为保持小而明确：

```text
prepareCurrentChatFourthWall()
readCurrentChatFourthWall()
mutateCurrentChatFourthWall(action)
deleteCurrentChatFourthWall()
```

- `read`不创建数据。
- `prepare`只在用户进入 APP 时创建默认会话或执行迁移。
- `mutate`捕获开始时的 chat identity，保存前再次核对；聊天已变化则拒绝。
- action 返回完整下一状态，仓库校验后替换，禁止调用方拿可变引用原地写。
- 显式用户操作使用可等待的 SillyTavern 元数据保存入口；失败恢复旧内存快照并返回错误。

### A4. legacy 聊天迁移

只识别：

```text
chat_metadata[currentChatId].extensions.LittleWhiteBox.fw
```

转换内容：

- `settings`
- `sessions[*].id/name/createdAt/history`
- `activeSessionId`
- 更早`fw.history`转换为唯一`default`会话

成功保存后删除当前聊天 ID 下的旧`fw`；只有旧容器为空时才逐层删除空容器，不删除其他扩展或未知用户数据。

### A5. 最低测试

- 现有 sessions fixture 无损迁移，消息`role/content/thinking/ts/type`保持。
- 更早 history fixture 只在迁移入口变成 default session。
- 当前`chat_metadata`不再产生`[chatId]`嵌套。
- 聊天 A 准备/写入后，切换到 B 不返回 A 数据。
- 保存前聊天 identity 变化时拒绝写入。
- 新格式未知版本拒绝且对象不变。
- 保存失败恢复旧对象，不留下半迁移分支。
- 迁移成功后删除 legacy；后续读取只走现行根。

## 5. 阶段 B：OS host、shell、协议与构建

### B1. 新增 host

```text
modules/xiaobai-os/index.js
modules/xiaobai-os/host/lifecycle.js
modules/xiaobai-os/host/sillytavern-context.js
modules/xiaobai-os/host/frame-bridge.js
modules/xiaobai-os/host.css
```

`index.js`只导出：

```text
initXiaobaiOs
openXiaobaiOs
cleanupXiaobaiOs
```

不挂`window.showXxx`或`window.cleanupXxx`全局兼容 API。根入口直接持有 cleanup 引用并注册到现有模块清理表。

### B2. 生命周期实现

`initXiaobaiOs`必须幂等：

- 只创建一个`#xiaobaix-os-button`。
- 入口插在`#send_but`之前，并使用自己的 class、title 和 aria-label。
- 使用稳定具名 handler 订阅`CHAT_CHANGED`和页面卸载。
- 不在初始化时创建 iframe 或持久化路由。
- 仅当实时吐槽设置已开启时启动四次元壁后台服务；后台服务没有真实触发事件时不创建聊天数据。

`cleanupXiaobaiOs`是关闭 OS 开关或 LittleWhiteBox 时使用的完整卸载，必须可重复调用：

- 先使 lifecycle generation 失效并取消所有 APP 请求。
- 关闭/移除 iframe 和 overlay。
- 移除`message`、主题、resize、visibility和宿主事件。
- 停止实时吐槽后台服务并释放当前聊天冷却。
- 移除 OS 图标和 host CSS。
- 清空内存 registry/route，但不删持久数据。

### B3. shell UI

```text
modules/xiaobai-os/shell/xiaobai-os.html
modules/xiaobai-os/shell/app-src/main.ts
modules/xiaobai-os/shell/app-src/App.vue
modules/xiaobai-os/shell/app-src/app-registry.ts
modules/xiaobai-os/shell/app-src/components/XiaobaiOsDevice.vue
modules/xiaobai-os/shell/app-src/components/XiaobaiOsHome.vue
modules/xiaobai-os/shell/app-src/components/XiaobaiOsSystemBar.vue
modules/xiaobai-os/shell/app-src/components/XiaobaiOsNavigation.vue
modules/xiaobai-os/shell/app-src/styles/*.css
```

交互契约：

- 桌面端：遮罩 + 居中设备窗口，点击遮罩或关闭键关闭。
- 移动端：占满`100dvh`并处理 safe-area。
- 初始路由固定为 home。
- registry 只含完整的四次元壁定义。
- APP activation 失败时留在桌面并显示错误，不进入空白页。
- Home/Back/Close 含义分开；Close 不修改设置开关。
- Close 只销毁前台窗口；它不执行完整`cleanupXiaobaiOs`，因此 OS 图标和实时吐槽后台服务继续存在。

视觉与小白酒馆 Phone OS 同品牌，但 CSS、Vue 组件和状态独立编写。不得 import Tavern 主题 token 或组件。

### B4. iframe 协议

来源标记统一为：

```text
LittleWhiteBox-XiaobaiOS
```

系统消息和 APP 消息分命名空间，例如：

```text
os/frame-ready
os/init
os/close
os/theme-changed
app/activate
app/deactivate
fourth-wall/send
fourth-wall/cancel
fourth-wall/state
fourth-wall/error
```

所有请求/响应携带 request ID；四次元壁写操作额外绑定 chat identity 和 session ID。host 同时校验 origin、iframe`contentWindow`和 source。

### B5. 构建文件

```text
vite.xiaobai-os.config.mjs
tsconfig.xiaobai-os.json
```

修改`package.json`：

```text
build:xiaobai-os
test:xiaobai-os
```

产物：

```text
modules/xiaobai-os/dist/xiaobai-os-app.js
modules/xiaobai-os/dist/xiaobai-os-app.css
modules/xiaobai-os/dist/fourth-wall-agent.js
```

构建产物不包含 Tavern 模块。Agent bundle 从通用 Agent Core 源构建，归四次元壁 APP 使用。

### B6. 最低测试

- 连续 init 两次只有一个图标和一组监听器。
- open 两次只有一个 overlay/iframe。
- close 保留图标；cleanup 删除图标和 overlay。
- `CHAT_CHANGED`关闭 UI 并触发 APP deactivate。
- 不可信 origin/source/window 的消息均无可观察效果。
- 手机/桌面布局由 CSS 媒体查询实现，不在 JS 持久化设备模式。
- Vue typecheck 和 Vite build 通过。

## 6. 阶段 C：四次元壁完整迁入

### C1. 目标文件

```text
modules/xiaobai-os/apps/fourth-wall/
├─ README.md
├─ domain/
│  ├─ defaults.js
│  ├─ state.js
│  ├─ prompt.js
│  └─ response-projection.js
├─ host/
│  ├─ controller.js
│  ├─ generation-runtime.js
│  ├─ commentary-runtime.js
│  ├─ image-protocol.js
│  └─ voice-protocol.js
├─ agent/
│  └─ fourth-wall-agent.js
└─ ui/
   ├─ FourthWallApp.vue
   ├─ FourthWallConversation.vue
   ├─ FourthWallMessage.vue
   ├─ FourthWallSettings.vue
   ├─ FourthWallSessions.vue
   ├─ FourthWallPromptEditor.vue
   └─ fourth-wall.css
```

只在职责真实分开时拆文件；不为目录对称创建空 helper。

### C2. 领域与 Controller

- Vue 只提交明确 action，不直接改持久对象。
- 会话新建、重命名、删除、消息编辑/删除由纯状态转换产生下一状态。
- Controller 捕获 APP activation 时的 chat identity。
- 每次异步结果在投影和持久化前核对 activation generation、request ID、chat identity、session ID。
- 切换会话先取消该会话当前生成；不允许结果落入后来选中的会话。
- 重答先使旧请求失效，再从最后一条用户消息构造新请求。

### C3. Prompt 与普通聊天窗口

`sillytavern-context.js`提供普通聊天快照 DTO，四次元壁 Prompt 不直接调用 Tavern 或访问 DOM：

```js
{
    chatIdentity,
    userName,
    characterName,
    messages: [{ index, name, isUser, text }],
}
```

- `maxChatLayers`只裁剪该快照尾部。
- `maxMetaTurns`只裁剪四次元壁当前 session history。
- 普通聊天内容和皮下历史使用不同标签进入 Prompt。
- 不保存主聊天快照，不产生楼层锚点。
- 保留当前 Prompt 模板变量和生成输出`<msg>`解析行为。

### C4. 生成与取消

- Agent 配置继续来自通用 Agent settings repository。
- 每次请求使用独立 AbortController。
- stream progress 只更新临时 UI；最终成功后一次提交 Agent 消息。
- 用户消息必须先成功保存，才开始外部生成。
- 最终回复保存失败时保留 UI 现场并明确提示“未保存”，不得宣称完成。
- 取消不是错误 toast；网络、配置、解析和保存错误使用不同可观察文案。

### C5. 图片与语音

- 四次元壁 APP 的`[img:]`只调用通用 Draw facade。
- `[voice:]`只调用通用 TTS facade。
- APP 前台关闭或消息删除时取消对应句柄。
- 关闭画图/TTS 后保留原始文本标记并显示能力不可用，不删除历史内容。
- iframe 不接收 API key；Agent 配置面板沿用通用设置仓库的安全边界。

### C6. 实时吐槽

- 只有 OS 开启且四次元壁 commentary 开启时订阅普通消息/编辑事件。
- OS 界面正在显示四次元壁时不弹外部吐槽气泡。
- 打开 OS 窗口时取消已开始但未提交的吐槽请求；关闭窗口后只处理新的宿主事件。
- 捕获事件时记录 chat identity、message index 和消息文本快照。
- 随机延迟和模型请求共用可取消任务；切聊/停用后迟到结果全部丢弃。
- 成功结果写入触发时的 session；写前该聊天必须仍为当前聊天。
- 气泡锚定发送栏 OS 图标，不再依赖旧悬浮球位置。

### C7. UI 完整性

必须从第一版交付：

- 桌面入口图标和四次元壁标题/图标。
- 空会话、加载、生成、取消、保存失败和配置不可用状态。
- 消息编辑/删除、重答、思考折叠。
- 会话选择、新建、重命名、删除保护。
- 生成、媒体、吐槽、Prompt 和 Agent 配置。
- 键盘发送、组合输入保护、移动端输入区和安全区。
- 消息长列表窗口化或有界渲染，不能让整个历史无限 DOM 增长。

### C8. 最低测试

- 会话 action 的公开输入输出和删除最后会话保护。
- `maxChatLayers`与`maxMetaTurns`边界。
- 流式部分结果不持久化，最终结果只提交一次。
- cancel 后迟到 progress/final 无效。
- 切聊、切 session、关闭 APP 后旧结果不能写入。
- commentary 冷却、概率边界和切聊取消；随机源在测试中显式注入。
- 图片/语音不可用和取消行为。
- 迁移 fixture 经新 UI 读取后的可观察会话/消息保持。

不测试 Vue 文件名、内部函数名或源码字符串存在；组件重构不应破坏领域测试。

## 7. 阶段 D：单次入口切换与旧模块退场

### D1. 修改根入口`index.js`

- 删除所有`initFourthWall`、`initFourthWallFloorTools`、`refreshFourthWallFloorTools`、`openFourthWall`、`closeFourthWall`导入和特殊分支。
- 导入小白 OS 的 init/open/cleanup 或仅 init/cleanup（图标自己负责 open）。
- 默认设置从`fourthWall`改为`xiaobaiOs`当前格式；全局 legacy 转换只在新设置仓库。
- LittleWhiteBox 开启时按 OS 开关初始化。
- LittleWhiteBox 关闭时直接调用持有的 cleanup，不使用`window.fourthWallCleanup`。
- reset、状态快照与恢复列表统一改成`xiaobaiOs`。

### D2. 修改`settings.html`

- 删除“小白agent”区域中的“四次元壁”打开按钮。
- 增加标准`xiaobaix_os_enabled`勾选行，名称“小白 OS”。
- 加入设置状态 capture/apply/reset；默认关闭。
- 开关关闭立即 cleanup，开启立即 init；总开关关闭时控件禁用。
- 不增加第二个“打开 OS”设置按钮，用户入口只在发送栏。

### D3. TauriTavern 托管聊天表面

修改：

```text
integrations/tauritavern-chat-surface/participant.js
integrations/tauritavern-chat-surface/settings-ui.js
integrations/tauritavern-chat-surface/tests/chat-surface-contract.test.js
```

- 托管表面把`xiaobaix_os_enabled`列为锁定设置。
- 已启用 OS 时报告明确 unsupported feature，不尝试挂载普通发送栏 UI。
- 删除旧`fourthWall`判断和旧按钮 ID。

### D4. 普通聊天媒体能力归位

新增：

```text
modules/draw/shared/chat-message-images.js
modules/draw/shared/chat-message-image-markup.js
modules/tts/tts-message-voice.js
```

从旧`fw-message-enhancer.js`迁移普通聊天增强，但不保留混合所有权模块：`[img:]`由 Draw 接管图片槽、懒加载、生成和取消；`[voice:]`由 TTS 接管气泡、播放和停止。两者各自跟随所属功能生命周期，不依赖 OS 开关。

### D5. 构建与清单

- 用`vite.xiaobai-os.config.mjs`替代`vite.fourth-wall.config.mjs`。
- `package.json`删除`build:fourth-wall`，增加`build:xiaobai-os`。
- 重新生成 assistant 文件清单，使新文件进入工作区索引并移除旧文件。
- 更新项目结构说明中四次元壁的所有权和位置。

### D6. 删除旧实现

```text
modules/fourth-wall/app-src/fourth-wall-agent.js
modules/fourth-wall/dist/fourth-wall-agent.js
modules/fourth-wall/fourth-wall.html
modules/fourth-wall/fourth-wall.js
modules/fourth-wall/fw-image-protocol.js
modules/fourth-wall/fw-message-enhancer.js
modules/fourth-wall/fw-prompt.js
modules/fourth-wall/fw-voice.js
vite.fourth-wall.config.mjs
```

同时删除：

- `#xiaobaix-fourth-wall-overlay`
- `#xiaobaix-fw-float-btn`
- `#xiaobaix_fourth_wall_open_settings`
- `window.showFourthWallPopup`
- `window.fourthWallCleanup`
- `LittleWhiteBox:fourthWallFloatBtnPos`
- 日常运行时对旧`fourthWall*`设置和旧`fw`根的读取

legacy 字段名只能存在于升级入口和冻结 fixture 中，并标注退出条件：当不再支持当前 upstream 直接升级时，连迁移器和 fixture 一起删除。

## 8. 阶段 E：自动质量门禁

执行：

```text
npm run test:xiaobai-os
npm run test:tauritavern-chat-surface
npm run build:xiaobai-os
npm run build:assistant:manifest
npm run lint:imports
npm run lint
```

若全量 lint 存在与本次无关的基线问题，必须分开报告；本次修改文件仍需零新增错误。人工浏览器和 WebView 验收不属于本施工阶段。

## 9. Review 清单

### 需求

- 用户入口、桌面和四次元壁完整，无假 APP。
- 两套 OS 只在感知层相似，内部没有 Tavern 依赖。
- 正式线数据得到明确迁移而不是永久兼容。

### 架构

- OS 壳不含四次元壁领域判断。
- 四次元壁不直接操作 DOM 宿主或 Tavern 数据。
- 主聊天媒体增强已独立。
- 一个文件/函数职责明确，没有为了赶切换堆入巨型 Controller。

### 状态

- 只有开关、配置、会话和历史持久化。
- 所有请求和 UI 过程状态均可在 cleanup 中释放。
- 没有 localStorage 路由、运行锁、请求快照或悬浮球位置残留。

### 数据

- 当前聊天只写`chat_metadata.extensions...`，不再套 chat ID。
- mutation 保存前核对 chat identity。
- 未知版本和失败迁移不覆盖用户数据。
- legacy 成功转换后彻底删除，普通读写无 fallback。

### 删除路径

- 旧目录和入口实际删除。
- 新模块可通过“删目录 + 删注册 + 清理数据根”退出。
- 测试、构建、清单和文档不残留旧路径。

## 10. 第一阶段之外

第一阶段不得顺手加入：

- 地图图标或空地图页。
- 钱包演示余额或 Economy 预留表。
- 银行、赌场、商店、任务、宠物类型和通用 Controller。
- Tavern 数据导入、同步或双向桥。
- 为未来 APP 预埋没有真实消费者的共享 store、事件总线或数据库。

后续每个 APP 先完成自己的目标设计、持久态问答和删除策略，再注册到现有 OS 壳。

# Map APP 终态设计

## 1. 定位

Map 是普通小白 OS 的独立世界探索与空间领域，采用小白酒馆已经验证的“双层地图”产品方案：

- Atlas：依据作者设定并合理补全的世界地点、层级、地理位置、路线和人物所在地点；
- Scene：一个具体地点内的俯视几何、出入口、物件和人物位置。

这里复用的是产品经验、语义和绘图规则。普通 OS 不 import`modules/tavern/**`，不使用 Tavern DB、Session、楼层、manager run、state document 或回滚协议。

## 2. 开工检查结论

| 项目 | 结论 |
| --- | --- |
| 功能所有者 | `domains/map`拥有地图格式、语义、校验和纯投影；`apps/map`拥有维护 Prompt、工具、Controller 和 UI |
| 唯一事实来源 | 当前聊天 sidecar 的`map`分区中的规范化 Atlas 与 Scene 集合 |
| 持久态 | 世界地点及稳定位置/地貌、路线、真实人物位置、场景几何和 domain revision |
| 临时态 | 浏览区域、地点选择、搜索筛选、缩放/拖拽/双指手势、弹层、loading/error、Agent 请求、Session staging、修参失败集合 |
| 外部依赖 | ScopedChatStore、Agent/Maintenance Capability、SillyTavern 当前接受轮、本地图标字体 |
| 注册入口 | Map Host/Shell catalog、module、`map`分区 parser、maintenance participant、main prompt runtime |
| 删除路径 | 删除`apps/map`、`domains/map`及两处 catalog/settings/maintenance/prompt 注册，清理`map`分区；共享字体保留给其他消费者 |
| 兼容对象 | SillyTavern/WebView 与 Provider 工具协议；不读取测试线旧根或 Tavern 地图记录 |
| 最少测试 | Atlas/Scene 不变量、intent 编译、接受轮维护、迟到结果、Prompt 安全、关键 UI 浏览器路径 |

## 3. 产品形态

进入 Map 默认显示世界地图，回答「接下来去哪」。采用浮动搜索栏、区域面包屑、地点图钉、路线、定位按钮和底部地点详情，不再把层级树作为地图。

- 有作者地图设计：依据给定设定绘制，未到访不妨碍地点存在。
- 没有明确地理设计：按世界观补充少量多样、互联、有探索价值的去处，不能只有家和公司。
- 世界图按区域浏览；每个地点都能查看详情，不要求先有 Scene。子区域可以深入探索，已有 Scene 可以从详情进入。
- 场景图解释一个具体地点的内部布局；不批量生成未到访地点的内部，不展示作者隐藏的秘密。
- 「回到我的位置」只调整视口和选择，人物位置仍来自 Atlas actor。
- 世界图是有稳定方位的示意地图，不是 GPS 或实际比例尺。无位置的地点使用纯展示排列，不把排列结果写回领域。

## 4. 持久数据模型

```ts
interface MapDomainV1 {
    schemaVersion: 1;
    revision: number;
    atlas: MapAtlas;
    scenes: Record<string, MapScene>;
}

interface MapAtlas {
    locations: MapLocation[];
    links: MapLink[];
    actors: MapActorPosition[];
}

interface MapLocation {
    key: string;
    name: string;
    scale: 'world' | 'region' | 'city' | 'district' | 'building' | 'floor' | 'room' | 'outdoor';
    status: 'mentioned' | 'visited';
    parent?: string;
    sceneKey?: string;
    brief?: string;
    position?: [number, number]; // 所属父区域内的稳定坐标，北为较小 y
    terrain?: 'urban' | 'plain' | 'forest' | 'water' | 'mountain' | 'desert' | 'snow';
}

interface MapLink {
    id: string;
    from: string;
    to: string;
    kind: 'door' | 'stairs' | 'elevator' | 'path' | 'road' | 'portal' | 'passage';
    label?: string;
    bidirectional: boolean;
}

interface MapActorPosition {
    actorKey: string;
    displayName: string;
    locationKey: string;
}

interface MapScene {
    key: string;
    name: string;
    status: 'uninitialized' | 'active';
    viewBox: [number, number, number, number];
    mood?: 'neutral' | 'warm' | 'cold' | 'dark' | 'mystic' | 'danger' | 'calm';
    elements: MapElement[];
}
```

玩家当前位置只以`atlas.actors`中`actorKey: "player"`的记录为准，UI 的“当前地点”由它派生；不再额外持久化第二个`activeLocationKey`。

地点 position/terrain 是地点长期事实，不是视口缓存；属于 MapLocation，随地点编辑/删除，无单独存储或生命周期。省略保留已有值，null 清除，可选表示地点尚未布置或未指定地貌。非法位置/地貌拒绝该项，不静默猜测。当前模型可直接读取未带这些可选事实的地点，不引入旧版运行分支。

Scene element 使用闭合语义，不保存任意 SVG/CSS：

```ts
interface MapElement {
    id: string;
    category: 'wall' | 'road' | 'water' | 'terrain' | 'furniture'
        | 'decoration' | 'door' | 'danger' | 'marker' | 'actor'
        | 'label' | 'grid' | 'magic' | 'secret' | 'light';
    shape: 'rect' | 'circle' | 'path' | 'curve' | 'icon' | 'label';
    geometry: RectGeometry | CircleGeometry | PointGeometry | PointsGeometry;
    kind?: MapElementKind;
    label?: string;
    actorKey?: string;
    icon?: MapIconToken;
    material?: MapMaterial;
    certainty?: 'confirmed' | 'inferred' | 'unknown';
    closed?: boolean;
}
```

- renderer 根据 category/kind/material/mood决定颜色、纹理、图标和线宽；Agent 不能保存 HTML、URL、任意 fill、filter、class 或 style。
- location、link、actor、scene 和 element key 在各自作用域稳定且唯一；人物展示名与稳定 actorKey 分开保存。
- parent、link 端点、actor 位置、location→scene 引用必须存在；父级不能成环。
- Scene 中的 actor element 必须与 Atlas 中同 actorKey 的 location→scene 对应；不能在两个 Scene 重复出现。
- 每次合法修改使 domain revision 连续加一。UI 缩放和当前查看的非玩家地点不进入领域数据。
- Map 分区必须限制文本、坐标、集合数量和总序列化体积；`map`分区的硬上限为 512 KiB，单 Scene 最多 128 个 element，超限领域编辑整体拒绝而不是静默截断旧地图。
- 不保存领域编辑历史、截图、模型原文、Prompt、请求日志或渲染缓存；当前产品没有第二个消费者需要这些持久实体。

## 5. 地图事实与聊天语义

Map 区分「世界建立」与「发生过的故事」：前者允许按设定创造地理，后者必须有接受轮证据。

- 角色/世界书设定优先；当前 Host 注入的是触发的世界书片段，不是全书扫描。没读到不能当成作者没设计；新内容要克制，遇到后续作者设定时尊重并协调。
- 首建或稀疏地图建立有用的探索区域；完整区域不每轮继续扩建、重排或换 key。
- 新目的地用 mentioned（UI 显示未到访），不能因生成地点而标记 visited、移动人物、编造已发生事件或任务进度。
- 本地场景只画剧情涉及的具体地点，隐藏房间、秘密路线与剧透不因存在于作者背景就展示。
- 同一连续空间持续编辑同一 Scene；明显分离的地点才创建新 Scene。
- 人物离开一个场景时更新 Atlas 位置，并移除旧 Scene 中同 actorKey 的图标；同一 actorKey 不能同时出现在多个 Scene。
- Scene 名称不是世界层级。建筑、楼层、房间关系属于 Atlas，墙、门、桌椅属于 Scene。

Map 是“接受后提交的 OS 事实”，不是随消息数组实时重算的缓存。之后编辑、删除或切换旧消息不会自动回滚地图，也不会调用 API。聊天被大幅改写后，用户可明确执行「重新绘制世界」；重建生成完整候选 Map，校验成功后一次替换，失败保留旧地图。

创建 SillyTavern 分支时由 Kernel 复制父 sidecar 的已确认 partitions 并生成新 osId，两个分支之后各自维护。Map 不扫描共同消息前缀猜测应恢复到哪个版本。

## 6. Agent 工具与维护规则

Map participant 自己提供四个高层工具：

- `MapAtlasRead`：默认只返回地点/路线/Actor 数量和玩家位置；`locations/links/actors`按`offset/limit`分页并支持各自过滤，`document`仅供确需完整 Atlas 时显式读取；
- `MapAtlasEdit`：声明式提交`locations/links/actors/remove`，并写入 staging context；地点 key 是稳定身份，parent 可引用同次调用创建的父级，`parent:null`把已有地点移回 Atlas 根级，路线默认双向且可省略派生 id；
- `MapSceneRead`：按明确地点 key、地点名或内部 Scene key 读取一个 Scene；
- `MapSceneEdit`：接收`scene/playerHere/viewBox/mood/elements`绘图意图，自动建立 Location→Scene 关联并写入 staging context。

模型看不到内部领域命令或任何原子 op。Location 的`sceneKey`由`MapSceneEdit`内部建立，既不会从 Atlas read 投影返回，也不能由 Agent 写入；普通 OS 不保存地点别名。`MapAtlasEdit`的声明由 Atlas compiler 展开为领域编辑，删除地点会同时删除其后代、关联路线、Actor 位置和 Scene，只能用于明确纠正、消失或毁坏，不能把“离开地点”当删除。玩家需要详细场景坐标时使用`MapSceneEdit.playerHere + player element`；Atlas actors 的世界位置写入不会凭空生成 Scene 图标。

`MapSceneEdit`逐 element 编译；合法 sibling 进入 staging，坏项进入`skipped`，不会拖死整批。对外 schema 只公布规范 category 和顶层`icon`；`rect`只认`center+size`，path/curve 至少两点。基于实际模型输出的 terrain 类别别名、`geo.icon`、无关空数组和零值污染只在 compiler 入口吸收，不作为第二套公开写法。工具 schema 与运行时入口同时使用领域容量上限；超限 collection 整次拒绝，不先遍历再依赖最终领域校验，修正后的下一次调用会清理该次调用级失败。

Actor 缺少 actorKey 时使用稳定 element id；非 Actor 的 actorKey 被忽略并返回 warning；玩家永远规范化为`actorKey:"player"`，展示名来自本轮捕获并在接受轮入口规范化到 120 字符领域上限的 SillyTavern 用户身份。同一 Actor 移动时同步 Atlas，并删除旧 Scene 图标。工具统一返回`ok/status/changed/applied/skipped/warnings/hint`，applied/skipped 项携带所属 collection，修参只清除同一 collection 下相同 id 的失败：全坏为 failed、混合结果为 partial、幂等结果为 unchanged。

没有通用 state write、任意 JSON path、完整根对象或直接 SVG 工具。模型输出先经过：

```text
宽容 intent
→ 字段白名单与限长
→ 形状/geometry 编译
→ 引用、重复、容量和空间语义校验
→ 内存 staged Map
→ 接受来源与 revision 再确认
→ Scoped Store 以当前 revision 将 Map 写入一个 sidecar candidate
→ Kernel 以一个 commitId 上传并确认
```

维护 Prompt 沿用成熟规则：

1. 先依据作者设定建立/补全有用的世界区域，保留既有 key、位置和连接。人物位置只依据真实剧情。
2. 确认当前地点后，再读取/编辑明确命名的 Scene。
3. 新 Scene 先确定 viewBox 和主要连续地面或外边界。
4. 再放门、路线、家具、危险、物件、标签和人物。
5. 室内通常同时有 terrain 与 wall；开放场景可以使用地面、道路、岸线或地标网络。
6. 默认北上南下；文字只标注真实可见区域，不生成第二个标题。
7. 地点 key 保持稳定；Location→Scene 关联由 Scene 工具维护；路线省略 id 时按端点、方向性和 kind 派生稳定 id。
8. 首次场景只绘制一个可用小图：主要表面/边界、玩家和一至三个已确认锚点，不为“好看”杜撰细节。

打开 APP、切换 Atlas/Scene、选择地点、拖拽和缩放都只读本地数据。只有自动接受轮或用户明确点击「更新地图」「绘制世界地图 / 重新绘制」才可调用 Agent。

## 7. 自动维护开关

- Map 随小白 OS 固定注册并显示在桌面，不存在 Map 专属`enabled`字段或扩展设置复选框。
- `autoMaintenance=false`：仍可查看地图、使用显式维护按钮和主 RP 空间 Prompt；User 发送不产生 Map API 工作。
- `autoMaintenance=true`：User 消息保存后，处理刚被确认的上一接受轮。

Map 无法在本地可靠判断一轮 RP 是否包含新地点或移动，因此最后一种模式会让每个有效接受轮都参加 maintenance 请求，即使 Agent 最终判断无需写地图。开关说明准确写触发时点，不谎称“仅地图变化时调用”，也不另放 API/token 常识提示。

首次启用自动维护不会立即扫描聊天。下一次 User 发送后从刚接受的来源开始；希望立即建立地图时，用户明确点击「绘制世界地图」。

「更新地图」只处理聊天尾部最新的完整 User + 当前所选 Assistant 内容；这次明确点击不要求自动维护已开启。没有完整轮或正在生成时只显示本地提示，不调用 API。「绘制世界地图 / 重新绘制」才允许扫描更长历史并以完整候选 Map 一次替换旧 Map，两者不能共用含糊按钮。点击后直接交给 Host 后台队列，不弹确认框；按钮立即禁用并显示对应运行状态。

sidecar replace 发出前，运行中切聊、关闭自动维护、Map revision 改变、接受消息被编辑/删除/换 swipe 都会使自动 job 的迟到 staging 作废。replace 发出后无法物理回滚；此时等待真实结果，confirmed 才发布 Map snapshot，并停止后续 participant/job，不能向用户伪报“已取消”。API/解析失败不改变旧 Map。

## 8. 主 RP 空间摘要

小白 OS 运行且 Map 已有有效世界地点时，自己的 prompt runtime 在主生成的`IN_CHAT`、depth 1、system role 安装`<current_map>`只读空间摘要。它使用独立 extension prompt key，不与 Tasks 或 Shop 拼成共享业务 Prompt，只输出：

- 当前地点、上级区域与当前地点概况；尚无玩家位置时明确标注尚未确定，不阻止世界注入；
- 从当前位置可直接到达的地点、路径名称与单向约束；
- 800 字范围内尽可能完整的世界地点层级与路线方向关系。

主剧情不投影人物位置或任何 Scene：不输出当前场景、场景人物、出入口、可互动、主表面/地形，也不暴露 key、坐标、shape、category、revision、材质或模型原始文本。所有动态文字经过规范化、限长和 XML/宿主宏编码；最终 800 字符安全栅栏按完整行或完整关系裁减，始终保留完整`<current_map>`边界。

该投影不调用 API，自动维护关闭时仍可使用；无有效地图、dry-run 结束、生成停止、切聊或 OS cleanup 时必须清空。安装/移除沿用现有 generation interceptor 生命周期，代码和字段选择仍归 Map 自己所有。

## 9. UI 与美术

视觉延续掌上 OS：浅色纸地图、绿灰地貌与奶油色浮层；深色采用夜间绿，所有颜色由 Map 局部 token 控制，字体继承 OS。不改 API 与四次元壁内部。

美术完全本地、分辨率无关：世界/场景使用 SVG，世界图导航与地点为本地线图标；场景使用共享 Material Symbols 字体与闭合材质 token。无地图服务、定位服务、图片接口或新增运行依赖。地貌色块仅表达地点景观，不伪装精确区域边界。

UI 位于 `apps/map/ui`：
- `MapApp` 拥有临时浏览状态，`use-map-state` 只拥有 Host 连接、状态与请求。
- `world-map` 按当前区域投影位置与连接；`MapAtlas` / `MapScene` 分别绘制两层。
- `MapViewport` 负责拖拽、滚轮、双指缩放、全图与指定地点居中，不因普通数据更新重置用户视口。
- 搜索、地点详情、设置独立组件；移除旧树形布局和旧模板，不保留双 UI。
- 地图与详情自适应分配高度，保证详情不遮住缩放操作；空图提供明确绘制入口，打开不自动生成。

更新/重新绘制沿用既有后台队列。显示运行、失败、未确认保存、冲突与恢复状态；恢复动作说明影响当前聊天整个 OS 已保存数据，不声称只恢复地图。

## 10. 失败、删除与数据策略

- malformed tool call 只拒绝对应 staged edit；若没有合法变化则不保存。
- 工具解析、参数和可恢复执行错误会作为结构化结果回喂模型；同签名连续失败三次会收到刹车提示，第四次终止，单次 Session 最多 12 个 Provider 回合。
- Provider 后续失败或达到轮次上限时，已有合法 staging 以 partial 提交；没有合法变化则 failed。切聊、关闭自动维护、来源变化或取消会使自动 job 中尚未发出 sidecar replace 的 staging 整体失效。
- sidecar 保存明确失败时保留旧 Map；保存结果不确定时由 Kernel 保留同一 candidate 并按 commitId 确认，不重复调用模型。
- 关闭窗口、返回桌面或切换 APP 只销毁 UI activation，不停止已获准的自动维护、显式维护或重建；重新进入 Map 从 Host runner 读取当前聊天的运行状态与最近结果。runner 状态按聊天隔离，旧聊天的运行或取消结果不得投影到新聊天。关闭自动维护只使自动 job 失效；切聊、OS 总开关关闭和 Host cleanup 才使手动与自动任务失效。若 sidecar replace 已经发出，则等待该次保存落定并如实报告真实结果，不声称能够撤回。
- 删除 Map 功能时直接清理`map`分区，不迁入 Tavern、不保留旧类型或读取壳。
- 共享 Material Symbols 字体是扩展级通用资产，不随 Map 删除。

## 11. 最少必要验证

- Atlas 父级无环、引用完整、玩家位置唯一；
- Scene key/element key 唯一，geometry 与 shape 匹配，禁止任意样式/URL；
- intent 编译对合法宽容输入稳定，对超限/悬空引用整体拒绝；
- 自动维护开关切换与打开 APP 均为零 Agent 请求；
- User 接受轮只产生一次 staged maintenance，swipe/regenerate 不产生；
- revision、聊天 identity、消息文本或 swipe 改变会拒绝尚未进入保存 commit point 的迟到提交；保存已开始后的取消会保留真实提交结果；
- 主 RP 摘要只含安全的世界地点、连接和真实当前位置，生命周期结束后无残留；
- 世界探索、搜索/未到访筛选、区域/场景切换、定位不移动人物、缩放拖拽/双指手势、空地图与深浅原生控件通过真实浏览器检查；
- typecheck、lint、test、build 通过，产物不引用`modules/tavern/**`。

## 12. 发布验收边界

领域、UI、Prompt、高层工具、宽容 compiler、Session、Provider 工具循环、FIFO 和保存栅栏属于同一次 Map 交付，不能把“代码接通”写成发布完成。自动检查结果以当前提交的 CI/命令输出为准，不在长期文档固化易失真的数量或“完整收尾”结论。

发布前仍需在真实 SillyTavern 浏览器完成以下手工验收，未执行前不得写成已通过：

1. 固定入口：OS 启用时 Map 图标固定出现在桌面；自动维护默认关闭，切换它不隐藏图标、不清空间 Prompt。
2. 只读 UI：打开空地图、切换场景/世界、选择地点、拖拽、滚轮/按钮缩放、复位和开关自动维护均不产生 Agent 请求；桌面与窄屏布局无溢出或不可读原生控件。
3. 显式维护：无完整 Assistant 尾轮和主生成进行中均只给本地提示；「维护一次」只处理最新完整尾轮，「建立/重建」读取限定历史；点击无弹窗并立即变为禁用运行态，离开/重开 Map 不中断且仍显示真实状态，成功后 Atlas/Scene 即时刷新。
4. 自动边界：仅发送下一条 User 后为上一接受轮触发一次；Assistant、swipe、regenerate、continue、打开 APP 和切页均为零触发；关闭自动维护后，尚未进入保存 commit point 的迟到结果不提交。
5. 聊天与保存：维护中切聊、编辑证据或换 swipe 会丢弃尚未开始保存的迟到结果；保存已经发出时不伪报取消或回滚。保存未确认时显示冻结状态，维护/重建不调用模型，确认后恢复。
6. 主 RP Prompt：OS 运行且存在世界地点时注入安全摘要；生成预检失败、正常结束、停止、切聊及 OS cleanup 后 prompt key 无残留。
7. 真实供应商：使用已配置 provider 各完成一次维护和重建，确认工具轮次可结束、失败不覆盖旧地图、聊天元数据读回后 Map revision 与 UI 一致。

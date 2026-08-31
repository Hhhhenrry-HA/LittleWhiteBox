# 小白 OS（普通酒馆）

普通酒馆的小白 OS 是一项全新、独立功能。它可以与小白酒馆 Phone OS 使用相近的品牌和交互，但两者不共享数据库、会话、消息层级、领域模型或运行时代码。

## 终态边界

```text
SillyTavern 扩展入口
└─ modules/xiaobai-os
   ├─ host/                 通用宿主适配、根存储、生命周期、frame 协议
   ├─ shell/                OS 外壳、桌面和 APP 路由
   ├─ domains/<domain>/     领域模型、事件、不变量和纯投影
   └─ apps/<app>/           应用服务、Controller、DTO 和 UI
```

- `modules/tavern/**`不在依赖图中。
- `host/`不拥有钱包、银行、游戏、商店或任务规则。
- 每个功能自带领域模型、应用服务和 UI，通过少量注册入口接入。
- 普通聊天内容不是 Economy 的数据源。Economy、Wallet、Game、Bank、Shop 不做剧情哈希、核对或回滚。
- 未来任务若要随主剧情自动维护，由任务领域自己的状态机处理，不向 Economy 添加全局剧情机制。

## 当前 APP

- 四次元壁：独立的皮下会话与实时吐槽，按请求读取当时的主聊天上下文。
- 钱包：Economy 的只读余额和流水界面。
- 银行：定期存单与浮动理财；期限只读取当前已完成 Assistant 回复数量。
- 赌场：三款纯规则游戏；与聊天内容完全无关。
- 商店：固定商品、库存、效果激活和主 RP Prompt 投影；用回复消息收据记录有限效果实际作用次数。

未完成的 APP 不注册占位入口。不明物尚非终态；任务状态机留在后续独立阶段。

## 数据与写入

当前聊天的 OS 数据保存在：

```text
chat_metadata.extensions.LittleWhiteBox.xiaobaiOs
```

`domains.economy.transactions`是余额的唯一事实来源。Bank、Game、Shop 只持久化自己的线性事件；涉及资金的业务动作在同一次根 mutation 中同时写领域事件和 Economy 流水。

保留的通用安全能力：

- 聊天 identity 绑定；
- 根级单写队列；
- revision/eventId CAS；
- actionId 幂等；
- 跨领域不变量与原子提交；
- 保存失败恢复与服务端读回确认。
- 根数据与写入状态变更的运行时通知。

编辑、swipe、删除或分支不会删除已提交的经济、银行、游戏或商店事实。SillyTavern 创建分支时复制怎样的`chat_metadata`，分支就从该快照继续；OS 不猜测用户想回到哪个经济时点。

## APP 打开行为

- 当前聊天已有 Economy：钱包、银行、赌场、商店同步返回可用状态，不发起聊天网络请求，不启动后台核对；Bank 只同步计数内存中的消息角色。
- 当前聊天没有 Economy：APP 先显示`loading`，后台只执行一次开户并刷新页面。
- 保存结果未确认：保留候选数据并冻结后续写入，用户可触发确认。

## 注册与删除

宿主组合位于`host/production-composition.ts`，外壳路由位于`shell/app-src/app-registry.ts`。删除一个业务 APP 的标准路径是：删除对应`apps/`与`domains/`目录、删除两处注册、删除该领域数据；不保留永久兼容壳。

## 验证

```bash
npm run test:xiaobai-os
npm run lint:xiaobai-os
npm run build:xiaobai-os
```

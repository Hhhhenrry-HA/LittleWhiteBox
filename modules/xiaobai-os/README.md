# 普通酒馆小白 OS

- 状态：OS 壳、四次元壁、Economy、钱包、商店、银行与游戏均已完成
- 产品宿主：普通 SillyTavern 聊天界面
- 最近确认：2026-08-30

普通酒馆“小白 OS”是一项全新、独立功能。它与小白酒馆 Phone OS 使用相近的品牌、视觉语言和 APP 交互，但不共享数据库、会话、楼层、回滚、领域模型或运行时代码。

```text
普通 SillyTavern
    ↓
modules/xiaobai-os
    ├─ OS 壳与 APP 生命周期
    └─ 普通酒馆自己的 APP 领域

modules/tavern
    └─ 小白酒馆及其 Phone OS（完全独立）
```

## 当前文档

- [终态设计与开发规划](./docs/target-design-and-roadmap.md)
- [OS 壳与四次元壁实施说明（已完成）](./docs/phase-1-implementation-plan.md)
- [经济平台终态设计](./docs/economy-platform-target-design.md)
- [经济平台与钱包第一施工阶段](./docs/economy-platform-phase-1-implementation-plan.md)
- [商店 APP 终态设计](./docs/shop-app-target-design.md)
- [商店 APP 施工方案](./docs/shop-app-implementation-plan.md)
- [银行 APP 终态设计](./docs/bank-app-target-design.md)
- [银行 APP 施工方案](./docs/bank-app-implementation-plan.md)
- [游戏 APP 终态设计](./docs/game-app-target-design.md)
- [游戏 APP 施工方案](./docs/game-app-implementation-plan.md)

## 不可破坏的边界

1. `modules/xiaobai-os/**`不得 import、动态加载或读写`modules/tavern/**`。
2. 小白 OS 不读取 Tavern IndexedDB，不识别 Tavern Session、accepted snapshot、Phone 消息或 Tavern 楼层。
3. 两边不做数据同步、存档互转或兼容代理。同名 APP 仍是不同领域。
4. 只允许复用无业务归属的 Agent Core、画图、TTS、iframe 通讯等通用能力。
5. 每个有独立业务事实的 OS APP 自带领域模型、存储、Prompt、工具、UI 和清理路径；钱包这类只读投影不另造存储。OS 壳只负责宿主适配、注册、导航与生命周期。
6. 不为未施工 APP 预建共享抽象；Economy 只实现现阶段账本与钱包真实需要的契约，后续能力随真实消费者扩展。
7. 未完成的 APP 不注册、不展示，不用“敬请期待”或空页面占位。

## 已完成：OS 壳与四次元壁

第一阶段只交付完整 OS 壳和一个完整可用的“四次元壁”APP：

- 扩展设置中以“小白 OS”勾选开关启停。
- 开启后在发送键左侧常驻唯一 OS 图标。
- 点击先进入 OS 桌面，再由桌面进入四次元壁。
- 保留正式线四次元壁的会话、生成、设置、图片、语音和实时吐槽能力。
- 迁移正式线已有普通四次元壁数据，删除旧入口和旧实现，不留双读兼容壳。
- 当时未给地图、钱包、银行、游戏、任务和宠物创建占位入口；钱包在独立的 Economy 阶段完成后才注册。

宿主、迁移器和四次元壁 APP 的手写运行时源码均为 TypeScript/Vue；浏览器只加载`dist/`构建产物。自动化行为测试由本目录独立拥有，并通过`tsx`直接验证 TypeScript 源码。

## 已完成：Economy + 钱包

- Economy 是普通聊天自己的共享经济领域，拥有账户规则、不可变流水、幂等、冲正和剧情回滚。
- 钱包只是 Economy 的只读投影，不拥有余额写入，也不承载任务、商店、银行、游戏或宠物逻辑。
- 每个普通聊天有独立账本，首次开户固定获得 100 小白币；余额只由流水推导。
- OS 根数据只有一个持久写入队列；四次元壁和 Economy 不得分别覆盖同一个元数据根。
- 编辑、swipe、中间删除、移动、分支和漏事件后的重载统一用“楼层 + 剧情前缀 SHA-256”识别失效经济事实。
- 本阶段只创建真实的 Economy 与钱包，不给后续 APP 建空页面、空类型或预留 Controller 分支。

Economy 拥有账本规则和按故事前缀裁切的纯逻辑；剧情指纹、临时写门、action runner 与多领域对账调度由`host/`提供，钱包只读取投影。当前已验证编辑、swipe、尾删、中间单删、切聊和真实分支回滚，桌面及 390×844 移动布局均可用。真实生成请求的错误恢复也已复验：供应商返回 HTTP 错误时只显示清晰告警，不把错误 JSON 持久化或伪装成 AI 回复。

## 已完成：商店、银行与游戏

- 商店拥有固定目录、库存/效果事件链和主 RP Prompt 投影；购买、使用、停用与 Economy 在同一 OS 根中提交和回滚。
- 银行只拥有定期存单、浮动理财、头寸和金融结算；到期进度来自普通剧情 Assistant 回合。
- 游戏是独立 APP 与独立领域，拥有秘骰、翻倍或收手、鎏金阶梯三款纯规则游戏；不依赖 Bank，也不向主 RP 注入内容。
- Bank 与 Game 都只通过 Economy 原子处理托管和结算，钱包仍只是账本的只读投影。
- 三个 APP 均已注册真实入口；没有空页面、余额副本或跨领域代理命令。

后续任务仍需先完成自动推进、结算与回滚时序设计。不明物当前产品形态尚非终态，也不进入本轮。未完成的 APP 不注册占位入口。

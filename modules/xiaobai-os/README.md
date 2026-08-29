# 普通酒馆小白 OS

- 状态：第一阶段实现完成，已接入普通 SillyTavern 运行时
- 产品宿主：普通 SillyTavern 聊天界面
- 最近确认：2026-08-29

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
- [第一阶段施工方案](./docs/phase-1-implementation-plan.md)

## 不可破坏的边界

1. `modules/xiaobai-os/**`不得 import、动态加载或读写`modules/tavern/**`。
2. 小白 OS 不读取 Tavern IndexedDB，不识别 Tavern Session、accepted snapshot、Phone 消息或 Tavern 楼层。
3. 两边不做数据同步、存档互转或兼容代理。同名 APP 仍是不同领域。
4. 只允许复用无业务归属的 Agent Core、画图、TTS、iframe 通讯等通用能力。
5. 每个 OS APP 自带领域模型、存储、Prompt、工具、UI 和清理路径；OS 壳只负责导航与生命周期。
6. 没有第二个真实消费者前，不建立想象中的 OS 共享领域层。
7. 未完成的 APP 不注册、不展示，不用“敬请期待”或空页面占位。

## 第一阶段交付边界

第一阶段只交付完整 OS 壳和一个完整可用的“四次元壁”APP：

- 扩展设置中以“小白 OS”勾选开关启停。
- 开启后在发送键左侧常驻唯一 OS 图标。
- 点击先进入 OS 桌面，再由桌面进入四次元壁。
- 保留正式线四次元壁的会话、生成、设置、图片、语音和实时吐槽能力。
- 迁移正式线已有普通四次元壁数据，删除旧入口和旧实现，不留双读兼容壳。
- 地图、钱包、银行、赌场、任务和宠物不在第一阶段创建入口。

运行时代码、迁移器、四次元壁 APP 与自动化测试均由本目录独立拥有。

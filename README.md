# LittleWhiteBox

一个面向 SillyTavern 的多功能扩展，包含剧情总结/记忆系统、变量系统、任务与多种面板能力。集成了画图、流式生成、模板编辑、调试面板等组件，适合用于复杂玩法与长期剧情记录。

## 功能与开发资料

- [普通酒馆小白 OS](./modules/xiaobai-os/README.md)：现行功能入口、存储边界与验证命令。APP 的设计和施工记录不等于当前功能清单，以运行时注册为准。
- [剧情总结的记忆维护](./modules/story-summary/docs/memory-maintenance-target-design.md)：记忆语义、修改边界与验收口径；[施工状态](./modules/story-summary/docs/memory-maintenance-implementation-plan.md)和[验证记录](./modules/story-summary/docs/memory-maintenance-verification.md)分别记录实现及历史检查。
- [Agent Core](./modules/agent-core/README.md)：跨功能的模型接入能力与边界。

历史设计稿、实施计划和验证记录用于查证当时的决定，不应代替现行代码、当前注册表或真实质量验收结果。

## 许可证

详见 `docs/LICENSE.md`

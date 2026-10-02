# 云上叠叠屋

现有游戏大厅中的独立 3D 平衡游戏。规则与产品边界见 [设计](../../../docs/stacking-game-target-design.md)。

## 边界

规则/金额/几何只在 `policy.ts` 定义；`rules.ts` 检查每层累计重心并认证随机开局；`domain.ts` 从种子及操作派生楼体和结算。`partition.ts` 校验用户分区，`economy.ts` 管自己的钱包腿，`service.ts` 原子提交，`host.ts`/`client.ts` 处理身份及恢复。`recovery.ts` 仅保留尚未确认的一条用户操作；不是钱包或楼体副本。`scene/` 不决定输赢，音频只在页面存在。

删除：移除本目录、Game 模块/production runtime/大厅条目/声音设置注册；清理用户 `stacking` 分区和本站 `LittleWhiteBox:stacking:pending` 本地键。既有 `stacking:` 钱包审计留存，不倒扣已发收益。

## 验证入口

```sh
node --import tsx --test modules/xiaobai-os/tests/stacking-*.test.js
node --import tsx modules/xiaobai-os/tests/fixtures/stacking-strategy-experiment.mjs
node --import tsx modules/xiaobai-os/tests/fixtures/stacking-browser-server.mjs
```

浏览器脚本与生产规则分开；不带自动解题入口到游戏页面。外部设备与真人体验不由自动测试保证。

# 赌场 APP 终态设计

## 1. 定位

Game 是独立纯规则游戏领域，提供秘骰对决、翻倍或收手、鎏金阶梯。玩家进入 APP 直接玩游戏；Game 不生成剧情、不调用模型、不修改角色、不读取主聊天消息或回合。

## 2. 所有权与结构

```text
domains/game/
├─ games/             三个纯状态机
├─ types.ts           私有状态、事件、活动、公开 DTO
├─ timeline.ts        线性事件与 CAS/幂等
├─ invariants.ts      事件和私有状态校验
├─ view.ts            私有信息裁剪
├─ money.ts
└─ random.ts

apps/game/
├─ application/       Game/Economy 原子协议
├─ host/              activation、frame、presentation
└─ ui/                大厅、三款游戏、记录与弹窗
```

Game 只拥有游戏状态。余额属于 Economy；根队列属于 host；UI 不决定随机或派彩。

## 3. 持久与临时态

持久化`GameDomainV1.events`。进行中的庄家骰子、洗牌后的完整牌堆和阶梯步骤是重启必须恢复的游戏事实，因此随事件 result 保存。

客户端只获得安全投影：

- 秘骰不暴露庄家骰子；
- 翻倍游戏不暴露完整牌堆或下一张牌；
- 阶梯只暴露已完成步骤和下一步概率；
- 终局记录不带不需要公开的私有引用。

操作弹窗、动画、busy、主生成状态和分页是临时态。

## 4. 资金协议

开始游戏时，下注从 player 进入`escrow:game:<gameId>`。中间动作不写资金。终局时：

- 正收益由 game reserve 补足 escrow；
- payout 从 escrow 给 player；
- 亏损从 escrow 进入 sink；
- 结算后 escrow 必须为 0。

Game event 与资金腿在一次根 mutation 中提交。交叉不变量从每个 event 重建预期资金腿并拒绝孤儿交易或 escrow 偏差。

## 5. 命令、安全与随机

每个写动作绑定 chat identity、gameId、actionId 和`revision + eventId`。任一业务校验失败前不得读取随机数。已提交 action 重放不生成新 ID、不抽新随机、不重复保存。

同一时间最多一个 active game。Controller 串行化前台动作，主生成期间不接受新游戏动作，但允许纯幂等重放。

聊天编辑、swipe、删除或 Assistant 数量变化不会改变 Game 事件、余额或 escrow。

## 6. 打开、失败与删除

已有 Economy 时 APP 同步打开，不注册聊天内容后台任务。首次缺少 Economy 时显示`loading`并异步开户。

明确保存失败恢复 Game 与 Economy 旧根；未确认保存保留同一候选并冻结动作，确认不重新抽牌。

删除 Game 前处理 active game escrow，再删除`apps/game`、`domains/game`、注册和`domains.game`数据。

最低验收：三款纯规则状态机、随机边界、私有投影、CAS/幂等、托管/派彩原子性、失败恢复、聊天内容无关、移动端可玩性。

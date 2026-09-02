# 赌场 APP 终态设计

## 1. 定位

Game 是独立纯规则游戏领域，提供秘骰对决、翻倍或收手、鎏金阶梯。玩家进入 APP 直接玩游戏；Game 不生成剧情、不调用模型、不修改角色、不读取主聊天消息或回合。

## 2. 所有权与结构

```text
domains/game/
├─ games/             三个纯状态机
├─ types.ts           私有状态、事件、活动、公开 DTO
├─ timeline.ts        线性事件与 CAS/幂等
├─ invariants.ts      持久格式与冻结事实校验
├─ history.ts         V1 生命周期与历史连续性
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

### 3.1 当前策略与历史事实

三个`games/`状态机只负责新开局和 active game 的下一次动作。已保存事件由`history.ts`按 V1 历史合同重放：

- 骰子核对骰面、叫价顺序、挑战者与输赢类别，但不重新选择庄家叫价，也不按当前赔率重算 payout；
- 翻倍游戏核对已保存下注、牌堆、抽取顺序、揭示数量与终态，不用当前固定下注或金币价值重建旧局；
- 阶梯核对已保存步骤、选择、金额连续性与终态，不用当前倍率、层数或封顶策略重算旧局。

历史层仍严格验证事件格式、ID/revision、生命周期、状态连续性、安全金额、`net = payout - amountIn`和 Economy 资金腿。产品参数变化只能影响以后接受的新动作；不能原地改变既有事件的含义。

## 4. 资金协议

开始游戏时，下注从 player 进入`escrow:game:<gameId>`。中间动作不写资金。终局时：

- 正收益由 game reserve 补足 escrow；
- payout 从 escrow 给 player；
- 亏损从 escrow 进入 sink；
- 结算后 escrow 必须为 0。

Game event 与资金腿在一次根 mutation 中提交。交叉不变量从 event 已冻结的下注与 payout 重建预期资金腿并拒绝孤儿交易或 escrow 偏差，不读取当前游戏参数重算旧结果。

## 5. 命令、安全与随机

每个写动作绑定 chat identity、gameId、actionId 和`revision + eventId`。任一业务校验失败前不得读取随机数。已提交 action 重放不生成新 ID、不抽新随机、不重复保存。

同一时间最多一个 active game。Controller 串行化前台动作，主生成期间不接受新游戏动作，但允许纯幂等重放。

聊天编辑、swipe、删除或 Assistant 数量变化不会改变 Game 事件、余额或 escrow。

## 6. 打开、失败与删除

已有 Economy 时 APP 同步打开，不注册聊天内容后台任务。首次缺少 Economy 时显示`loading`并异步开户。

明确保存失败恢复 Game 与 Economy 旧根；未确认保存保留同一候选并冻结动作，确认不重新抽牌。

删除 Game 前处理 active game escrow，再删除`apps/game`、`domains/game`、注册和`domains.game`数据。

最低验收：三款纯规则状态机、当前策略只约束新动作、历史冻结事实不被新策略重判、随机边界、私有投影、CAS/幂等、托管/派彩原子性、失败恢复、聊天内容无关、移动端可玩性。

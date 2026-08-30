# 普通酒馆小白 OS 游戏 APP 施工方案

- 状态：已完成
- 依据：[游戏 APP 终态设计](./game-app-target-design.md)
- 原则：三款游戏只属于 Game；私有状态、原子资金与恢复路径全部完成后才注册入口
- 确认日期：2026-08-30

## 1. 开工检查

| 问题 | 结论 |
|---|---|
| 功能所有者 | `domains/game`拥有游戏规则、私有状态、活动、事件链与纯投影；`apps/game/application`拥有根对账、Economy 联动、命令编排和应用服务；`apps/game/host`拥有 Controller/宿主适配；`ui`拥有界面 |
| 唯一事实来源 | 余额来自 Economy；active game 和终局 activity 来自有效`domains.game.events`重放 |
| 临时态 | 路由、表单、dialog、动画、busy 和公开投影缓存 |
| 持久态 | Game command/result、私有骰子/牌堆/步骤、终局活动和 story anchor |
| 外部依赖 | 通用 Economy ledger、story action runner、根 store、reconciliation composition、shell |
| 注册入口 | Game app registry、Game validator/reconciler 与 Game-Economy 交叉校验 |
| 删除路径 | 先处理`escrow:game:*`，再删除 Game 数据、目录和注册；Bank 不参与 |
| 最少测试 | 三款状态机、私有投影、原子托管/结算、幂等随机、剧情回滚、Controller、浏览器 |

## 2. 依赖方向

```text
Game Vue
   ↓ DTO / command
apps/game/host/controller
   ↓
apps/game/application/service
   ├─→ application/{commands,action-policy,root-protocol}
   ├─→ domains/game/{games,money,timeline,view}
   ├─→ domains/economy 通用账本命令
   └─→ host story-action-runner + root store

story-reconciliation-runtime
   └─→ 注入 Game reconciler
```

强制禁止：Game import Bank；Bank import Game；Economy import Game；Game 读取 Bank 头寸或 escrow；Wallet 代理游戏命令；Game 注册 Prompt。共享仅限通用 Economy/host/shell 契约。

## 3. 阶段 A：确认独立 Game 纯领域

目标文件：

```text
domains/game/types.ts
domains/game/money.ts
domains/game/random.ts
domains/game/games/dice-bluff.ts
domains/game/games/push-your-luck.ts
domains/game/games/risk-ladder.ts
domains/game/invariants.ts
domains/game/timeline.ts
domains/game/view.ts
tests/game-rules.test.js
tests/game-domain.test.js
```

1. 以`domains/game`作为三款现有游戏的唯一所有者；Bank 中不得保留调用、转发导出或测试副本。
2. 固化全部已确认下注、概率、倍率、层数、牌数和 50,000 封顶规则，金额统一为安全整数并向下取整。
3. 三个状态机只接收 state/action/random 并返回新 state 或 terminal result，不读取 story、Economy、Date、DOM、Vue 或全局随机。
4. 一条事件链重放得到最多一个 active game；终局 activity 内嵌于终局 event，不维护第二条历史。
5. 校验 revision 连续、ID 唯一、anchor/turn 不倒退、动作和游戏匹配、状态转换可验证、`net === payout - amountIn`。
6. public view 深拷贝并移除活跃庄家骰子、deck、下一张牌、story anchor 和内部随机材料。

最低纯测试：

- 骰局覆盖下注 50/500 和非法步长、万能一点、1-10 叫数、叫数顺序、双方质疑、庄家 0.25/0.55 边界和`floor(bet * 19 / 10)`。
- 翻倍游戏覆盖 7 金币/3 炸弹洗牌、首张炸弹、各收手点、第 7 金币自动 350、未翻金币不可收手和 deck 不泄漏。
- 阶梯覆盖下注 30/800、`floor(bet * 0.9)`、80%/55%/30%阈值、三种向下取整、失败、收手、第 5 层和 50,000 封顶。
- 同一事件重放不重新随机，输入对象不被修改，一个 active game 阻止任意第二局。

## 4. 阶段 B：Game application + Economy 原子服务

新增：

```text
apps/game/application/action-policy.ts
apps/game/application/commands.ts
apps/game/application/root-protocol.ts
apps/game/application/service.ts
tests/game-repository.test.js
```

服务面：

```ts
interface GameService {
    readCurrent(): GameClientView;
    startDice(input): Promise<GameClientView>;
    bidDice(input): Promise<GameClientView>;
    challengeDice(input): Promise<GameClientView>;
    startPush(input): Promise<GameClientView>;
    drawPush(input): Promise<GameClientView>;
    cashOutPush(input): Promise<GameClientView>;
    startLadder(input): Promise<GameClientView>;
    stepLadder(input): Promise<GameClientView>;
    cashOutLadder(input): Promise<GameClientView>;
}
```

每个写动作按固定顺序执行：

1. story runner 捕获 chat identity、fingerprint 和 anchor。
2. 根 mutation 对账 Game 与 Economy，重放当前 private state。
3. 先处理 actionId 幂等，再校验`revision + eventId`、gameId、active game 和具体动作。
4. 开局同时校验下注与玩家余额；所有校验通过后才掷骰、洗牌或抽阶梯结果。
5. 计算一个 Game event 及本动作 Economy legs；中间步骤允许零条资金腿。
6. 终局 event 同时写 activity，并将对应 escrow 完整结清。
7. 校验 Game、Economy 和交叉 action 后，commit guard 复核聊天与故事，仅保存一次并读回确认。

资金要求：

- 开局由`player`转入`escrow:game:<gameId>`，与私有初始状态原子提交。
- payout 大于 bet 时由`counterparty:game:reserve`补足；小于 bet 时剩余转`system:sink`。
- payout 为 0 时不写零金额收入，下注托管全部进入 sink；终局 escrow 必须为 0。
- event、activity 和资金腿共用 actionId/anchor；Economy 只看通用`sourceDomain = game`与 sourceId。

随机保存要求：

- action 幂等命中直接返回已存结果，不能再次消耗随机源。
- 明确保存失败恢复旧根且不显示候选；用户新 action 可重新抽取。
- 保存未确认时保留原候选并冻结该聊天后续根写；确认流程只能确认该候选或恢复旧根。

集成测试覆盖三种开局扣款、所有终局资金腿、活动金额、余额不足、第二局拒绝、非法步骤、快速双击、CAS 冲突、明确失败、未确认保存和每个终局 escrow 归零。

## 5. 阶段 C：Game 对账与 composition

1. 在 production composition 独立注册 Game validator、reconciler 和 Game-Economy 交叉不变量。
2. 从第一条失效 Game anchor 起裁掉完整事件后缀；activities 随所属 event 删除。
3. Economy 在同一次根 mutation 中裁掉对应 action 后缀；每个保留的 Game 资金 action 必须有金额匹配的 Economy legs。
4. 重放剩余事件恢复精确 private state；空事件根删除`domains.game`。
5. 分支首次读取、Game 激活、每次 Game 写动作和漏事件后的重载都走同一对账路径。
6. Game 与 Bank 各自注册和执行 reconciler，彼此不调用、不过滤、也不解析对方事件。

测试回到开局前、中间步骤前和终局前，以及编辑、swipe、中间删除、尾删与分支复制。要求下注、赔付、activity、escrow 和私有状态共同恢复，禁止重新随机、字段级 merge 或自动补账。

## 6. 阶段 D：Controller 与 Game UI

新增：

```text
apps/game/descriptor.ts
apps/game/types.ts
apps/game/host/controller.ts
apps/game/host/presentation.ts
apps/game/ui/*
tests/game-controller.test.js
```

协议仅包含：

```text
game/refresh
game/dice/start | bid | challenge
game/push/start | draw | cash-out
game/ladder/start | step | cash-out
game/records/load-more
game/confirm-save
```

- activate 获取稳定聊天 identity，确保 Economy 可用，完成对账后返回余额与`GameClientView`；浏览大厅不创建 Game 根。
- Controller 同一 activation 只允许一个写 request；切聊/deactivate 使迟到结果失效，但不改变对局。
- Host 按 type 使用具体 schema；iframe 不能提交概率、赔率、payout、随机结果、dealer dice、deck 或 private state。
- UI 先完成大厅和“继续当前对局”，再分别接入三个独立游戏组件，最后完成 records、错误恢复、移动适配和 reduced motion。
- 游戏动画仅呈现已保存结果；隐藏值不得进入 Vue state、DOM、aria、data attribute、console 或错误文案。
- Game APP 三款游戏与恢复路径完整后单独注册，不等待 Bank，也不嵌入 Bank 页面。

## 7. 验证与完成条件

自动门：

```text
npm run build:xiaobai-os
npm run test:xiaobai-os
npm run lint
git diff --check
```

浏览器验收：

1. 聊天 A 开局后聊天 B 可独立开局，切回 A 恢复精确状态。
2. 三款游戏覆盖继续、失败、获胜、主动收手、自动结算、刷新和关闭 APP 恢复。
3. 任意聊天只能有一个 active game；拒绝第二局时余额和随机源不变化。
4. active 骰局协议/DOM 无 dealer dice；翻倍游戏无 deck/下一张牌；阶梯不暴露随机值。
5. 快速双击、CAS 过期、切聊、明确失败和未确认保存均不重复扣款、随机或派彩。
6. 编辑、swipe、删除和分支恢复精确游戏步骤、activity 与钱包余额。
7. Prompt Inspector 无 Game 内容；Game 构建图不含 Bank，Bank 构建图不含 Game。

完成时再通盘确认：Game 独占三款游戏；所有终局 escrow 归零；私有随机状态不越界；事件、活动和资金原子；删除 Game 不影响 Bank。

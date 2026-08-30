# 普通酒馆小白 OS 游戏 APP 终态设计

- 状态：已实施
- 适用范围：普通 SillyTavern / `modules/xiaobai-os/**`
- 不适用范围：`modules/tavern/**`及 Bank APP
- 确认日期：2026-08-30

## 1. 产品定位

Game 是普通小白 OS 的独立纯规则游戏领域和独立 APP。它拥有骰局、翻倍或收手、风险阶梯三款多步游戏，在 Economy 中托管下注并按规则结算，不生成剧情、不调用模型、不修改角色，也不向主 RP 注入内容。

```text
Economy / player
      │ 下注
      ▼
Game 独立对局与私有随机状态
      │ 终局结算
      ▼
Economy / player
```

Game 不是 Bank 的内嵌游戏区。它使用 Economy 的同一种小白币，但拥有自己的`domains.game`事件链、服务、Controller、UI、对账和删除生命周期。

### 已确认决策

- 三款游戏为骰局、翻倍或收手、风险阶梯，数值规则保持不变。
- 每个普通聊天最多一局 active game，三款游戏共用这一上限。
- 每个聊天状态独立；切聊不共享对局。
- 关闭 APP、刷新或切聊只暂停 UI，进行中对局保持原私有状态且不自动收手。
- 游戏只由显式玩家动作推进，不随主 RP 或 Assistant 回合自动推进。
- 随机结果只由 Game 领域产生；Vue 和 Controller 不生成随机数。
- Game 零 LLM、零 Prompt、零普通聊天消息写入。

## 2. 所有权与依赖

### `domains/game`拥有

- 三款游戏的静态规则、合法动作、庄家决策、概率、赔率和赔付上限。
- 每个聊天唯一 active game 及恢复对局所需的完整私有随机状态。
- 终局 Game activities 和独立`domains.game`事件链。
- 幂等、CAS、不变量、故事前缀裁切规则、公开 DTO 投影和随机源边界。

### `apps/game`拥有

- `application/`：Game-Economy 根协议与交叉不变量、剧情对账、命令策略、原子托管/结算和应用服务。
- `host/`：Controller、iframe/SillyTavern 协议与激活生命周期。
- `ui/`：交互、错误文案和渲染；不生成随机数、不接触私有根状态。

### 外部通用能力

- Economy：玩家余额、托管账户、对手方账户、不可变流水和非透支规则。
- OS host：聊天 identity、story fingerprint/anchor、根写队列、保存确认和 domain composition。
- OS shell：独立 APP 注册、导航、设备壳和激活生命周期。

### 强制依赖边界

- Game 只能依赖通用 Economy、host 和 shell 能力，不得 import Bank 的类型、服务、事件、产品、UI 或常量。
- Bank 同样不得 import Game。两者不得共享业务联合类型、Controller、事件链或数据根。
- Economy 和通用 host runtime 不得依赖 Game；只有`production-composition.ts`作为组装入口导入 Game 注册项。
- 删除 Game 不得影响 Bank；删除 Bank 也不得中断 Game。

## 3. 核心不变量

1. 玩家余额只来自 Economy；Game 不保存余额副本。
2. 当前 active game 只由当前剧情前缀内有效的`domains.game.events`线性重放得到。
3. 每个聊天同时最多一个 active game；开始第二局必须失败且不扣款、不抽随机。
4. 每个 Game event、其终局 activity 和同动作全部 Economy 资金腿在同一个 OS 根候选中提交或共同失败。
5. 游戏规则、概率、赔率、下注范围和上限只来自 Game 静态代码，不信任 iframe。
6. 每个动作校验 chat identity、story anchor、gameId、actionId 和`revision + eventId`。
7. 所有校验完成后才消耗随机数；幂等重放不能重新掷骰、洗牌或判定阶梯。
8. 活跃骰局的庄家骰子和翻倍游戏的 deck/下一张牌不得进入 Controller/Vue DTO。
9. 只读投影不推进游戏、不抽随机、不追加事件。
10. 编辑、swipe、删除、移动、分支和漏事件重载后，Game 与 Economy 恢复到同一有效剧情前缀。
11. 未完成三款游戏、资金闭环、恢复路径和 UI 前不注册 Game APP。

## 4. 终态结构

```text
modules/xiaobai-os/
├─ apps/game/
│  ├─ descriptor.ts
│  ├─ types.ts
│  ├─ application/
│  │  ├─ action-policy.ts
│  │  ├─ commands.ts
│  │  ├─ root-protocol.ts
│  │  └─ service.ts
│  ├─ host/
│  │  ├─ controller.ts
│  │  └─ presentation.ts
│  └─ ui/
│     ├─ GameApp.vue
│     ├─ GameLobby.vue
│     ├─ GameDiceGame.vue
│     ├─ GamePushGame.vue
│     ├─ GameLadderGame.vue
│     ├─ GameRecords.vue
│     ├─ GameActionDialog.vue
│     └─ game.css
├─ domains/game/
│  ├─ types.ts
│  ├─ money.ts
│  ├─ random.ts
│  ├─ invariants.ts
│  ├─ timeline.ts
│  ├─ view.ts
│  ├─ games/
│  │  ├─ dice-bluff.ts
│  │  ├─ push-your-luck.ts
│  │  └─ risk-ladder.ts
│  └─ README.md
└─ tests/
   ├─ game-rules.test.js
   ├─ game-domain.test.js
   ├─ game-repository.test.js
   └─ game-controller.test.js
```

三个游戏始终是独立纯状态机。庄家判断、概率、合法动作和随机消费不得进入 Controller 或 Vue。

## 5. 持久模型

```ts
interface GameDomainV1 {
    schemaVersion: 1;
    events: GameEvent[];
}

interface GameEvent {
    revision: number;
    eventId: string;
    actionId: string;
    command: GameAction;
    result: {
        changes: GameChange[];
        activities: GameActivity[];
    };
    anchor: XiaobaiOsStoryAnchor;
    assistantTurn: number;
    createdAt: number;
}

type GameChange =
    | { kind: 'game-started'; game: GameActiveGame }
    | { kind: 'game-advanced'; game: GameActiveGame }
    | { kind: 'game-ended'; gameId: string };

interface GameState {
    activeGame?: GameActiveGame;
}
```

- 第一次成功开局才创建`domains.game`；打开大厅不创建数据。
- revision 从 1 连续递增；`revision + eventId`是 CAS token。
- 每个玩家步骤是独立 Game event。继续事件保存下一份完整私有 active state；终局事件移除 active game，并内嵌完整可审计终局 activity。
- activities 只存在于产生它的 event result，记录`amountIn`、`payout`、`net`和严格游戏 detail，不建立第二条历史。
- 关闭 APP、重载和分支恢复均从事件重放；不另存 current state、localStorage、IndexedDB 或后台计时器。

## 6. 三款游戏规则

所有 Game payout 都是 0 至 50,000 的安全整数；乘法统一向下取整。具体游戏规则如下。

### 骰局

- 玩家和庄家各 5 颗骰子；一点为万能牌，叫面只允许 2-6。
- 叫数数量为 1-10。后叫必须数量更大，或数量相同且点数更大。
- 玩家可加叫或质疑。玩家加叫后，庄家在同一事务中完成加叫或质疑；持久 active state 始终等待玩家。
- 质疑时，双方等于目标点或一点的骰子计入；实际数量不少于叫数则叫方胜。
- 下注 50-500，步长 10；玩家获胜总赔付为`floor(bet * 19 / 10)`，失败赔付 0。
- 庄家根据自身匹配数和玩家 5 颗未知骰的二项分布判断：概率低于 0.25 时质疑，高于 0.55 时优先合法加叫，0.25-0.55 闭区间由随机源决定。
- 活跃对局的庄家骰子不得进入 public view。

### 翻倍或收手

- 固定入场下注 50。
- 牌堆共 10 张：7 金币、3 炸弹；开局使用 Fisher-Yates 洗牌并只保存于私有状态。
- 每张金币使可收手金额增加 50；至少翻出 1 张金币后才能收手。
- 炸弹立即以 0 赔付结束；第 7 张金币成功后自动以 350 赔付结算。
- public view 只展示已翻金币、剩余牌、剩余炸弹、下一张爆炸概率和当前可收手额，不展示 deck 或下一张牌。

### 风险阶梯

- 下注 30-800，步长 10；`riskBase = floor(bet * 0.9)`。
- 至少成功一层后才能收手；失败立即以 0 赔付结束。

| 选择 | 成功率 | 成功金额 |
|---|---:|---:|
| 稳 | 80% | `floor(current * 5 / 4)` |
| 中 | 55% | `floor(current * 20 / 11)` |
| 险 | 30% | `floor(current * 10 / 3)` |

- 最多 5 层；第 5 层成功自动结算。
- 总赔付封顶 50,000；任一步达到封顶立即结算。
- UI 显示三个选择的成功率和成功后的确切整数金额。
- activity 保存每层选择、成功与金额；active state 只保存已成功步骤。

## 7. 随机与私有投影

```ts
interface GameRandomSource {
    nextInt(maxExclusive: number): number;
}
```

- 生产实现封装同步`Math.random`；本地 metadata 不冒充服务器防作弊。
- 测试注入确定整数序列；ID 生成器与游戏随机源分开。
- 开局事件持久化骰子或洗牌结果；阶梯每一步在对应事件中持久化结果。重放绝不重新随机。
- chat/story/CAS/幂等、active game 和动作合法性全部通过后才读取随机数。
- 明确保存失败恢复旧根且不展示候选；新 action 可重新抽取。保存未确认时保留原候选、冻结该聊天后续 OS 根写入，确认不得重新随机。
- `view.ts`构造无私有引用的深拷贝 DTO。活跃庄家骰子、完整 deck、下一张牌、story hash、escrow account ID 和内部随机材料不得跨过 application service 边界。
- 终局 event 可保留完整审计结果；Controller 仅投影产品明确允许展示的终局信息，不返回持久私有对象。

## 8. Economy 托管与原子结算

资金腿使用`sourceDomain = game`和该对局的稳定 gameId/sourceId：

```text
开局：player → escrow:game:<gameId>                           bet
盈利：counterparty:game:reserve → escrow:game:<gameId>     payout - bet
赔付：escrow:game:<gameId> → player                           payout
损失：escrow:game:<gameId> → system:sink                      bet - payout
```

- 开局扣款、私有初始状态和 Game event 一次提交。
- 中间步骤没有资金腿，但私有状态变化仍作为一个 Game event 经根写队列保存。
- 终局 event、activity、补足/赔付/损失资金腿一次提交；金额为 0 的腿不写流水。
- 每个终局 game 的 escrow 必须归零。失败局不伪造零金额收入，activity 记录零赔付。
- Economy 只执行通用账户和流水规则，不理解游戏类型；Game 不读取或修改 Bank escrow。

## 9. 对账、Controller 与 UI

- 每个 Game event 持有普通 story anchor；第一条失效事件及后缀、内嵌 activities 和对应 Economy action 在一次 reconciliation 中共同裁切。
- 回到开局前，对局和下注共同消失；回到中间步骤前，恢复当时私有状态；回到终局前，赔付与 activity 消失且对局恢复。
- 分支首次读取、Game 激活、每次 Game 写动作和漏事件后的重载都执行对账。Game reconciler 不调用 Bank reconciler。

Controller 协议：

```text
game/refresh
game/dice/start | bid | challenge
game/push/start | draw | cash-out
game/ladder/start | step | cash-out
game/records/load-more
game/confirm-save
```

APP 路由：

```text
/                 大厅或继续当前对局
/dice
/push
/ladder
/records
```

- 顶部显示 Economy 可用余额和当前下注托管额；一个 active game 时只能继续该局。
- 三款游戏使用独立组件与视觉，不在`GameApp.vue`堆叠状态机。
- iframe 不得提交赔率、概率、payout、随机结果或 private state。
- 活跃隐藏值不得出现在 DOM、aria、data attribute、console 或错误文案。
- records 首屏 50 条并显式分页；动效只呈现已提交结果，不能决定结果。

## 10. 删除路径与非目标

删除 Game：

1. 对每个 active game 选择明确丢弃或一次性终止清算，不能遗留无法解释的`escrow:game:*`余额。
2. 决定保留或清理`sourceDomain = game`的 Economy 历史；Economy 本身不删除。
3. 删除`apps/game/`、`domains/game/`及 Game 的 app、validator、reconciler 和 cross-domain invariant 注册。
4. 对可升级聊天删除`domains.game`，再删除 Game 测试和文档入口。
5. 不修改`domains.bank`、Bank 注册、Bank escrow 或 Bank 历史。

Game 不提供存款、理财、贷款、跨聊天资产、排行榜、多人庄家、联机博彩、真实货币或服务器级防作弊。

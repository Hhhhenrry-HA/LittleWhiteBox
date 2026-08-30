# 普通酒馆小白 OS 银行 APP 终态设计

- 状态：已实施
- 适用范围：普通 SillyTavern / `modules/xiaobai-os/**`
- 不适用范围：`modules/tavern/**`小白酒馆银行
- 确认日期：2026-08-30

## 1. 产品定位

银行是普通小白 OS 的存款与理财领域。它把 Economy 中的玩家可用余额锁定为定期存单或浮动理财头寸，并在到期领取或定期提前支取时完成资金结算。

```text
Economy / player
      │ 开仓
      ▼
Bank 头寸与金融活动
      │ 到期领取或提前支取
      ▼
Economy / player
```

Game 是独立 APP 和独立领域，不是 Bank 的页面、子模块、状态分支或余额类型。Bank 不拥有任何游戏、下注、牌堆、骰子、游戏随机状态或游戏活动。

### 已确认决策

- Bank 提供三种定期存单和三种浮动理财。
- 每个普通聊天拥有独立的`domains.bank`事件链；聊天之间不共享头寸。
- 期限只按当前有效普通剧情中已完成的 Assistant 回复数推进。
- 只读打开 Bank 不结算。到期头寸显示“可领取”；用户领取或执行另一项 Bank 写动作时才尝试同事务前置结算。
- 关闭 APP、刷新和切聊不改变头寸。
- Bank 零 LLM、零 Prompt、零普通聊天消息写入。
- 所有金额为整数小白币，利率使用整数基点，不持久化浮点金额。

## 2. 所有权与依赖

### `domains/bank`拥有

- 定期与理财产品目录、冻结合同和整数计算。
- 存单与理财头寸，以及由头寸终局产生的金融活动。
- 到期判断、批量到期结算和定期提前支取。
- 独立的`domains.bank`事件链、幂等、CAS、不变量、故事前缀裁切规则和安全投影。

### `apps/bank`拥有

- `application/`：Bank-Economy 根协议与交叉不变量、剧情对账、命令策略、原子资金编排和应用服务。
- `host/`：Controller、iframe/SillyTavern 协议与激活生命周期。
- `ui/`：交互、错误文案和渲染；不计算收益、不持久化状态。

### 外部通用能力

- Economy：玩家余额、托管账户、对手方账户、不可变流水和非透支规则。
- OS host：聊天 identity、story fingerprint/anchor、Assistant 回合、根写队列、保存确认和 domain composition。
- OS shell：独立 APP 注册、导航、设备壳和激活生命周期。

### 强制依赖边界

- Bank 只能依赖通用 Economy、host 和 shell 能力，不得 import Game 的类型、服务、事件、UI 或常量。
- Game 同样不得 import Bank。两者不得共享业务联合类型、Controller 或数据根。
- Economy 和通用 host runtime 不得依赖 Bank；只有`production-composition.ts`作为组装入口导入 Bank 注册项。
- 删除 Bank 不得影响 Game；删除 Game 也不得触碰 Bank 数据或代码。

## 3. 核心不变量

1. 玩家可用余额只来自 Economy；Bank 不保存余额副本。
2. 当前头寸只由当前剧情前缀内有效的`domains.bank.events`线性重放得到，不持久化第二份 current state。
3. 金融活动只存在于产生它的 Bank event result 中，不复制 Economy 流水。
4. 一个 Bank event、其 activities 和全部 Economy 资金腿在同一个 OS 根候选中提交或共同失败。
5. 产品条款只来自 Bank 静态目录；Controller 和 iframe 不提交利率、期限、赔付额或冻结结果。
6. 每个写动作校验 chat identity、story anchor、actionId 和`revision + eventId`。
7. 所有校验通过后才能抽取理财收益；幂等重放不得重新抽取。
8. 未到期理财的`resolvedReturnBps`和`settlementAmount`不得进入 Controller/Vue DTO。
9. 只读投影不结算、不抽取、不追加事件。
10. 编辑、swipe、删除、移动、分支和漏事件重载后，Bank 与 Economy 恢复到同一有效剧情前缀。
11. 未完成产品、结算、对账、Controller 和 UI 前不注册 Bank APP。

## 4. 终态结构

```text
modules/xiaobai-os/
├─ apps/bank/
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
│     ├─ BankApp.vue
│     ├─ BankVault.vue
│     ├─ BankDeposits.vue
│     ├─ BankFunds.vue
│     ├─ BankPositions.vue
│     ├─ BankRecords.vue
│     ├─ BankActionDialog.vue
│     └─ bank.css
├─ domains/bank/
│  ├─ types.ts
│  ├─ products.ts
│  ├─ money.ts
│  ├─ random.ts
│  ├─ invariants.ts
│  ├─ timeline.ts
│  ├─ view.ts
│  └─ README.md
└─ tests/
   ├─ bank-domain.test.js
   ├─ bank-repository.test.js
   └─ bank-controller.test.js
```

终态不存在`domains/bank/games/`、Bank 游戏类型、Bank game 路由或 Bank 游戏组件。现有游戏实现由独立 Game 领域拥有。

## 5. 持久模型

```ts
interface BankDomainV1 {
    schemaVersion: 1;
    events: BankEvent[];
}

interface BankEvent {
    revision: number;
    eventId: string;
    actionId: string;
    command: BankAction;
    result: {
        changes: BankChange[];
        activities: BankActivity[];
    };
    anchor: XiaobaiOsStoryAnchor;
    assistantTurn: number;
    createdAt: number;
}

type BankAction =
    | { kind: 'deposit-open'; productId: string; positionId: string; amount: number; settledPositionIds: string[] }
    | { kind: 'deposit-withdraw-early'; positionId: string; settledPositionIds: string[] }
    | { kind: 'fund-open'; productId: string; positionId: string; amount: number; settledPositionIds: string[] }
    | { kind: 'settle-due'; settledPositionIds: string[] };

interface BankState {
    openDeposits: BankDepositPosition[];
    openInvestments: BankFundPosition[];
}
```

- 第一次成功 Bank 写动作才创建`domains.bank`；浏览产品不创建数据。
- revision 从 1 连续递增；`revision + eventId`是 CAS token。
- command 保存规范化输入和本动作顺带结算的 position IDs；result 只保存本动作的冻结事实、变化与活动。
- activity detail 只能是`deposit | fund`严格联合类型，记录`amountIn`、`payout`和`net`。
- `assistantTurn`是动作锚点前已完成的 Assistant 回复数。
- Bank 不使用 IndexedDB、localStorage、后台计时器、持久锁或状态快照。

## 6. 金额与产品规则

```ts
const BASIS_POINTS = 10_000;
const amountAtBps = (principal: number, bps: number) =>
    Math.floor(principal * (BASIS_POINTS + bps) / BASIS_POINTS);
```

- 输入金额必须是正安全整数并满足产品上下限；所有乘法向下取整并检查溢出。
- 单个 Bank 结算额不得超过 50,000；当前六种产品均在该上限内。
- 定期开户时冻结`maturityAmount`和`earlyWithdrawalAmount`。
- 理财开户时在闭区间均匀抽取并冻结`resolvedReturnBps`和`settlementAmount`。
- 改价或改条款发布新合同 ID；下架只移出在售列表，已持久化合同仍可验证和结算。

### 定期存单

| ID | 名称 | 锁定 Assistant 回合 | 到期收益 | 金额范围 | 提前损失 |
|---|---|---:|---:|---:|---:|
| `short-term` | 短期存单 | 10 | +600 bps | 100-2000 | 300 bps |
| `mid-term` | 中期存单 | 25 | +1800 bps | 200-5000 | 500 bps |
| `long-term` | 长期存单 | 50 | +4500 bps | 500-10000 | 1000 bps |

### 浮动理财

| ID | 名称 | 锁定 Assistant 回合 | 收益闭区间 | 风险 | 金额范围 |
|---|---|---:|---:|---|---:|
| `steady-fund` | 稳健基金 | 20 | -500 至 +2000 bps | 低 | 200-3000 |
| `growth-fund` | 成长基金 | 30 | -2000 至 +5000 bps | 中 | 500-5000 |
| `venture-fund` | 风险基金 | 40 | -5000 至 +15000 bps | 高 | 1000-10000 |

到期前只公开理财风险与合同范围。到期后 public view 才可公开冻结收益和结算额。理财不能提前退出；未到期定期可按冻结金额提前支取。

## 7. 到期与 Economy 原子结算

- 当前回合是有效可见故事前缀中的 Assistant 消息数；用户消息不推进期限，regenerate/swipe 替换同一 Assistant 位置不增加回合。
- 到期条件仅为`currentAssistantTurn >= maturityTurn`，不写 tick 或后台到期事件。
- `readCurrent`只派生`locked | claimable`。`settleDue`一次领取当前全部到期头寸。
- 其他 Bank 写动作把全部到期头寸作为同一 action 的前置结算，但目标动作和前置结算必须整体有效后才提交。旧页面命令已失效时不得先结算再报错。
- 多头寸结算使用稳定的 action-level batch sourceId；每个托管账户仍按 positionId 命名，不能拆成多次根保存。

资金腿使用`sourceDomain = bank`：

```text
开仓：player → escrow:bank:<positionId>                         principal
盈利：counterparty:bank:reserve → escrow:bank:<positionId>     payout - principal
结算：escrow:bank:<positionId> → player                         payout
亏损：escrow:bank:<positionId> → system:sink                    principal - payout
```

金额为 0 的腿不写流水。每个关闭头寸的 escrow 必须归零；Bank event、activity 与所有资金腿共用 actionId、anchor，并经一次根保存与读回确认。

## 8. 随机、失败与对账

- `BankRandomSource.nextInt(maxExclusive)`由 composition 注入；生产实现封装同步`Math.random`，测试使用确定整数序列。
- ID 生成与理财随机源分离。chat/story/CAS/幂等/金额校验全部通过后才抽取收益。
- 明确保存失败恢复旧根且不展示候选；用户再次明确提交使用新 actionId，可以重新抽取。
- 保存结果未确认时保留原候选并冻结该聊天后续 OS 根写入；确认流程不得重算收益。
- 每个 Bank event 持有 story anchor。首个失效事件及其后缀、内嵌活动和对应 Economy action 在同一次 reconciliation 中共同裁切。
- 回到开仓前，头寸和扣款共同消失；回到结算前，头寸和托管余额共同恢复。禁止字段级 merge 或推测性补账。

## 9. Controller 与 UI

协议只接受明确命令：

```text
bank/refresh
bank/deposit/open
bank/deposit/withdraw
bank/fund/open
bank/settle-due
bank/records/load-more
bank/confirm-save
```

Bank APP 只包含金库、定期、理财、头寸和金融记录：

```text
/vault
/deposits
/funds
/positions
/records
```

- 顶部显示 Economy 可用余额和 Bank 头寸锁定本金；锁定额不写回 Wallet。
- 产品卡展示期限、整数收益范围、金额上下限与风险，开户前确认。
- 定期未到期展示确切提前支取额；到期头寸展示领取。
- 记录区分投入、赔付、净值与结果，首屏 50 条并显式分页。
- Controller 只返回深拷贝 DTO；未到期理财结果不得出现在 DOM、aria、日志或错误文案。
- 切聊/deactivate 清理 busy、dialog、表单和旧 request generation，不改变持久头寸。

## 10. 删除路径与非目标

删除 Bank：

1. 对每个未结算头寸选择明确丢弃或一次性清算，不能遗留无法解释的`escrow:bank:*`余额。
2. 决定保留或清理`sourceDomain = bank`的 Economy 历史；Economy 本身不删除。
3. 删除`apps/bank/`、`domains/bank/`及 Bank 的 app、validator、reconciler 和 cross-domain invariant 注册。
4. 对可升级聊天删除`domains.bank`，再删除 Bank 测试和文档入口。
5. 不修改`domains.game`、Game 注册、Game escrow 或 Game 历史。

Bank 不提供游戏、贷款、透支、跨聊天转账、真实货币、排行榜或服务器级防作弊，也不调用模型或影响 RP Prompt。

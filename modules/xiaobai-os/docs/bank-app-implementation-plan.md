# 普通酒馆小白 OS 银行 APP 施工方案

- 状态：已完成
- 依据：[银行 APP 终态设计](./bank-app-target-design.md)
- 原则：Bank 只交付存单、理财、头寸、金融活动和到期结算；完整闭环后才注册入口
- 确认日期：2026-08-30

## 1. 开工检查

| 问题 | 结论 |
|---|---|
| 功能所有者 | `domains/bank`拥有产品、头寸、活动、事件链与纯规则；`apps/bank/application`拥有根对账、Economy 联动、命令编排和应用服务；`apps/bank/host`拥有 Controller/宿主适配；`ui`拥有界面 |
| 唯一事实来源 | 可用余额来自 Economy；头寸与活动来自有效`domains.bank.events`重放 |
| 临时态 | 路由、表单、dialog、busy 和投影缓存 |
| 持久态 | Bank command/result、冻结合同、头寸变化、金融活动和 story anchor |
| 外部依赖 | 通用 Economy ledger、story action runner、根 store、reconciliation composition、shell |
| 注册入口 | Bank app registry、Bank validator/reconciler 与 Bank-Economy 交叉校验 |
| 删除路径 | 先处理`escrow:bank:*`，再删除 Bank 数据、目录和注册；Game 不参与 |
| 最少测试 | 产品数学、私有理财投影、原子资金、幂等随机、剧情回滚、Controller、浏览器 |

## 2. 依赖方向

```text
Bank Vue
   ↓ DTO / command
apps/bank/host/controller
   ↓
apps/bank/application/service
   ├─→ application/{commands,action-policy,root-protocol}
   ├─→ domains/bank/{products,money,timeline,view}
   ├─→ domains/economy 通用账本命令
   └─→ host story-action-runner + root store

story-reconciliation-runtime
   └─→ 注入 Bank reconciler
```

强制禁止：Bank import Game；Game import Bank；Economy import Bank；Bank 复用 Game 类型或随机状态；Wallet 代理 Bank 命令；Bank 注册 Prompt。

## 3. 阶段 A：收紧 Bank 纯领域

目标文件：

```text
domains/bank/types.ts
domains/bank/products.ts
domains/bank/money.ts
domains/bank/random.ts
domains/bank/invariants.ts
domains/bank/timeline.ts
domains/bank/view.ts
tests/bank-domain.test.js
```

1. Bank action 只保留`deposit-open`、`deposit-withdraw-early`、`fund-open`和`settle-due`。
2. Bank state 只保留`openDeposits`和`openInvestments`；activity detail 只保留`deposit | fund`。
3. Bank 领域不包含游戏联合类型、游戏状态或游戏投影；三款游戏只由`domains/game`维护，不留转发导出。
4. 固化三种存单、三种理财及全部已确认数值；金额统一为正安全整数，基点计算向下取整，单笔结算封顶 50,000。
5. 开户时冻结存单到期/提前额；理财收益在闭区间均匀抽取并冻结，到期前公开 DTO 不含结果。
6. 校验 revision 连续、eventId/actionId/position/activity 唯一、anchor/turn 不倒退、合同可重算、`net === payout - amountIn`。
7. 证明重放不修改输入，public view 深拷贝，打开空 Bank 不创建`domains.bank`。

## 4. 阶段 B：Bank application + Economy 原子服务

新增：

```text
apps/bank/application/action-policy.ts
apps/bank/application/commands.ts
apps/bank/application/root-protocol.ts
apps/bank/application/service.ts
tests/bank-repository.test.js
```

服务面：

```ts
interface BankService {
    readCurrent(): BankClientView;
    openDeposit(input): Promise<BankClientView>;
    withdrawDeposit(input): Promise<BankClientView>;
    openFund(input): Promise<BankClientView>;
    settleDue(input): Promise<BankClientView>;
}
```

每个写动作按固定顺序执行：

1. story runner 捕获 chat identity、fingerprint、anchor 和 Assistant turn。
2. 根 mutation 对账 Bank 与 Economy，读取当前事件链和账本。
3. 先处理 actionId 幂等，再校验`revision + eventId`、产品、金额、头寸和目标动作。
4. 确定本动作应结算的全部到期 position IDs；目标动作与前置结算必须整体合法。
5. 所有校验通过后才抽取新理财收益，计算 Bank changes、activities 和全部 Economy legs。
6. 调用 Economy 纯`postAction`，追加一个 Bank event，校验两个领域和交叉 action。
7. commit guard 复核聊天与故事，仅保存一次并读回确认。

资金要求：

- 开仓将本金从`player`转入`escrow:bank:<positionId>`。
- 结算不足本金时，先向玩家支付非零 payout，再把剩余托管转入`system:sink`。
- 结算超过本金时，由`counterparty:bank:reserve`补足 escrow，再向玩家支付完整 payout。
- 一个关闭头寸的 escrow 必须归零；多头寸到期使用稳定 batch sourceId 和一次根保存。
- Bank event、金融 activity 和资金腿共用 actionId/anchor。任何校验或保存失败都不得留下半个头寸、活动或流水。

随机保存要求：

- ID 随机与收益随机分开；幂等重放不重新抽取。
- 明确失败丢弃候选；用户的新 action 可重新抽取。
- 保存未确认时保留原候选并冻结该聊天后续根写；`confirmPending`不得重算。

最低集成测试覆盖开户、到期边界、批量领取、提前支取、三种理财收益端点、50,000 结算上限、盈利/亏损资金腿、余额不足、溢出、幂等冲突、CAS 冲突、明确失败和未确认保存。

## 5. 阶段 C：Bank 对账与 composition

1. 在 production composition 独立注册 Bank validator、reconciler 和 Bank-Economy 交叉不变量。
2. 从第一条失效 Bank anchor 起裁掉完整事件后缀；activities 随所属 event 删除。
3. Economy 在同一次根 mutation 中裁掉对应 action 后缀；每个保留 Bank 资金 action 必须有金额匹配的 Economy legs。
4. 重放剩余事件恢复头寸；空事件根删除`domains.bank`。
5. 分支首次读取、Bank 激活、每次 Bank 写动作和漏事件后的重载都走同一对账路径。
6. Bank 与 Game 各自注册 reconciler，彼此不调用、不过滤、也不解析对方事件。

测试回到开仓前、回到结算前、编辑/swipe、中间删除、尾删、分支复制和故意破坏 Bank-Economy 对应关系。要求头寸、活动、escrow 与玩家余额共同恢复，禁止字段级 merge 或自动补账。

## 6. 阶段 D：Controller 与 Bank UI

新增：

```text
apps/bank/descriptor.ts
apps/bank/types.ts
apps/bank/host/controller.ts
apps/bank/host/presentation.ts
apps/bank/ui/*
tests/bank-controller.test.js
```

协议仅包含：

```text
bank/refresh
bank/deposit/open
bank/deposit/withdraw
bank/fund/open
bank/settle-due
bank/records/load-more
bank/confirm-save
```

- activate 获取稳定聊天 identity，确保 Economy 可用，完成对账后返回余额与`BankClientView`；浏览不创建 Bank 根。
- Controller 同一 activation 只允许一个写 request；切聊/deactivate 使迟到结果失效。
- iframe 只能提交产品 ID、金额、position ID、actionId 和 CAS，不得提交合同条款、收益、payout 或私有冻结结果。
- UI 依次完成金库总览、产品开户、头寸、领取/提前支取、records 分页、错误恢复、移动适配和 reduced motion。
- DOM、aria、console 和错误文案不得出现未到期理财的冻结收益。
- Bank APP 完整可用后单独注册，不等待 Game，也不提供游戏页、入口或占位。

## 7. 验证与完成条件

自动门：

```text
npm run build:xiaobai-os
npm run test:xiaobai-os
npm run lint
git diff --check
```

浏览器验收：

1. 聊天 A/B 的头寸完全隔离。
2. Assistant 回合到期边界正确；只读不结算，领取只写一次。
3. 定期提前支取和理财盈亏后，activity、流水、余额与 escrow 一致。
4. 快速双击、CAS 过期、切聊、明确失败和未确认保存均不重复扣款或抽取。
5. 编辑、swipe、删除和分支恢复精确头寸与余额。
6. 未到期理财结果不出现在协议、DOM 或日志。
7. Prompt Inspector 无 Bank 内容；Bank 构建图不含 Game，Game 构建图不含 Bank。

完成时再通盘确认：Bank 只拥有金融语义；所有关闭头寸 escrow 归零；事件、活动和资金原子；对账可删除；移除 Bank 不影响 Game。

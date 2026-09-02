# Economy 平台终态设计

## 1. 目标

Economy 为普通小白 OS 提供一套小而可靠的资金事实：开户、余额、流水、幂等、多资金腿 action、显式冲正和跨领域原子提交。

它不是剧情系统，不判断消息因果，不拥有任务进度，也不随编辑、swipe、删除或分支自动倒账。

## 2. 开工检查结论

| 项目 | 结论 |
| --- | --- |
| 功能所有者 | `domains/economy`拥有资金规则；`repository.ts`接入根 store |
| 唯一事实来源 | `EconomyLedgerV1.transactions` |
| 持久态 | 不可变交易 |
| 临时态 | 根写队列、保存中/未确认状态、余额和分页投影 |
| 外部依赖 | `XiaobaiOsChatDataStore`、时间与 ID 生成器 |
| 注册入口 | production composition 的 domain validator 与 Economy repository |
| 删除路径 | 下线资金消费者，删除目录/注册，清理`domains.economy` |
| 兼容对象 | 当前 OS 根格式与真实上游迁移 fixture；不兼容测试线旧 anchor schema |
| 最少测试 | 账本不变量、幂等/冲正、根保存失败、跨领域原子资金 |

## 3. 持久格式

```ts
interface EconomyLedgerV1 {
    schemaVersion: 1;
    transactions: EconomyTransaction[];
}

interface EconomyTransaction {
    id: string;
    sequence: number;
    idempotencyKey: string;
    actionId: string;
    fromAccountId: string;
    toAccountId: string;
    amount: number;
    kind: string;
    title: string;
    note: string;
    sourceDomain: string;
    sourceId: string;
    createdAt: number;
    reversalOfTransactionId?: string;
}
```

不持久化 balance、快照、锁、当前页、剧情楼层、消息 hash 或分支指针。

## 4. 账本不变量

1. `sequence`从 1 连续递增，交易 ID 唯一。
2. 金额为正安全整数；转出与转入账户不同。
3. 玩家账户不得透支。
4. 同一 action 的多条资金腿连续出现，不能被其他 action 穿插。
5. 同一 idempotencyKey 重放必须与原意图完全相同；不同意图报冲突。
6. 开户 action 固定为`economy:opening-grant:v1`且只能出现一次，赠送 100 小白币；action、source 与金额共同构成不可修改的 V1 创世事实。
7. reversal 是一笔方向相反的新交易；被冲正交易、来源和金额可验证，开户赠礼不可冲正。

余额只是对所有资金腿的投影。

100 小白币不是“当前开户活动”或可调整常量。直接修改它会使所有既有 V1 账本在加载时失效；若未来需要改变新账户的创世规则，必须先定义明确的新账本版本/升级边界，不能让 V1 validator 用新金额重判历史。

## 5. 跨领域原子提交

Bank、Game、Shop 不是先写业务再调用钱包。各 application service 在一个根 mutation 中：

```text
读取当前根
→ 校验业务 CAS/actionId
→ 生成领域事件
→ 生成 Economy 资金腿
→ 安装到同一个候选根
→ 校验领域 + Economy + 交叉不变量
→ 保存一次
```

任何校验或明确保存失败都恢复整个旧根，不允许出现“扣了钱但没商品”“赌局结束但没派彩”。保存结果不确定时保留同一个候选根并冻结写入，确认不会重新抽随机或生成新 ID。

## 6. 聊天与分支

Economy 的 key 是当前 chat identity，数据随该聊天的`chat_metadata`保存。切聊后排队或迟到动作必须失败。

Economy 不读取消息正文。编辑、swipe、删除不会自动产生 reversal，也不会删除流水。创建分支时接受 SillyTavern 复制来的元数据快照，之后两个聊天分别写入。

如果未来某业务需要“随剧情撤销”，应由该业务状态机定义明确的补偿动作，再以普通 Economy action 记账；不能让 Economy 猜测剧情含义或裁流水历史。

## 7. Repository 与保存状态

`domains/economy/repository.ts`只通过根 store 暴露：

- `hasCurrent/readCurrent/ensureCurrent`；
- `postCurrent/postActionCurrent/reverseCurrent`；
- `getPlayerBalance/listCurrentTransactions`；
- `getWriteState/confirmPending`。

根 store 负责聊天 identity、单写队列、候选安装、保存、读回确认与冲突状态，并向当前运行内的 APP 发布`saving / ready / unconfirmed / conflict`变化。Economy 不复制这套机制，订阅也不持久化。

## 8. UI 边界

Wallet 是只读投影，不拥有调账入口。已有账本时打开钱包不访问聊天 API；首次开户显示`loading`。`unconfirmed`表示上一次元数据保存结果未知，不表示正在核对剧情。

## 9. 验收

- 同一聊天只开户一次；
- `opening-grant:v1`的身份与 100 小白币金额保持冻结，产品调整不重判既有账本；
- 幂等重试不重复保存或扣款；
- 多资金腿一次提交，失败无半条 action；
- Bank/Game/Shop 的事件与资金交叉不变量能拒绝伪造根；
- 聊天文本变化不改变账本；
- 已有 Economy 的 APP 激活不触发持久读取；
- typecheck、测试、lint、build 全部通过。

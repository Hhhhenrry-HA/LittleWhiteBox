# 银行 APP 终态设计

## 1. 定位

Bank 是围绕钱包的独立金融领域，提供三款定期存单和三款浮动理财。它不调用模型、不注入主 RP，也不解析剧情。

期限只采用一个宿主事实：当前聊天已经完成多少个 Assistant 回复。

## 2. 所有权

| 内容 | 所有者 |
| --- | --- |
| 已发布产品合同、当前货架、头寸、冻结合同、金融活动 | `domains/bank` |
| 余额与流水 | `domains/economy` |
| Bank/Economy 原子组合 | `apps/bank/application` |
| Assistant 回合读取、iframe 与 UI | `apps/bank/host`、`ui` |
| 保存、队列、identity | `host/chat-data-store` |

Bank 不拥有聊天消息、剧情状态、全局时钟或第二份余额。

### 2.1 发布合同与货架

`BANK_DEPOSIT_CONTRACTS`和`BANK_FUND_CONTRACTS`是历史可解释性所需的不可变合同库；货架 ID 列表只决定新开立入口可见和可购买的产品。

同一产品 ID 的锁定期、利息/罚金、收益区间、风险级别与金额范围不得原地修改。未来产品改版必须使用新 ID，并可把旧 ID 从货架移除；旧合同继续验证、展示和结算既有头寸。当前实现已经具备这条边界，无需改造事件 schema 或复制合同快照。

## 3. 持久模型

`BankDomainV1`只保存连续事件。事件含 revision、eventId、actionId、command、result、assistantTurn 和 createdAt。当前开放头寸与金融记录均由事件重放得到。

开立时冻结可验证合同：

- 存单：本金、startTurn、maturityTurn、到期额、提前支取额；
- 理财：本金、startTurn、maturityTurn、已抽取收益率、结算额。

浮动收益在开立时抽取一次并持久化；锁定期间不向客户端泄漏，达到期限后才展示。

持久 validator 使用对应的已发布合同验证冻结金额；它不读取当前货架，也不会因产品下架而拒绝历史头寸。

## 4. 回合语义

`assistantTurn`是动作被接受时已经完成的 Assistant 回复数量。头寸期限为：

```text
maturityTurn = startTurn + product.lockRounds
remainingTurns = max(0, maturityTurn - currentAssistantTurn)
```

Assistant 数量可以因删除或切换可见回复而下降。此时只重新计算`remainingTurns/claimable`投影：

- 不删除 Bank 事件；
- 不恢复已结算头寸；
- 不回滚或改写 Economy 流水；
- 不重新抽取理财收益。

## 5. 命令与资金

- 开立存单/理财：玩家余额转入该 position 的 Bank escrow。
- 到期结算：reserve 补足正收益，escrow 向玩家派付，亏损部分进入 sink。
- 提前支取：按冻结的提前支取额关闭目标，同时可结算其他已到期头寸。
- 金额为 0 的资金腿不写流水。

Bank event 与全部资金腿共用 actionId，在一个根 mutation 中提交。交叉不变量校验每个事件的预期资金腿、孤儿交易和每个开放 position 的 escrow 余额。

## 6. 并发与失败

写入校验 actionId、`revision + eventId`、产品、金额和头寸状态。新动作在主生成期间禁用，避免回合边界变化；已提交 action 的幂等重放不重新生成 ID 或随机数。

明确保存失败恢复 Bank 与 Economy 的旧根；未确认保存保留候选并冻结写入，确认时不重抽收益。

## 7. UI 与性能

已有 Economy 时激活同步返回 Bank 页面，只遍历内存中的消息角色计算 Assistant 数量，不复制正文、Shop 收据或发起网络请求。首次没有 Economy 时只异步开户。UI 展示产品、开放头寸、可领取数量和分页金融记录；锁定理财不得暴露收益率、结算额或随机材料。

## 8. 删除与验收

删除 Bank 前先确定开放 escrow 的清理策略，再删除`apps/bank`、`domains/bank`、host/shell 注册及`domains.bank`数据。

最低验收：发布合同与货架分离、产品数学、回合倒退只改投影、随机只抽一次、幂等/CAS、原子开立结算、escrow 归零、保存失败与未确认、私有收益不泄漏、已有数据立即打开。

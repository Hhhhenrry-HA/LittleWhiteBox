# Economy domain

Economy 是普通小白 OS 的共享资金领域。它只拥有账户规则、不可变流水、余额投影、actionId 幂等、多资金腿原子 action 和显式冲正。

## 唯一事实来源

余额由`EconomyLedgerV2.transactions`重算，绝不另存 balance、checkpoint、缓存或剧情快照。`economy:opening-grant:v1`及其 100 小白币金额是创世合同，不是可调产品配置；开户赠礼是第一笔受保护流水。业务纠错通过追加 reversal 表达，不修改历史交易。

## 文件职责

- `types.ts`：当前持久格式和公开类型。
- `migration.ts`：冻结真实旧 Economy V1 anchor 格式，并一次性转换为 V2。
- `ledger.ts`：开户、记账、批量资金腿、冲正、余额与分页投影。
- `invariants.ts`：格式、序列、账户、金额和 action 连续性校验。
- `repository.ts`：把纯账本操作接入根 store。

Economy 不读取普通聊天消息，不保存楼层、哈希或剧情锚点，也不响应编辑、swipe、删除和分支事件。

## 外部边界

Repository 只依赖`XiaobaiOsChatDataStore`。Bank、Game、Shop 通过各自 application service 在同一次根 mutation 中组合领域事件和资金腿；Economy 不 import 这些业务领域。旧 V1 只在 host chat-data 升级边界被识别和保存，运行时领域与各 APP 只接收 V2。

删除 Economy 时必须同时下线所有资金消费者，并清理`domains.economy`；不能留下第二份余额继续运行。

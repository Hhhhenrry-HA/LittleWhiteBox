# Economy 领域

Economy 是普通 SillyTavern 小白 OS 的共享经济领域，只拥有账户规则、不可变流水、幂等、多资金腿 action、冲正和随普通剧情变化的账本回滚。它不读取`modules/tavern/**`，也不依赖钱包或任何未来业务 APP。

唯一持久事实是当前聊天`xiaobaiOs.domains.economy.transactions`。余额、分页、写入门和对账状态都不是第二份持久数据：余额由流水投影，其余状态只活在当前运行期。

目录职责：

- `types.ts`：公开账本、交易和命令形状。
- `invariants.ts`：当前 schema 的完整不变量。
- `ledger.ts`：纯内存开户、记账、批次、冲正和投影。
- `timeline.ts`：按剧情前缀裁掉第一笔失效 action 及全部后缀。
- `repository.ts`：选择`domains.economy`并经 OS 根 store 原子提交。

剧情写门、action runner 和多领域对账运行时位于`host/`。它们拥有 SillyTavern 生命周期与根写入编排；Economy 只提供账本规则、时间线和 repository 接口。

删除 Economy 前必须先删除或迁移全部真实消费者，再删除本目录、composition 注册和`domains.economy`数据。不得留下余额副本、旧 API 或兼容壳。

# Bank app

`apps/bank`负责把纯 Bank 领域接入 Economy、根 store、iframe 协议和 Vue UI。

- `application/root-protocol.ts`：Bank/Economy 根读取、资金腿构造和交叉不变量。
- `application/commands.ts`：存入、提前支取、开立理财和到期结算命令。
- `application/service.ts`：CAS、actionId 幂等、Assistant 回合读取和原子根提交。
- `host/controller.ts`：聊天 activation、首次开户、写串行化和 frame 消息。
- `host/presentation.ts`：隐藏锁定理财收益，生成客户端 DTO。
- `ui/`：金库、产品、头寸、记录和操作弹窗。

Bank 只向宿主读取一个窄事实：当前聊天已完成的 Assistant 回复数量。它不读取消息文本，不做剧情核对。已有 Economy 时 APP 立即打开；只有首次开户异步准备。

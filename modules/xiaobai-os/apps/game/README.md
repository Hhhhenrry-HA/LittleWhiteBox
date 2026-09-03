# Game app

`apps/game`把纯 Game 状态机接入 ScopedChatStore、Economy Transaction Capability、iframe 协议和 Vue UI。

Application service 在一个 Scoped transaction 中把游戏事件与下注/派彩资金腿放入同一个 sidecar candidate，并保留 CAS、actionId 幂等、随机只抽一次、明确失败不发布和未确认写冻结。Controller 绑定 app activation token 与 osId/binding，只转发明确的用户意图。Presentation 逐字段复制公开状态，私有骰子和牌堆不会进入 iframe。

Game 不读取普通聊天消息或 Assistant 回合，也不注册聊天变化后台服务。当前 sidecar 已加载且已有 Economy 时同步打开；首次没有 Economy 时通过协调器异步开户。

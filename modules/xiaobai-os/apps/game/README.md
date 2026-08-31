# Game app

`apps/game`把纯 Game 状态机接入 Economy、根 store、iframe 协议和 Vue UI。

Application service 在一个根 mutation 中提交游戏事件与下注/派彩资金腿，并保留 CAS、actionId 幂等、随机只抽一次、保存失败恢复和未确认写冻结。Controller 绑定聊天 activation、串行化前台操作，只转发明确的用户意图。Presentation 逐字段复制公开状态，私有骰子和牌堆不会进入 iframe。

Game 不读取普通聊天消息或 Assistant 回合，也不注册聊天变化后台服务。已有 Economy 时同步打开；首次没有 Economy 时只异步开户。

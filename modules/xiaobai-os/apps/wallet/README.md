# Wallet app

钱包是 Economy 的只读用户界面，只展示当前聊天的小白币余额、流水分页和保存状态。它不拥有余额写入、调账、剧情、任务、商店、银行、游戏或宠物规则。

当前聊天已有 Economy 时，激活同步返回`ready`；没有 Economy 时，Controller 只在后台执行一次开户并显示`loading`。`unconfirmed`和`conflict`来自根 store 的保存状态，不是账本核对。

删除钱包只需删除 APP 目录及 host/shell 注册；Economy 可继续服务其他 APP。

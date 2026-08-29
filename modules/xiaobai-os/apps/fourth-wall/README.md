# 四次元壁 APP

四次元壁拥有自己的聊天状态、Prompt、前台生成、实时吐槽、媒体协议和 UI。跨层契约集中在`types.ts`，领域与宿主运行时使用 TypeScript，界面使用 Vue + TypeScript。

所有持久写入必须经过小白 OS 的设置仓库或当前聊天仓库；iframe 只接收可序列化 APP 状态，不接收共享 Agent API 密钥。

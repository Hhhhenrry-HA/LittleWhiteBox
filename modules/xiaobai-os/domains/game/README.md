# Game domain

Game 是与主聊天内容完全独立的纯规则领域，拥有秘骰对决、翻倍或收手、鎏金阶梯三款游戏。

- `games/`：三个不读 DOM、聊天、Economy 或时钟的纯状态机。
- `types.ts`：当前事件、私有状态、活动和公开 DTO。
- `timeline.ts`：线性事件追加、CAS、actionId 幂等和活动重放。
- `view.ts`：深拷贝公开状态并移除庄家骰子、牌堆等私有材料。
- `money.ts`与`random.ts`：整数资金和随机边界。
- `invariants.ts`：事件链、活动和私有状态校验。

Game 事件不记录消息楼层、Assistant 回合、剧情哈希或锚点。聊天编辑、swipe、删除和分支事件不会改变赌局。

下注托管和派彩由`apps/game/application/`与 Economy 在一次根 mutation 中提交。删除 Game 需要删除领域与 APP 注册，并先处理未结赌局的 escrow 数据策略。

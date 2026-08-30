# 普通酒馆小白 OS 经济平台终态设计

- 状态：终态边界已实施
- 适用范围：普通 SillyTavern / LittleWhiteBox 小白 OS
- 不适用范围：`modules/tavern/**`小白酒馆内部运行时与数据库
- 依据：[普通酒馆小白 OS 终态设计](./target-design-and-roadmap.md)
- 确认日期：2026-08-30

## 1. 产品定位

普通酒馆小白 OS 中，Economy 是多个 APP 共用的经济领域，钱包只是 Economy 的用户界面，不是其他 APP 的所有者。

```text
普通聊天剧情
      ↓ 剧情锚点
Economy（账户规则、不可变流水、幂等、冲正、回滚）
      ↓ 只读投影
钱包 APP

任务 ──托管/奖励──┐
商店 ──购买/退款──┤
银行 ──存取/结算──┼── 只能通过 Economy 产生资金变化
赌场 ──下注/派彩──┤
宠物 ──礼物/事件──┤
地图 ──未来明确的费用或收益──┘
```

用户可以感知为与小白酒馆相似的“小白币、钱包、任务、商店、银行、小游戏和宠物”，但普通酒馆有自己的聊天身份、剧情锚点、持久化和回滚实现。两边不得共享数据库、session、accepted floor、Phone context 或运行时代码。

## 2. 已查明的现状

### 2.1 小白酒馆可借鉴的产品事实

`modules/tavern/app-src/features/phone-os/phone-os-app-registry.ts`中的现行 APP 是信息、钱包、任务、商店、银行和宠物。除信息外，后四个业务 APP 激活时都会同步刷新钱包。

小白酒馆内部的真实关系是：

- Economy 拥有账户、余额、流水、幂等和按 accepted floor 回滚。
- 钱包只读取余额和流水，不直接修改余额。
- 商店把商品状态版本与扣款放在同一个 Dexie transaction。
- 任务把托管、退款、完成奖励与任务版本放在同一个 Dexie transaction。
- 银行把产品/游戏状态、活动记录与资金转移放在同一个 Dexie transaction；赌场是银行 APP 内的游戏区，不拥有第二套余额。
- 宠物是小白酒馆的全局 Companion，但礼物和剧情事件的资金效果仍落到来源会话 Economy。
- accepted rollback 在同一 IndexedDB transaction 中共同恢复任务、商店、银行和 Economy。

可借鉴的是领域不变量、幂等方式、冲正方式、纯游戏状态机和用户界面信息架构，不是存储和楼层实现。

### 2.2 普通 SillyTavern 的真实事件边界

根据 SillyTavern 1.18.0 当前实现：

- `MESSAGE_EDITED`提供被编辑的消息数组下标，且宿主会等待监听器完成后再继续渲染。
- `MESSAGE_SWIPED`提供被 swipe 的消息数组下标。
- `MESSAGE_DELETED`无论删除尾部还是中间消息，都只提供删除后的`chat.length`；不能据此知道被删的是哪一层。
- 中间删除会重排后续下标。
- 消息移动不会发出足够描述重排的稳定事件。
- 创建分支会复制截断后的消息和聊天元数据；复制来的 OS 数据可能包含分支点之后的旧经济事实。
- `CHAT_CHANGED`发生时当前聊天和元数据已经切换，可以用新的聊天身份重新读取。

因此只存`floor`并在删除时做`>= chat.length`裁切是不完整的。变量 2.0 的 checkpoint + WAL 适用于它拥有的变量根；总结模块也明确不支持识别原生中间单删。经济数据不能继承这个缺口。

### 2.3 当前小白 OS 的真实保存边界

普通小白 OS 当前通过`chat_metadata.extensions.LittleWhiteBox.xiaobaiOs`保存当前聊天数据，并在保存后调用 SillyTavern API 读回确认。宿主保存调用可能吞掉底层错误，所以存在三种结果：

1. 保存并读回一致：确认成功。
2. 保存调用前明确失败：可以恢复提交前内存对象。
3. 已尝试保存但读回失败或不一致：结果未确认，不能断言服务端是旧值还是新值。

Economy 必须建立在同一条根级写队列和读回确认上，不能由各 APP 分别保存同一个`xiaobaiOs`对象。

## 3. 功能所有权与依赖方向

```text
SillyTavern host adapter
    ├─ 当前聊天身份 / 当前消息快照
    ├─ 元数据保存与服务端读回
    └─ MESSAGE_EDITED / SWIPED / DELETED / RECEIVED / CHAT_CHANGED
                     ↓
xiaobai-os host
    ├─ 根级 chat data store（唯一写入口）
    ├─ APP runtime registry（只路由，不懂业务）
    └─ story fingerprint（只描述普通聊天剧情前缀）
                     ↓
domains/economy
    ├─ ledger / invariants / timeline
    ├─ repository（只选择 domains.economy）
    └─ story write gate / reconciliation runtime
                     ↓
apps/wallet
    ├─ host controller（只读钱包命令）
    └─ Vue UI
```

所有权规则：

- Economy 拥有货币交易规则和账本。
- 钱包拥有余额/流水的呈现，不拥有交易规则。
- 任务、商店、银行和宠物各自拥有自己的状态、Prompt、工具、UI 与错误语义。
- 业务 APP 可以依赖 Economy 的公开命令；Economy 不依赖任何业务 APP。
- 信息和四次元壁不依赖 Economy。
- 地图拥有地点与移动语义；只有真实费用或收益才调用 Economy，地图数据不能塞进账本。
- `modules/xiaobai-os/**`继续禁止导入`modules/tavern/**`，反向也禁止。

## 4. APP 与 Economy 的关系

| APP / 领域 | 自己拥有 | 通过 Economy 拥有的资金事实 | 是否回滚 |
|---|---|---|---|
| 四次元壁 | 皮下会话、Prompt、媒体与吐槽 | 无 | 自己的会话不随主聊天楼层回滚 |
| 信息 | 联系人与异步消息 | 无；未来若出现转账再单独立项 | 按信息领域设计 |
| 钱包 | 余额和流水投影 | 不创建任意资金事实 | 展示回滚后的结果 |
| 任务 | 发布、接受、推进、结算状态 | 托管、退款、报酬 | 任务状态与关联流水一起回滚 |
| 商店 | 商品、库存、效果 | 购买、退款 | 库存版本与关联流水一起回滚 |
| 银行 | 存款、产品、结算状态 | 存取、收益、费用 | 头寸版本与关联流水一起回滚 |
| 赌场 | 银行内的纯游戏状态机 | 下注托管、派彩、损失 | 对局与关联流水一起回滚 |
| 宠物 | 每个普通聊天自己的宠物状态和历史 | 礼物、藏币、发现零钱等 | 宠物版本与关联流水一起回滚 |
| 地图 | 地点、连接、当前位置 | 仅未来明确的通行费或收益 | 地图版本与关联流水一起回滚 |

普通酒馆的宠物确定为“每个聊天一只”，不复制小白酒馆的全局 Companion。原因是普通钱包按聊天隔离；全局宠物从某个聊天扣款会引入跨聊天所有权、删除和退款歧义。

## 5. 终态目录

```text
modules/xiaobai-os/
├─ types.ts                         # OS 根数据、APP runtime 公共形状
├─ host/
│  ├─ app-runtime-registry.ts       # appId -> runtime 路由
│  ├─ chat-data-store.ts            # 唯一根级读/写/确认队列
│  ├─ story-adapter.ts               # 普通聊天快照与持久读回契约
│  ├─ story-fingerprint.ts          # 普通聊天规范化与前缀 SHA-256
│  └─ sillytavern-context.ts        # SillyTavern 适配
├─ domains/
│  └─ economy/
│     ├─ types.ts
│     ├─ invariants.ts
│     ├─ ledger.ts
│     ├─ timeline.ts
│     ├─ repository.ts
│     ├─ story-write-gate.ts
│     ├─ story-reconciliation-runtime.ts
│     └─ README.md
└─ apps/
   ├─ fourth-wall/
   └─ wallet/
      ├─ descriptor.ts
      ├─ host/
      │  └─ controller.ts
      ├─ ui/
      │  ├─ WalletApp.vue
      │  ├─ WalletBalanceCard.vue
      │  ├─ WalletTransactionList.vue
      │  └─ WalletTransactionRow.vue
      └─ README.md
```

后续 APP 进入时建立自己的目录，不能继续把业务分支加入四次元壁 Controller、根`index.ts`或钱包 Controller。根`index.ts`只组合 runtime、descriptor 和宿主能力。

## 6. 持久化模型

### 6.1 唯一持久化位置

```ts
interface XiaobaiOsChatDataV2 {
    schemaVersion: 2;
    apps: {
        fourthWall?: FourthWallChatState;
    };
    domains: {
        economy?: EconomyLedgerV1;
    };
}

interface EconomyLedgerV1 {
    schemaVersion: 1;
    transactions: EconomyTransaction[];
}
```

选择聊天元数据而不是 IndexedDB，原因是：

- Economy 属于当前普通聊天世界，聊天导出、分支和删除时应该跟随聊天。
- SillyTavern 已拥有聊天文件和元数据生命周期。
- 另建 IndexedDB 会产生聊天删除后的孤儿数据、导出缺失和跨设备不一致。
- 第一阶段的真实规模不需要额外缓存或 checkpoint。

### 6.2 账本是唯一事实来源

```ts
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
    anchor: StoryAnchor;
    createdAt: number;
    reversalOfTransactionId?: string;
}

interface StoryAnchor {
    floor: number;
    prefixHash: string;
}
```

- 不持久化账户余额；余额由保留流水按顺序投影。
- 不持久化`playerBalanceAfter`、分页游标、钱包加载状态或回滚锁。
- 不建立每层余额快照。流水本身已经是可重放日志，再加 checkpoint 会制造第二份资金事实。
- `sequence`只定义流水顺序；数组顺序和`sequence`必须一致。
- 开户流水的`sequence`固定为 1；后续交易取当前末笔`sequence + 1`。回滚裁掉后缀后不另存计数器，下一笔继续由保留后缀推导。
- 金额只允许正的安全整数，不使用浮点货币。
- 第一阶段货币固定为“小白币”，首次开户赠送 100；货币名称和开户额是产品常量，不存用户配置。

### 6.3 账户规则

第一阶段支持以下账户命名空间：

- `player`：玩家账户，不得透支。
- `system:mint`：系统发行账户，可以为负。
- `system:sink`：系统回收账户，可以为负。
- `counterparty:<domain>:<id>`：业务对手方，可以为负。
- `escrow:<domain>:<id>`：业务托管账户，不得透支。

不得先为尚未施工的联系人、商店、银行或宠物创建持久账户。账户在第一笔相关流水出现时才存在于投影中。

### 6.4 创建与删除生命周期

- 开启 OS、显示桌面或打开四次元壁时不创建 Economy。
- 首次打开钱包，或第一个真实消费者提交交易时，创建 Economy 和固定开户流水。
- 开户流水使用固定幂等键、`floor = -1`的开局锚点，剧情回滚不能删除它。
- 切换聊天释放内存引用，不复制运行态。
- 删除聊天时 Economy 随聊天文件删除。
- 创建分支时元数据会被复制；首次读取分支必须按分支消息重新对账并裁掉越界事实。

## 7. 账本不变量

每次命令在纯内存候选对象上依次验证：

1. `id`、`actionId`和`idempotencyKey`非空且长度受限。
2. 同一账本中`id`与`idempotencyKey`唯一。
3. 一个`actionId`可以对应同一业务命令的多条资金腿，但这些交易必须连续追加并共享同一剧情锚点、`sourceDomain`和`sourceId`；其他 action 已经开始后不得再次追加旧 action。
4. 相同幂等键、相同输入返回已有结果；相同键但输入不同报冲突。
5. 收付款账户不同，金额为正安全整数。
6. 交易后所有余额仍为安全整数。
7. `player`和`escrow:*`交易后不得为负。
8. 新剧情锚点不得倒退；异步结果只能在捕获的聊天身份和剧情边界仍有效时提交。
9. 冲正必须指向存在且尚未冲正的原交易，并用一笔方向相反的新流水表达。
10. 历史交易不能编辑或覆盖；剧情回滚是裁掉失效后缀，不是伪造冲正。

开户行为等价于：

```text
system:mint --100--> player
```

钱包第一阶段没有“手动加钱”“修改余额”或开发者调账 UI。后续余额变化必须来自已拥有该业务语义的领域。

## 8. 普通聊天剧情锚点

### 8.1 指纹内容

Story fingerprint 对从第 0 层到目标层的当前可见剧情做链式 SHA-256。每层只规范化会影响剧情因果的稳定字段：

- 消息顺序。
- 用户 / AI / system 角色。
- 说话者名称。
- 当前选中 swipe 的原始`mes`文本。

不纳入时间戳、DOM、渲染后 HTML、token 数、请求日志、折叠状态和其他临时字段。相同可见剧情应得到相同指纹；只要前缀任一层被编辑、swipe、删除、插入或移动，后续锚点均失效。

一次对账只遍历当前消息快照一遍，生成本次运行内的前缀 hash 数组，再按 action 锚点 O(1) 查找；数组在对账结束后丢弃。只在经济动作中保存该动作的`floor + prefixHash`，不为每个普通楼层另建持久快照或跨运行缓存。

### 8.2 捕获与提交

一个资金动作的完整边界是：

1. 捕获当前聊天 identity、消息数组和末层锚点。
2. 在候选 OS 根对象上执行所属领域变化与 Economy 流水。
3. 提交前重新核对聊天 identity、消息长度和 prefix hash。
4. 经根级写队列保存整个候选对象并读回确认。

异步任务、模型调用或动画完成不持有“写入许可”。如果提交时聊天或剧情边界变化，结果作废并要求用户重试。

### 8.3 回滚算法

编辑、swipe、删除、切聊后加载、分支首次加载以及每次资金命令前都执行同一套对账：

1. 捕获当前聊天身份与当前消息快照。
2. 从开户流水之后按`sequence`把连续的同一`actionId`视为一个 action 批次，并检查批次共享的剧情锚点。
3. `anchor.floor`超出当前消息长度，或当前剧情在该层的 prefix hash 不同，则整个 action 批次失效。
4. 从第一笔失效 action 的首笔交易开始裁掉全部后续流水，不能保留半个 action 或因果上更晚的交易。
5. 后续业务领域以同一失效 action 集合裁掉任务、商品、银行、宠物或地图版本。
6. 整个回滚结果通过一次根级元数据保存提交。

这同时覆盖：

- 编辑历史消息。
- 切换任意 AI swipe。
- 删除末尾或从某层向后截断。
- 原生单删中间消息导致后续下标重排。
- 消息移动未提供稳定事件时，在下次激活、资金命令或聊天加载时发现。
- 从历史楼层创建分支但复制了原聊天全部元数据。
- 功能关闭或浏览器崩溃期间漏掉事件，重新加载时对账。

裁掉后的流水不会因为用户把文本再次改回旧内容而自动复活。用户必须重新触发业务动作；这是资金安全边界。

## 9. 多领域原子性

普通酒馆没有小白酒馆 Dexie transaction。等价边界是“一个克隆后的`xiaobaiOs`根对象 + 一次保存 + 一次服务端读回确认”。

后续业务命令必须遵守：

```text
读取根对象
  → 克隆
  → 校验 actionId / story anchor
  → 修改所属领域版本
  → 追加 Economy 流水
  → 校验完整根对象
  → 单次保存并读回
```

禁止以下实现：

- 先扣钱，第二次保存再写商品/任务/银行状态。
- 钱包 Controller 直接改其他 APP 数据。
- 各 APP 各自创建元数据写队列。
- 保存失败后靠下一次写入“顺便修好”。
- 用 localStorage 保存余额、锁或待结算流水。

## 10. 保存失败与并发

根级 chat data store 是唯一写入口，按当前聊天串行化 mutation。

mutation 调用时只捕获发起聊天的 identity token；任务真正出队时必须确认当前聊天仍与该 token 一致，再读取当下的 metadata 引用。这样既不会让排队任务持有过期 metadata，也不会让聊天 A 发起的任务在切到聊天 B 后误写 B。

- 明确失败：候选对象未被服务端接受，恢复提交前对象并允许重试。
- 保存结果未确认：保留候选现场，冻结该聊天后续 OS 持久写入，显示“账本保存结果未确认”；只允许重新读回核实或刷新。
- 重新核实读到候选：解除冻结并确认成功。
- 重新核实读到旧对象：恢复旧对象并报告本次动作未保存。
- 读到第三种对象：视为并发冲突，继续冻结，不做自动 merge。
- 切聊时未完成任务即使迟到，也必须因 identity 不匹配而丢弃。

冻结是当前页面运行态，不写 localStorage。刷新后以服务端聊天文件为准。

## 11. APP 接入契约

### 11.1 钱包

钱包只请求 Economy 的只读投影：

- 当前余额。
- 按`sequence`倒序的流水页。
- 是否还有更早流水。
- 当前账本是否冻结或保存未确认。

钱包路由、分页游标、展开项和加载状态都是 Vue 临时态。切聊或 APP deactivate 时全部释放。

### 11.2 后续消费者

当第二个经济消费者落地时，其命令必须返回“领域版本 + 对应流水”的同一候选根对象。每个领域自己实现：

- 命令输入和 action ID。
- 状态不变量。
- 用户可观察错误。
- 与 Economy 的资金腿。
- 按失效 action 集合裁切自身版本的函数。
- 删除数据的清理函数。

Economy 不 import 这些领域。跨领域回滚由 OS composition root 组合实际存在的 reconcilers；不为未施工 APP 预注册空 hook。

## 12. APP runtime 边界

施工前 OS 只有一个四次元壁 runtime；本阶段先建立通用 runtime registry，再注册钱包：

- 每个 APP 一个 descriptor 和 runtime。
- registry 只按`appId`委派 activate、deactivate、message 和 cleanup。
- 根`index.ts`只创建依赖并注册，不出现钱包、银行、任务等 action 分支。
- 四次元壁现有生成、吐槽、图片和语音仍留在四次元壁目录。
- 钱包 Controller 只响应钱包读取/翻页/重试确认命令。

这样后续 APP 的正常增加是“新增目录 + 一条注册”，而不是继续扩张四次元壁 Controller 或根入口。

## 13. 复用策略

允许从小白酒馆改写：

- Economy 账户命名、正整数金额、非透支账户、幂等冲突和冲正思想。
- 钱包的余额卡、流水信息层级、分页与错误状态。
- 银行三套纯游戏状态机及可注入随机源。
- 任务托管/退款/结算、商店购买/库存、宠物资金事件的产品规则。

禁止复制或依赖：

- `sessionId`、Tavern message order、accepted snapshot。
- Dexie 表、DB transaction、Phone boundary、Phone context。
- Tavern 全局宠物所有权。
- Tavern archive/schema 兼容分支。
- `modules/tavern/**`运行时 import。

普通酒馆回滚可参考变量 2.0 的楼层事件与 WAL 思路、总结模块的聊天守卫和 fail-closed 处理，但最终实现只归 Economy/OS 所有，不调用它们的内部函数或读写它们的元数据。

## 14. 数据版本与兼容边界

- Economy 是测试线新功能，没有历史 Economy 数据，不写兼容器。
- 当前测试线 OS chat schema v1 尚未进入 upstream；施工时直接重整为 v2，不保留 v1 日常读取分支。
- upstream 现有四次元壁`fw`迁移仍是真实兼容对象，迁移器改为直接产出当前 v2 OS 根。
- Economy 自己使用`schemaVersion: 1`，未来只在导入/升级边界转换旧版本。
- 运行时遇到未知版本必须停止写入并明确报错，不能猜字段或清空余额。

## 15. 删除路径

删除钱包 APP：

1. 删除`apps/wallet/`和两端 APP 注册。
2. 若仍有任务、商店、银行、宠物或地图经济消费者，保留 Economy 数据。

删除 Economy：

1. 先删除或迁移所有真实消费者。
2. 删除`domains/economy/`、Economy 剧情对账注册和`domains.economy`数据根。
3. 删除消费者持有的 Economy action/transaction 引用。
4. 不留下余额副本、兼容 API 或空 runtime。

删除某个消费者 APP：

1. 先确定其历史资金事实是保留在钱包流水中还是随领域数据清理。
2. 删除 APP 目录、注册、领域数据与专属测试。
3. 若保留流水，钱包使用通用标题/来源显示，不依赖已删除 APP 代码。

## 16. 最低质量契约

必须保护的稳定行为：

- 每个普通聊天的钱包独立，分支只保留分支点前仍有效的经济事实。
- 相同 action 重放不重复扣款；冲突 action 不静默复用。
- 多资金腿 action 连续、同锚点且原子回滚，不会保留半个业务动作。
- 玩家和托管账户不能透支。
- 退款/撤销以冲正表达，流水历史不可编辑。
- 编辑、swipe、尾删、中间单删、移动后再次使用、漏事件后重载均不会保留失效资金事实。
- 领域状态和关联流水要么一起确认保存，要么都不宣称成功。
- 未确认保存会冻结后续写入，不继续扩大不确定性。
- 增加钱包不能改变四次元壁的会话、生成、切聊和保存行为。

详细施工顺序与验收见[经济平台与钱包第一阶段施工方案](./economy-platform-phase-1-implementation-plan.md)。

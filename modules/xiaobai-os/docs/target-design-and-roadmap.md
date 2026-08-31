# 普通酒馆小白 OS：终态设计与路线

## 1. 产品定位

普通酒馆小白 OS 与小白酒馆 Phone OS 是两个独立产品。用户可以感知它们属于同一品牌，内部不能共享 Tavern DB、Session、Phone 消息、楼层语义、回滚协议或领域实现。

普通 OS 的宿主是 SillyTavern 当前聊天；数据根位于当前聊天的`chat_metadata`。任何同名 APP 都按普通酒馆自己的行为重新建模。

## 2. 终态结构

```text
modules/xiaobai-os/
├─ index.ts                         唯一扩展入口
├─ types.ts                         OS 公共宿主契约
├─ host/
│  ├─ production-composition.ts     组合真实 APP/领域
│  ├─ lifecycle.ts                  图标、窗口、清理
│  ├─ app-runtime-registry.ts       APP 路由
│  ├─ frame-bridge.ts               可信 iframe 消息
│  ├─ chat-data-store.ts            根级单写队列与保存确认
│  ├─ sillytavern-context.ts        窄宿主事实读取
│  └─ main-generation-runtime.ts    主生成临时状态
├─ shell/                           OS 设备外壳与桌面
├─ domains/<domain>/                纯领域规则与持久格式
└─ apps/<app>/                      应用服务、宿主控制、UI
```

核心层只提供与业务无关的能力。功能删除应接近“删`apps/<app>` + 删`domains/<domain>` + 删注册 + 数据清理”。

## 3. 所有权

| 能力 | 所有者 | 唯一事实来源 |
| --- | --- | --- |
| 聊天隔离与根保存 | `host/chat-data-store.ts` | 当前聊天 identity 与`chat_metadata` |
| 主生成是否进行中 | `host/main-generation-runtime.ts` | 当前运行内的 SillyTavern generation 生命周期 |
| 小白币 | `domains/economy` | 不可变资金流水 |
| 银行头寸 | `domains/bank` | Bank 事件链 |
| 赌局 | `domains/game` | Game 事件链和私有游戏状态 |
| 商品库存与效果 | `domains/shop` | Shop 事件链 |
| 四次元壁会话 | `apps/fourth-wall` | `apps.fourthWall.sessions` |
| 未来任务进度 | 未来`domains/task` | 任务自己的状态机，尚未施工 |

宿主没有“全局剧情状态”。Economy、Wallet、Bank、Game、Shop 均不订阅剧情变化、不哈希消息、不进行剧情核对，也不因编辑、swipe、删除而回滚。

## 4. 数据模型

```ts
interface XiaobaiOsChatData {
    schemaVersion: 2;
    apps: {
        fourthWall?: FourthWallData;
    };
    domains: {
        economy?: EconomyLedgerV1;
        bank?: BankDomainV1;
        game?: GameDomainV1;
        shop?: ShopDomainV2;
    };
}
```

根对象随当前聊天保存。运行时只认当前模型；真实上游旧格式只在 migration 入口一次性转换。测试线自己的旧 anchor、hash 和核对 schema 不保留兼容分支。

### 分支语义

SillyTavern 创建分支时，OS 接受宿主给出的当前`chat_metadata`快照。OS 不读取消息前缀推断资金该回到哪里，也不维护第二条分支账本。两个分支从复制时的数据开始独立写入。

## 5. 写入契约

所有业务写经过根 store：

1. 调用入口捕获目标 chat identity。
2. 根级队列串行化写入。
3. 领域校验 actionId、CAS 和业务输入。
4. 涉及资金时，在一个候选根中同时生成领域事件与 Economy 资金腿。
5. 运行领域内及跨领域不变量。
6. 保存`chat_metadata`并确认 identity 未变化。
7. 明确保存失败恢复旧根；保存结果不确定时保留候选并冻结后续写入，直到读回确认。

根 store 同时发布当前运行内的候选安装和写入终态，已打开的 APP 据此刷新；该订阅是临时态，不进入聊天数据。

保留这些能力是为防止重复扣款、半个业务动作、切聊误写和服务端不确定结果；它们与剧情核对无关。

## 6. APP 读取普通聊天的边界

### 四次元壁

每次生成请求读取当时的普通聊天窗口作为即时上下文。皮下会话历史属于四次元壁自己，不等于主聊天消息。

### 银行

只读取当前已完成 Assistant 回复数量。期限是一个即时投影：`remaining = max(0, maturityTurn - currentTurn)`。数量减少不会删除已提交头寸或恢复已结算头寸。

### 商店

购买、使用和效果消耗都是不可逆 Shop 事实。有限效果按成功形成的 normal Assistant 新回复次数消耗；每条回复保存效果收据，swipe、regenerate 和 continue 复用原收据而不重复消耗。删除或编辑消息不退款、不返还道具、不恢复次数；Shop 不保存或计算楼层坐标。

### 钱包与赌场

完全不读普通聊天内容。已有数据时打开 APP 只做内存投影。

### 未来任务

任务是一套随剧情自动维护的状态机，确实可能需要消息事件、模型判断、迟到结果作废和分支规则。那些能力只能在任务领域内设计；不得先放一个全局 reconciler 让所有经济 APP 被动依赖。

## 7. APP 打开与性能

- 已有 Economy：Wallet、Bank、Game、Shop 激活同步返回`ready`，不得调用`/api/chats/get`。
- 首次没有 Economy：先返回`loading`，后台只执行一次开户保存。
- 外壳只创建一个窗口与一个 iframe；APP 路由切换复用外壳。
- 主生成状态、Prompt 临时安装和未确认保存状态只存在于当前运行内，除非其业务事实已经提交。

## 8. 当前交付

### 已完成

- OS 外壳、发送键左侧入口、APP runtime registry；
- 四次元壁 APP；
- Economy 与只读钱包；
- 固定商品商店与主 RP Prompt 效果；
- 银行；
- 三款纯规则赌场游戏；
- 根级单写队列、CAS、actionId 幂等、跨领域原子提交与保存确认。

### 后续

1. 任务：先完成自动状态机、触发时序、模型边界、结算和分支语义设计，再施工。
2. 不明物：产品形态、成长时钟和经济循环确认后再设计。
3. 地图、宠物等：必须先明确自己的事实来源和生命周期，不预埋共享状态。

## 9. 开工检查

每个新 APP 开工前必须回答：

- 功能所有者和唯一事实来源；
- 哪些是临时态，哪些必须持久化；
- 是否真的读取主聊天，读取哪个窄事实；
- 外部依赖和注册入口；
- 删除路径与数据策略；
- 真实兼容对象；
- 哪些稳定契约值得测试，以及最低成本测试层。

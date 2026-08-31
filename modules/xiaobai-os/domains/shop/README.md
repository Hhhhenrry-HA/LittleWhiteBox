# Shop domain

Shop 拥有固定商品目录、购买/激活/关闭/投递事件、库存与效果投影，以及主 RP Prompt 规则。

`ShopDomainV2`只持久化连续事件。库存和效果由`projectShopState`重放得出，不另存 current state、楼层、倒计时、锁、快照或缓存。

## 回复投递语义

有限效果的期限是`applications`：一条成功形成的 normal Assistant 回复提交一次 deliver，相关 activation 的`appliedCount`增加 1。回复自身保存本次效果收据，以便 swipe、regenerate 和 continue 复用原效果而不重复消耗。

删除或编辑消息不会改变事件链；钱不退、库存不返还、已用次数不恢复。permanent 始终有效，manual 只由显式 deactivate 关闭，有限效果和 manual 的结束规则各只投递一次。

## 安全边界

`catalog.ts`中的可信规则是评审过的静态指令。用户参数经过 Unicode 规范化、控制字符移除、空白折叠、长度限制和 XML/宏编码，仅进入参数数据区。

购买扣款由`apps/shop/application`与 Economy 原子提交。`prompt.ts`只把一张已校验收据渲染成 Prompt；SillyTavern 消息事件、收据挂载与生成临时态归`apps/shop/host/prompt-runtime.ts`和`host/sillytavern-context.ts`。

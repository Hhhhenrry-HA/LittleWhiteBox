# 银行 APP 施工方案

## 1. 开工检查

| 项目 | 结论 |
| --- | --- |
| 功能所有者 | Bank 领域 |
| 唯一事实来源 | Bank 事件链；资金仍以 Economy 流水为准 |
| 持久态 | command/result、冻结合同、Assistant 回合、金融活动 |
| 临时态 | 当前头寸投影、剩余期限、可领取状态、分页、操作弹窗 |
| 外部依赖 | Economy、根 store、Assistant 回复计数、主生成 guard |
| 注册入口 | Bank descriptor、runtime、domain validator、交叉不变量 |
| 删除路径 | 处理 escrow 后删目录/注册/`domains.bank` |
| 最少测试 | 数学、事件、回合投影、原子资金、随机幂等、Controller |

## 2. 施工顺序

### A. 纯领域

1. 固定六款产品，金额与百分比全部使用整数。
2. 建立 Bank event、position、activity 与 CAS 类型。
3. 实现开立、提前支取、到期结算和线性重放。
4. 浮动收益只在新开立理财且所有校验通过后抽取。
5. Public view 在锁定期移除 resolvedReturnBps 与 settlementAmount。
6. 校验 revision、ID、合同可重算、活动净额和事件状态转换。

### B. Application

1. `root-protocol.ts`从 Bank event 确定唯一预期资金腿。
2. Service 在根 mutation 内读取 current Assistant count。
3. 幂等 action 重放先于 CAS，不重抽随机、不重新保存。
4. 新动作通过 CAS 后生成事件与资金腿，安装到同一候选根。
5. 运行 Bank、Economy 与 Bank-Economy 交叉不变量。
6. 主生成开始前和提交前均检查 guard。

### C. Controller 与 UI

1. 已有 Economy 同步打开；缺失时显示`loading`并后台开户。
2. 每个 frame 请求绑定 activation chat identity。
3. Controller 串行化写动作，只转发产品、金额、positionId、CAS 与 actionId。
4. 产品、头寸和记录使用独立组件，不把业务堆进一个 Vue 文件。
5. 未确认保存提供确认入口，禁止继续资金动作。

## 3. 回归重点

- 当前 Assistant 数量下降后，未结头寸剩余期限变化，但 Bank 根和 Economy 根不变。
- 已结算头寸永不因消息变化恢复。
- 早退同时结算其他到期头寸时，所有 escrow 与活动一次提交。
- 保存失败不留下半个头寸；确认未知结果不重复抽收益。
- 已有 Economy 的激活不发后台读取。

不创建剧情 adapter、hash、anchor、write gate 或 reconciler，也不为测试线旧实现保留字段。

# 云上叠叠屋：验收与终审

日期：2026-09-28。合同：[目标设计](./stacking-game-target-design.md)；过程：[施工与初审](./stacking-game-implementation-plan.md)。

## 结论

目标文档、施工文档、初审、实现、终审五步完成。现有「游戏」大厅已接入完整 3D 平衡玩法；报名、各档收工、满楼、失败和放弃走真实 Economy 事务。Moving 目录未改，用户已有声音/清晰度调整保留。

## 检查与证据

| 检查 | 结果 |
| --- | --- |
| 类型与生产构建 | `npm run build:xiaobai-os` 通过，包括 Shell、Host、Agent；最终视觉细节修改后再次构建通过 |
| lint | `npm run lint` 通过；最终修改文件另跑 ESLint 通过。曾并行构建导致导入检查撞上 dist 清空时刻，构建后重跑已通过 |
| 全量 OS 测试 | 1597 / 1597 通过，0 失败，包括旧三种游戏和 Moving |
| 功能语义测试 | `tests/stacking-*.test.js` 四组共 24 项：规则、真实经济事务、client/硬刷新恢复、画质预算 |
| 几何与可玩性 | 开场可落空；累计重心会使下层失稳；反向配重能救回危险承托；阳台朝向与错台顶面改变可行落点 |
| 真正 UI 满楼 | 控制浏览器活动时钟，实际点击调头/落下 20 次，未注入落点，最终到账 200；[截图](../../../output/playwright/stacking-timed-20.png) |
| 四档结算 | 隔离初始余额 100，报名及收工后分别为 100 / 130 / 170 / 250；每局一条报名腿及一条奖励腿，不累计奖金 |
| 失败/放弃/纪录 | 达 8 间后落空，奖金归零、余额 50；再报名并放弃，余额 0；最佳 8 间仍可回看，失败前可留影再看倒塌 |
| 拒绝/未知/已写但未知 | 候选复核、同身份重复、旧版本拒绝均验证；不重扣重奖，已写但响应丢失由框架读回确认 |
| 整个 Host 重启＋硬刷新 | 未落盘的未知结果后重启 Host 并刷新，恢复原 `x=-251、direction=-1`，只能复核这一操作，余额仍 50；确认后删除本地意图 |
| 声音 | 设置仓库持久化，重进/新局/重启不重置；保存失败保留旧值。音调调度与 AudioContext 释放有浏览器检查，未冒充主观听感评价 |
| 停绘/释放 | 最终冒烟活跃采样 650 次 WebGL draw；模拟隐藏后 0，返回大厅后 0；切去 Moving 释放一个叠叠屋 WebGL 上下文和一个音频上下文 |
| 图形故障 | 人为丢失 WebGL 上下文后显示重载入口；重载后的局、动作、余额一致 |
| 交互/布局 | 真实键盘方向键＋空格及 CDP 触屏各提交一次落下；窄屏、横屏、所有文字两倍、深浅 OS 主题、规则对话框、旋转缩放和 PNG 留影均检查 |
| 预算 | 像素、DPR、阴影有硬上限；持续负载滞回只在安全边界调档。390 宽场景实测 canvas 390×567，无横向溢出 |

[隔离钱包完整收据及楼体状态](../../../output/playwright/stacking-wallet-receipt.json)。这是内存验收钱包，不是用户钱包。

## 策略与收益实验

运行 `node --import tsx modules/xiaobai-os/tests/fixtures/stacking-strategy-experiment.mjs`。500 个种子全部可解，认证平均 10.18 ms、样本最大 28.31 ms（本机离线数据）。

| 策略 | 平均稳住间数 | 达 8 / 12 / 16 / 20 间 | 在这些门槛收工的平均净收益 |
| --- | ---: | --- | --- |
| 永远放世界正中、不调头 | 8.944 | 52% / 28.8% / 11% / 4.6% | -24 / -26.96 / -36.8 / -40.8 |
| 永远放当前屋顶正中、不调头 | 6.37 | 25.4% / 7.2% / 0 / 0 | -37.3 / -44.24 / -50 / -50 |
| 认证路线精确操作 | 20 | 全部 100% | 0 / +30 / +70 / +150 |
| 路线误差标准差 40 单位 | 19.842 | 99.8% / 99.6% / 98.4% / 97.2% | -0.1 / +29.68 / +68.08 / +144.4 |
| 路线误差标准差 100 单位 | 15.774 | 86.8% / 77.8% / 62.4% / 46.8% | -6.6 / +12.24 / +24.88 / +43.6 |
| 路线误差标准差 200 单位 | 8.518 | 50.6% / 25.2% / 9.2% / 2.4% | -24.7 / -29.84 / -38.96 / -45.2 |

误差实验对认证路线施加正态落点误差，不含动态配重补救。结果支持“机械策略不能稳定刷收益，熟练操作可以盈利”，**不是人类胜率或真实人群经济平衡报告**。无思考的时钟控制脚本满楼活动时间约 42.939 秒；目标中的 3～5 分钟含观察/决策，尚无真人局时样本，不将目标当实测。

## 实景

- [手机完整小楼](../../../output/playwright/stacking-mobile.png)、[深色 OS](../../../output/playwright/stacking-dark.png)
- [所有文字两倍](../../../output/playwright/stacking-text-200.png)、[低高度横屏](../../../output/playwright/stacking-landscape.png)
- [完整导出 PNG](../../../output/playwright/stacking-export.png)、[失败前留影](../../../output/playwright/stacking-pre-collapse.png)
- [失败](../../../output/playwright/stacking-failure.png)、[倒塌表现](../../../output/playwright/stacking-collapse.png)、[最佳旧楼](../../../output/playwright/stacking-best.png)
- [规则](../../../output/playwright/stacking-rules-mobile.png)、[硬刷新恢复](../../../output/playwright/stacking-recovered-drop.png)

前端设计审查修正了重复标题、空态尺度、结算瞬间留影裁楼顶和横屏容器布局。去掉辅助说明仍能识别吊车/房屋与落下操作，没有说明墙或表单式首页。

## 复跑

1. 仓库根目录构建，启动 `node --import tsx modules/xiaobai-os/tests/fixtures/stacking-browser-server.mjs`，仅监听 `127.0.0.1:18913`。
2. 根目录执行 `node modules/xiaobai-os/tests/fixtures/stacking-cli-code.mjs <场景>`。场景：`cashouts`、`lossRecovery`、`presentation`、`timedTower`、`lifecycle`、`endings`。
3. 从 `output/playwright` 启动 Playwright CLI 的独立命名会话，打开上述地址，运行 `run-code --filename=stacking-<场景>.js`。时钟场景独用会话，结束关闭，避免污染普通生命周期观察。

`cashouts` 用真实 Host 合法动作准备楼体，再实际点击页面结算；`timedTower` 连落点也全部经页面按钮和原吊车时钟产生。两者不混称。存储端口为内存，实际用户文件/聊天/金币不参与。

## 边界与交付审查

- 已审上下游、规则/表现分离、原子资金、身份/版本、失败路径、局/最佳纪录生命周期、声音和本地恢复记录清理；未发现未处理的任务内阻断缺陷。
- 自动化 Chromium 切新标签仍报告原页可见，所以隐藏门控明确采用模拟事件；返回大厅停绘和资源释放是真实导航检查。未宣称低端真机、手机系统后台或完整浏览器/WebView 矩阵已验证。
- 不是自由刚体物理或防篡改反作弊系统；未引入隐藏胜率调节、收益上限、商城或多人榜。
- 无新依赖、外部模型调用或真实钱包操作；未修改无关工作区内容。
- dist 已更新，旧哈希 Game 资源被构建替换，旧产物可从 Git 恢复。截图及收据保留在 `output/playwright/`；自己的验收服务与浏览器在结束时关闭。

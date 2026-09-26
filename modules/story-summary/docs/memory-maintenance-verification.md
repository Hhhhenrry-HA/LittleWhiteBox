# 记忆 Agent 维护：验证记录

日期：2026-09-26。施工状态见[施工文档](./memory-maintenance-implementation-plan.md)，产品判据见[目标设计](./memory-maintenance-target-design.md)。

## 1. 本轮实现与使用入口

总结设置 → **Agent**。自动维护默认关闭；保存授权不会调用模型。手动「复审一次」独立于自动开关。后台由总结宿主拥有，关闭设置页不会停止任务。共享主预设不需要其他 APP 启动。

当前实现覆盖逐楼锚点及整份总结业务 JSON、跨批事件合并／引用重定向、只读分页证据、草稿提交、批次成果与撤销、受影响索引补齐。原文不写入；运行队列不持久化，不重启续发付费请求。

维护操作、撤销和成果共享同一差量；同批多次维护按顺序记录。宿主 `saveMetadata` 可能吞掉保存失败，因此增加聊天文件回查确认；只读回查可重试，未知保存不重跑语义模型。

## 2. 工程验证

| 实际执行 | 结果 |
| --- | --- |
| `node --test modules/story-summary/tests/*.test.js` | 415/415 通过；含第 7 节的真实存储安全回归 |
| `npm run test:story-summary:runtime` | 通过 |
| `npm run test:story-summary:alignment` | 通过，零网络对齐检查 |
| `npm run test:story-summary:cancel` | 通过：请求 12、响应 102、延迟 12、存储 7、swipe 6 个场景；另含维护存储检查 |
| `npm run test:story-summary:bundle` | 通过，受影响 replay 构建；未重建地图／OS |
| 生产 `story-summary.js` 入口 esbuild 链接检查 | 通过；宿主外部模块外置，`write:false`，不改发布产物 |
| `npm run test:story-summary:vectors` | 41/41 通过 |
| `npm run test:gold-eval` | 历史首轮 166/168 及定点恢复见第 6 节；本轮冻结工作区后的完整复跑记录见第 7 节，只跑离线测试 |
| `npm run lint`、`git diff --check` | 本轮最终结果见第 7 节；不修范围外模块 |

主要证据入口：

- [领域、会话、保存边界测试](../tests/memory-maintenance.test.js)：事件身份和引用、独立事件不受操作波及、原文边界与不可写、已读证据、分页未读完不可编辑、覆盖缺口、别名环、预算终止、共享参数、工具错误回喂、聊天／来源／人工编辑冲突、取消和重启。
- [实际存储集成](../../../scripts/story-summary-replay/memory-maintenance-storage-check.mjs)：真实 store 与 IndexedDB 接口，模拟宿主保存。验证同批两次维护、导入基线维护撤销、旧事件／锚点向量失效、锚点删除后楼层统计、已确认保存失败恢复、原文不变。
- [总结提交通知集成](../../../scripts/story-summary-replay/summary-response-check.mjs)：实际生成器在保存成功后通知一次；解析／保存失败不通知；收尾回调失败仍通知；重复已提交边界零调用、零通知。手动与自动入口共用该生成器，不另造两条通知路径。
- [保存确认](../data/metadata-confirmation.js)：生产回查使用 SillyTavern 当前单聊／群聊读取 API。单测验证吞错、回查重试和未知结果；replay 使用隔离宿主替身，未向用户真实聊天写入测试数据。

操作测试证明“指令执行完整且可撤销”，**不证明模型知道哪条该改、哪两条该合并**。

## 3. 浏览器实测

入口：[真实产品 iframe 预览](../tests/ui-preview.mjs)；宿主数据来自[确定性桥接样本](../tests/maintenance-preview-host.js)。通过 Playwright CLI 驱动 Chromium，桌面 1280×800、手机视口 390×844；不是实体手机测试，也不是生产付费 Agent 端到端测试。

已检查：

- 空态、12 条分页成果、展开修改前后／理由／依据、未检查／无法查证／缺失锚点。
- 保存授权没有发出复审消息；关闭重开保留授权。
- 手动复审显示运行与取消；关闭设置后宿主运行仍在；取消可用。
- 深浅主题及长内容；手机内容无横向溢出。

截图位于 [`output/playwright/memory-maintenance/`](../../../output/playwright/memory-maintenance/)：`desktop-light.png`、`desktop-light-detail.png`、`desktop-dark.png`、`mobile-dark-detail.png`、`mobile-dark-error.png`、`mobile-light-empty.png`、`mobile-light-running.png`。

按前端设计技能沿用现有设置页、集中必要文案，没有新增 API 表单或工具日志控制台。按提示词技能将模型规则集中在维护领域，工具权限由代码验证。

## 4. 固定语义样本与真实调用结果

样本：[24 楼受控对话](../tests/fixtures/memory-maintenance.js)，不读取或改写用户原始聊天。运行器：[小样本检查](../tests/maintenance-model-check.mjs)，默认零 API 预检，显式 `--run` 才调用。

冻结评价项：

- 大总结：传闻确定化、药箱归属、长沙／北京历史与现状、客房小位置误作持续事实，共 4 个已知错误。
- L0：传闻确定化、归属颠倒、目的地错误，共 3 个已知错误。
- 正确对照：旧书承诺、餐厅当楼锚点、另一次青山争吵。
- 事件：红山争吵第 17–23 楼被第 20 楼边界切成两条；应保留旧身份、续接细节、重定向后续因果，保留青山独立事件。

| 质量项目 | 修正／正确合并 | 误改／误合并 | 未解决／漏合并 |
| --- | --- | --- | --- |
| 大总结 | 未测得 | 未测得 | 未测得 |
| L0 | 未测得 | 未测得 | 未测得 |
| 事件整理及细节保留 | 未测得 | 未测得 | 未测得 |

原因：现有共享配置各次尝试均在产出模型结果前失败。没有 `result.json`，不存在可评分语义输出。

| 留存目录（仓库根目录下） | 真实结果 |
| --- | --- |
| `output/memory-maintenance-check/` | 当前主预设凭据被拒绝；保留请求和 journal，早期脚本尚无独立 failure JSON |
| `output/memory-maintenance-check-smol/` | 已配置备选预设凭据被拒绝；保留失败回执 |
| `output/memory-maintenance-check-vsllm/` | 直连未建立连接；留存只读传输诊断 |
| `output/memory-maintenance-check-vsllm-proxy/` | 经现有环境代理可达，所配模型不可用 |
| `output/memory-maintenance-check-final/` | 同一已配置服务的可用模型被额度限制拒绝 |

未改用户保存的 API 配置；测试覆盖参数仅限运行器。未盲目重发未知计费请求、未重买成功请求。原始请求／失败文件不覆盖，历史预检对应当时版本；如需继续，先对当前代码生成独立目录的新预检。

## 5. 未完成及未做

真实模型纠错质量、跨批事件语义判断和实际预算标定仍缺可用且有额度的共享 API。代码执行上限是安全边界，不是“全量一定审完”的承诺；结果会列未审范围。

未用用户真实聊天做写入式生产 E2E；未做实体手机／其他 WebView 实测。没有启动新全量召回实验，没有改变「完整 USER＋AI 前三锚点邻块」检索方案，没有修改地图在途工作，没有提交或推送。

## 6. Review 修复与回归

2026-09-26：修复本轮审查确认的四处缺陷，未调用付费 API。

| 缺陷 | 修复边界 | 回归证据 |
| --- | --- | --- |
| 同轮工具失败仍接受 FinishReview | `runner.js` 拒绝错误所在响应中的收尾，集中错误解释引导模型读取失败结果；成功操作仍留在草稿，不重复执行 | 普通消息循环与会话式工具循环均先收到失败反馈，再修正 L0 并保存两侧；预算耗尽时不能保存 |
| 加载投影改变字段顺序，造成撤销假冲突 | 维护与原总结撤销共用结构比较：对象键顺序不影响相等，数组顺序与真实内容仍严格检查 | 当前格式 JSON 经序列化／重载投影后，同批多次维护及整批总结可撤销；实际改动人物数组仍拒绝覆盖 |
| LAN HTTP 缺少 randomUUID，结果无法保存 | 提交使用非安全上下文也可用的 getRandomValues 生成不透明收据 ID，并在失效索引前生成 | 移除 randomUUID、保留 getRandomValues 的能力模拟中连续提交成功，历史 ID 不重复；不是实体手机实测 |
| 旧维护在新总结保存通知前退出，丢失未审范围 | 调度器在最后一次冲突结果中暂存范围，仅下一批同聊天、已确认的新边界继承 | 手动／自动旧任务提前因基线变化退出，下一批均接回旧范围；取消、停用、换聊、重启、未知保存及传输失败不自动续发 |

以上回归位于[维护契约测试](../tests/memory-maintenance.test.js)。工程检查结果见第 2 节；真实语义验收仍是第 4 节的未测得状态，不能由这些回归测试替代。

离线 Gold 首轮失败记录及恢复：

- `pinned archive reuses cleaned requests…`：测试期间更新本验证文档，触发 `Prepared production source changed or unavailable`。停止修改后定点复跑通过。
- `actual process restart reuses saved…`：首轮 `binding-changed`；与其他 replay 检查并行复跑又出现 `manifest bundleHash 与归档 bundle 不一致`。检查确认 runner 共用 `scripts/.story-summary-replay-cache/story-summary-replay.bundle.mjs`；待其他检查全部结束、冻结工作区后串行定点复跑通过。
- 定点命令均为 `node --test --test-name-pattern='<对应测试名前缀>' scripts/gold-eval/tests/prepared-lifecycle.test.mjs`；使用该文件的离线供应商替身，没有实际外部付费请求。未改动指纹保护或评测工具，也不将首轮记为全绿。

## 7. 导入基线、锚点退役与统一保存修复

2026-09-26，针对后续 review 的两个 P1 和一个 P2。终态约束归目标设计第 6–7 节，代码落点归施工文档；本节记录真实验证，不另造兼容或审计分支。

### 修复及回归证据

[真实存储安全集成](../tests/memory-storage.test.js)使用实际总结数据层、HTTP 确认逻辑、隔离宿主文件和 IndexedDB，共 20 项通过：

- 真实导入构造 → 同基线两次维护 → 重载 → 回退：恢复维护前的 **4 个事件、5 条事实**，导入内容不清空，无维护时回退不可用。
- 真实上游边界型历史只在加载时变为基线；损坏生成逆操作拒绝当作基线。
- Agent 修改／删除锚点后，清空和原文失效扫描全部历史；退役标记、修改前后随原收据保存。重载并重新提取同 ID 后撤销，不覆盖新锚点，不阻断大总结撤销。有效锚点的人工冲突仍拒绝覆盖。
- 总结、历史、锚点、提取状态一起保存；服务端新状态即使宿主抛错也成功，已确认旧状态恢复整份草稿，回查失败／第三方新状态不擅自恢复。并发编辑保留并隔离；保存中不发布维护草稿，另一写入被拒绝。
- 保存未确认后禁止清空、锚点修改、提取及继续消费；重载只读实际服务端状态，不重发保存。切聊天不向新聊天安装旧结果。
- 删除／swipe 越过基线保留导入内容并记录来源失效。普通原文编辑的缓存清理或保存失败也停止使用旧锚点；安全标记保存失败仍运行期阻断。清空恢复时同时移除受失效来源影响的锚点，不误记为历史损坏。
- L0 提取结果暂存至整批完成；允许保留期间新总结，拒绝覆盖被编辑的 USER／AI 证据。缓存失效失败不改业务内容。

已移除锚点底层独立保存计时器，以及生成／导入／维护／撤销各自恢复内存的分支；用户开关和原文显隐这类会连带保存整份 metadata 的宿主入口同样检查保存门禁。索引补齐在写入前复核当前锚点，失败不会重买语义维护。

### 浏览器与工程检查

复用真实产品 iframe 和隔离宿主桥，以 Playwright 检查桌面 1280×800／手机视口 390×844、浅色／深色：退役记录仍可展开修改前后，说明失效原因；未确认保存时禁用复审／修索引，不再显示“修改已保存”的索引提示。两种视口均无横向溢出；不是实体手机或用户聊天写入测试。

截图位于 [`output/playwright/memory-maintenance-repair/`](../../../output/playwright/memory-maintenance-repair/)：`mobile-dark-retired.png`、`mobile-dark-unconfirmed.png`、`desktop-light-unconfirmed.png`。按前端设计技能仅补状态与必要解释，未改布局；按 Playwright 技能实测状态而非只检查节点存在。

本轮总结全套、运行时、零网络检索对齐、取消／响应／回滚存储、向量、replay 构建及生产入口 `write:false` 链接检查均通过，计数见第 2 节。最终 `npm run lint` 无错误或警告，`git diff --check` 通过。

本轮完整离线 Gold **168/168 通过**，无跳过；未与其他 replay 检查并行，执行期间未修改总结代码或文档，完成后才补写本条结果。跨进程重启复用和固定归档校验均通过，没有放宽指纹保护，也没有付费调用；第 6 节的历史失败记录仍保留。

本轮没有调用模型或改写用户聊天，没有启动全量召回实验，没有改检索方案，没有提交／推送，也没有修改地图、OS、画图的在途工作。第 4 节真实模型语义成绩仍未测得，本轮工程回归不能代替它。

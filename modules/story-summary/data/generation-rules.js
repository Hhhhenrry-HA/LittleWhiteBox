import { RELATION_TRENDS } from './fact-predicates.js';
import { ARC_PROGRESS_MAX } from '../generate/arc-progress.js';

// Generation embeds these passages verbatim, and SUMMARY_STANDARD fingerprints
// the assembled summary rules. Maintenance selects the writing-content passages
// at the end; update protocol, output counts and field-schema notes stay out.

export const SUMMARY_MEMORY_ROLE_RULES = `[Memory Role]
memoryRole describes what an event leaves for later context. Choose one role based on its main evidenced result:
- 状态变化: A status is established, changed or ended: identity, relationship, residence, ownership or ongoing circumstances.
- 约定承诺: A plan, promise, rule or responsibility is agreed, fulfilled or cancelled. An intention alone is not a completed state change.
- 信息揭示: Someone learns an identity, secret, reason or truth. Preserve who learned it in the summary.
- 偏好习惯: An explicitly stated preference, aversion or taboo, or a recurring behavior supported by the available history. A single action alone does not establish a habit.
- 具体经历: A recognizable interaction or experience, including daily life, conflict, comfort or adventure, whose main contribution is the episode itself.
These roles are different uses of memory, not importance levels. Choose the main result; keep other relevant details in the summary. Continuous actions and reactions about the same occurrence stay together rather than being split to fill roles.`;

export const SUMMARY_EVENT_STYLE_RULES = `[Event Summary Style]
- summary 不是剧情概括，而是高召回的回忆卡片
- timeLabel 和 summary 的时间优先用原文日期或明确事件定位，沿用已有时间基准；不单独写“今天、昨天、明晚”等相对时间，不编造日期或间隔。
- 必须优先保留原词：正式人名、原文称呼/昵称/别称、地点、关键物件、动作、情绪态度、关系变化、约定/承诺/交换条件、秘密或羞辱/暧昧/冲突钩子
- 信息无法全部容纳时，严格按此顺序压缩或删除：气氛描写 → 次要反应 → 心理描写 → 动作过程；必须先删完前一类，才可压缩后一类
- 与本事件直接相关的具名实体（人名、地点、具名物件）、辨识性特征和15字以内的关键原话属于最后保留层；仅在上述四类都已不足以继续压缩时才考虑舍弃；无关名词不要强行塞入
- 不要写“两人发生冲突”“关系恶化”“有暧昧互动”“揭示了一个秘密”这种空话，必须写清是谁在什么地方拿着什么、对谁做了什么、结果怎样
- 优先写成 1 句；信息确实过多且确有必要时可写 2 句，但不要拆成空泛铺垫 + 具体补充
- 允许 summary 略密实，但必须让未来一句口语提法也能认出这段
- 示例只展示具体度，不要求模仿题材、语气或句式
- 不合格：
  1. 二人在酒馆发生冲突，关系恶化。
  2. 两人有暧昧互动，并约定再次见面。
  3. 她揭示了一个秘密，对方受到打击。
- 合格：
  1. 苏晚在黑鹭酒馆当众把欠条拍到顾衡胸口，骂他拿她母亲的旧宅做赌注，顾衡想抓她手腕被她甩开，周围赌客起哄，两人彻底撕破脸。 (#120-123)
  2. 原文明确当前为6月12日，追问“昨晚”的去向并约定“明晚”见面：
     6月12日，周柠在旅馆浴室门口盯着林雨锁骨上的咬痕，追问6月11日晚和谁在一起，林雨一边整理湿透的白衬衫一边嘴硬否认，最后答应6月13日晚还去旧码头见她。 (#88-91)`;

export const SUMMARY_RELATION_TREND_RULES = `[Relationship Trend Scale]
${RELATION_TRENDS.slice(0, 4).join(' ← ')} → ${RELATION_TRENDS.slice(4).join(' → ')}`;

const ARC_CONTENT_RULES = `├─ trajectory: 当前阶段描述(15字内)
├─ progress: an integer from 0 to ${ARC_PROGRESS_MAX}, used for both existing and updated arcs`;
export const SUMMARY_ARC_RULES = `[Arc Progress Tracking]
${ARC_CONTENT_RULES}
└─ newMoment: 仅记录本次新增的关键时刻
Each arc update contains name, trajectory and numeric progress. newMoment is optional. Omit arcUpdates when no arc changes.`;

const FACT_IDENTITY_RULE = '1) Keyed by (s + p). If a new update has the same (s+p), it overwrites the previous value.';
const FACT_STATE_RULES = `3) isState meaning:
   - isState: true  -> core constraints that must stay stable and should NEVER be auto-deleted
                    (identity, location, life/death, ownership, relationship status,
                      stable distinctive physical traits, binding rules)
   - isState: false -> non-core facts / soft memories that may be pruned by capacity limits later`;
const FACT_RELATION_RULES = `4) Relationship facts:
   - Use predicate format: "对X的看法" (X is the target person)
   - trend is required for relationship facts, one of:
     ${RELATION_TRENDS.join(' | ')}`;
const FACT_PREDICATE_RULE = `6) Predicate normalization:
   - Reuse existing predicates whenever possible, avoid inventing synonyms.`;

export const SUMMARY_FACT_TRACKING_RULES = `[Fact Tracking - SPO / World Facts]
We maintain a small "world state" as SPO triples.
Each update is a JSON object: {s, p, o, isState, trend?, retracted?}

Core rules:
${FACT_IDENTITY_RULE}
2) Only output facts that are NEW or CHANGED in the new dialogue. Do NOT repeat unchanged facts.
${FACT_STATE_RULES}
${FACT_RELATION_RULES}
5) Retraction (deletion):
   - To delete a fact, output: {s, p, retracted: true}
${FACT_PREDICATE_RULE}`;

const FACT_PURPOSE_RULE = '- 目的: 纠错 & 世界一致性约束，只记录硬性事实';
const FACT_CONTENT_RULES = `- isState: true=核心约束(位置/身份/生死/关系/稳定辨识性身体特征)，false=有容量上限会被清理
- 外貌类统一使用谓词 p="身体特征"；只记录稳定、有辨识度的特征，不记录临时衣着、姿势、表情和普通伤势
- "身体特征" 的 o 必须写当前完整值。由于相同 s+p 会覆盖旧值，新增特征时必须把已有特征一并写全，不能只写新增部分
- 例：已有 {"s":"鹿椿若","p":"身体特征","o":"头顶白色分叉鹿角","isState":true}，后续发现鹿耳时应输出 {"s":"鹿椿若","p":"身体特征","o":"头顶白色分叉鹿角，鹿耳","isState":true}，不能只写"鹿耳"`;

export const SUMMARY_FACT_UPDATE_RULES = `## factUpdates 规则
${FACT_PURPOSE_RULE}
- s+p 为键，相同键会覆盖旧值
${FACT_CONTENT_RULES}
- 关系类: 按 doc 中的“Fact Tracking”填写谓词和 trend
- 删除: {s, p, retracted: true}，不需要 o 字段
- 更新: {s, p, o, isState, trend?}
- 谓词规范化: 复用已有谓词，不要发明同义词
- 只输出有变化的条目，确保少、硬、稳定`;

const ALIAS_PURPOSE_RULE = '- 目的: 维护同一角色的不同写法，让称号、昵称、缩写、不同语言或译名都能指向同一人';
const ALIAS_EVIDENCE_RULE = '明确揭示身份、稳定称号或昵称、唯一缩写、不同语言/译名/书写形式都可以作为依据';
const ALIAS_IDENTITY_RULE = '- 称号、昵称、缩写必须在当前剧情和既有资料中只指向这一位角色。亲昵称呼、亲属称呼、泛称、普通职位、代词、仅因读音/字形相近的名称不构成同一人依据';

export const SUMMARY_ALIAS_RULES = `## characterAliasUpdates 规则（可选）
${ALIAS_PURPOSE_RULE}
- 当前对话与既有总结能确认两种名称是同一角色时输出。${ALIAS_EVIDENCE_RULE}
${ALIAS_IDENTITY_RULE}
- to: 已有总结中稳定使用的主名；from: 其他写法数组；evidence: 简短说明确认依据
- 例: {"to":"五条悟","from":["悟","Gojo Satoru"],"evidence":"当前中文称呼“悟”与既有日文名五条悟均指同一角色"}
- 不要列出要修改哪些事件/事实/弧光，系统会自动合并`;

export const SUMMARY_PLAIN_STYLE_RULES = `- 用朴实、白描、有烟火气的笔触记录事实，避免比喻和意象
- 严谨、注重细节，避免使用模糊的概括性语言，应用具体的动词描述动作，例:谁,在什么时间/地点,通过什么方式,对谁,做了什么事,出现了什么道具,结果如何。`;

const ANCHOR_LANGUAGE_RULE = '- scene、where 和 edges.r 使用当前 <round> 正文的主要语言；混合语言时跟随主要叙事语言，并保留原文人名、专名和引语；JSON 键保持协议规定，不翻译';
const anchorSceneRules = field => `- 纯自然语言完整句，不要任何标签/标记/枚举值
- 用朴实白描的叙述句写，不要文学化修饰，不要抽象总结腔
- ${field} 不是好看的概括，而是高召回的场景卡片；后续玩家只要隐约提到这段，也要尽量能命中
- 优先保留：正式人名、地点、关键物件/道具、具体动作
- 有则尽量保留：原文出现过的称呼/昵称/代称、情绪或态度、关系变化、后续可能被玩家提起的词面线索
- 不要为了凑全字段而编造原文没有明确出现的信息；没有明确依据的内容不要硬写
- 读者只看 ${field} 就能复原这一幕，也能看出别人以后会怎么提起这件事
- 必须优先保留原词，不得擅自把昵称、称呼、道具名、地点名、暗号、身体特征、衣物、约定、秘密、羞辱/暧昧/冲突动作改写成抽象同义词
- 禁止空泛写法，例如：两人交谈、关系升温、发生冲突、气氛暧昧、展开互动、进行交流、产生矛盾
- 必须把抽象概括改写成具象句，写清楚谁在什么地方拿着什么、对谁做了什么；如有关键言语行为，可简要保留其内容或目的；态度和关系变化仅在这一轮里有明确依据时再写
- 60-100字，信息密集但流畅；不要列清单，要在自然语言里尽量塞进可检索钩子
- 信息无法全部容纳时，严格按此顺序压缩或删除：气氛描写 → 次要反应 → 心理描写 → 动作过程；必须先删完前一类，才可压缩后一类
- 与本场景直接相关的具名实体（人名、地点、具名物件）、辨识性特征和15字以内的关键原话属于最后保留层；仅在上述四类都已不足以继续压缩时才考虑舍弃；无关名词不要强行塞入`;
const ANCHOR_EDGE_RULES = `- s=施事方 t=受事方 r=互动行为（建议 6-12 字，最多 20 字）
- s/t 必须是参与互动的角色正式名称，不用代词或别称
- 只从正文内容中识别角色名，不要把标签名（如 user、assistant）当作角色
- r 使用动作模板短语：“动作+对象/结果”（例：“提出交易条件”、“拒绝对方请求”、“当众揭露秘密”、“安抚对方情绪”）
- r 不要写人名，不要复述整句，不要写心理描写或评价词
- r 正例（合格）：提出交易条件、拒绝对方请求、当众揭露秘密、安抚对方情绪、强行打断发言、转移谈话焦点
- r 反例（不合格）：我觉得她现在很害怕、他突然非常生气地大喊起来、user开始说话、assistant解释了很多细节
- 每个锚点 1-3 条`;
const ANCHOR_WHERE_RULE = '- 场景地点，无明确地点时空字符串';
const ANCHOR_COUNT_RULES = `- 最多2个。1个够时不凑2个
- 明显场景切换（地点/时间/对象变化）时才2个
- 同一场景不拆分`;

export const ANCHOR_GENERATION_RULES = `${ANCHOR_LANGUAGE_RULE}

## scene 写法
${anchorSceneRules('scene')}

## edges（关系三元组）
${ANCHOR_EDGE_RULES}

## where
${ANCHOR_WHERE_RULE}

## 数量规则
${ANCHOR_COUNT_RULES}
- 无角色互动时返回 {"anchors":[]}

## 示例
输入：艾拉在火山口举起圣剑刺穿古龙心脏，龙血溅满她的铠甲，她跪倒在地痛哭
输出：
{"anchors":[{"scene":"火山口上艾拉举起圣剑刺穿古龙的心脏，龙血溅满铠甲，古龙轰然倒地，艾拉跪倒在滚烫的岩石上痛哭，完成了她不得不做的弑杀","edges":[{"s":"艾拉","t":"古龙","r":"以圣剑刺穿心脏"}],"where":"火山口"}]}`;

export const SUMMARY_GENERATION_RULES = [
    SUMMARY_MEMORY_ROLE_RULES, SUMMARY_EVENT_STYLE_RULES, SUMMARY_RELATION_TREND_RULES, SUMMARY_ARC_RULES,
    SUMMARY_FACT_TRACKING_RULES, SUMMARY_FACT_UPDATE_RULES, SUMMARY_ALIAS_RULES, SUMMARY_PLAIN_STYLE_RULES,
];

export const SUMMARY_CONTENT_RULES = [
    SUMMARY_MEMORY_ROLE_RULES, SUMMARY_EVENT_STYLE_RULES, SUMMARY_RELATION_TREND_RULES,
    `[Facts]
${FACT_PURPOSE_RULE}
${FACT_CONTENT_RULES}
- 关系类: 谓词写作 "对X的看法"，X 是关系对象的主名；关系事实必须带 trend，取值见 Relationship Trend Scale`,
    `[Character Aliases]
${ALIAS_PURPOSE_RULE}
- 对话与既有记忆能确认两种名称是同一角色时，别名才成立。${ALIAS_EVIDENCE_RULE}
${ALIAS_IDENTITY_RULE}`,
    `[Plain Style]
${SUMMARY_PLAIN_STYLE_RULES}`,
];

export const ANCHOR_CONTENT_RULES = [
    `[Anchor semantic]
${anchorSceneRules('semantic')}`,
    `[Anchor edges]
${ANCHOR_EDGE_RULES}`,
    `[Anchor where]
${ANCHOR_WHERE_RULE}`,
];

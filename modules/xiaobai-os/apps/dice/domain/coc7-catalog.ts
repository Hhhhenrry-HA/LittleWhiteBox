export const COC7_ATTRIBUTES = {
    STR: { label: '力量', dice: 3, add: 0 },
    CON: { label: '体质', dice: 3, add: 0 },
    SIZ: { label: '体型', dice: 2, add: 6 },
    DEX: { label: '敏捷', dice: 3, add: 0 },
    APP: { label: '外貌', dice: 3, add: 0 },
    INT: { label: '智力', dice: 2, add: 6 },
    POW: { label: '意志', dice: 3, add: 0 },
    EDU: { label: '教育', dice: 2, add: 6 },
} as const;
export type Coc7Attribute = keyof typeof COC7_ATTRIBUTES;
export const COC7_SKILL_GROUPS = { investigation: '调查', social: '交涉', physical: '行动', combat: '战斗', practical: '实用' } as const;

// Base chances: standard CoC7 sheet, not its Invictus / Dark Ages variants.
// Sources and the plugin's quick-training policy: docs/dice-coc7-design.md §10.
export const COC7_SKILLS = {
    spot_hidden: { label: '侦查', group: 'investigation', base: 25 },
    listen: { label: '聆听', group: 'investigation', base: 20 },
    library_use: { label: '图书馆使用', group: 'investigation', base: 20 },
    psychology: { label: '心理学', group: 'investigation', base: 10 },
    persuade: { label: '说服', group: 'social', base: 10 },
    fast_talk: { label: '话术', group: 'social', base: 5 },
    charm: { label: '魅惑', group: 'social', base: 15 },
    intimidate: { label: '恐吓', group: 'social', base: 15 },
    stealth: { label: '潜行', group: 'physical', base: 20 },
    climb: { label: '攀爬', group: 'physical', base: 20 },
    jump: { label: '跳跃', group: 'physical', base: 20 },
    swim: { label: '游泳', group: 'physical', base: 20 },
    dodge: { label: '闪避', group: 'combat', base: { attribute: 'DEX', divisor: 2 } },
    brawl: { label: '格斗（斗殴）', group: 'combat', base: 25 },
    throw: { label: '投掷', group: 'combat', base: 20 },
    handgun: { label: '射击（手枪）', group: 'combat', base: 20 },
    rifle_shotgun: { label: '射击（步枪／霰弹枪）', group: 'combat', base: 25 },
    first_aid: { label: '急救', group: 'practical', base: 30 },
    navigate: { label: '导航', group: 'practical', base: 10 },
    track: { label: '追踪', group: 'practical', base: 10 },
    mechanical_repair: { label: '机械维修', group: 'practical', base: 10 },
    electrical_repair: { label: '电气维修', group: 'practical', base: 10 },
    locksmith: { label: '锁匠', group: 'practical', base: 1 },
    drive_auto: { label: '汽车驾驶', group: 'practical', base: 20 },
} as const satisfies Record<string, { label: string; group: keyof typeof COC7_SKILL_GROUPS; base: number | { attribute: Coc7Attribute; divisor: number } }>;
export type Coc7Skill = keyof typeof COC7_SKILLS;
export const COC7_CAPABILITIES = {
    ...COC7_ATTRIBUTES, ...COC7_SKILLS,
    luck: { label: '幸运' },
} as const;
export type Coc7Stat = keyof typeof COC7_CAPABILITIES;
export const COC7_STAT_IDS = Object.keys(COC7_CAPABILITIES) as Coc7Stat[];
export const COC7_ATTRIBUTE_IDS = Object.keys(COC7_ATTRIBUTES) as Coc7Attribute[];
export const COC7_SKILL_IDS = Object.keys(COC7_SKILLS) as Coc7Skill[];

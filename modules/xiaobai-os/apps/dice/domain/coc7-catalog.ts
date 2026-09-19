export const COC7_ATTRIBUTES = {
    STR: { label: '力量', use: 'Physical force', dice: 3, add: 0 },
    CON: { label: '体质', use: 'Endurance and bodily resistance', dice: 3, add: 0 },
    SIZ: { label: '体型', use: 'Body size and mass', dice: 2, add: 6 },
    DEX: { label: '敏捷', use: 'Coordination and reflexes', dice: 3, add: 0 },
    APP: { label: '外貌', use: 'Appearance and first impressions', dice: 3, add: 0 },
    INT: { label: '智力', use: 'Reasoning and insight', dice: 2, add: 6 },
    POW: { label: '意志', use: 'Willpower and mental resistance', dice: 3, add: 0 },
    EDU: { label: '教育', use: 'General learned knowledge', dice: 2, add: 6 },
} as const;
export type Coc7Attribute = keyof typeof COC7_ATTRIBUTES;
export const COC7_SKILL_GROUPS = { investigation: '调查', social: '交涉', physical: '行动', combat: '战斗', practical: '实用' } as const;

// Base chances: standard CoC7 sheet, not its Invictus / Dark Ages variants.
// Sources and the plugin's quick-training policy: docs/dice-coc7-design.md §10.
export const COC7_SKILLS = {
    spot_hidden: { label: '侦查', group: 'investigation', base: 25, use: 'Notice concealed objects and visual clues' },
    listen: { label: '聆听', group: 'investigation', base: 20, use: 'Notice and interpret sounds' },
    library_use: { label: '图书馆使用', group: 'investigation', base: 20, use: 'Find information in records and libraries' },
    psychology: { label: '心理学', group: 'investigation', base: 10, use: 'Read motives and deception' },
    persuade: { label: '说服', group: 'social', base: 10, use: 'Convince through sustained reasoning' },
    fast_talk: { label: '话术', group: 'social', base: 5, use: 'Briefly mislead or distract with words' },
    charm: { label: '魅惑', group: 'social', base: 15, use: 'Win cooperation through personal appeal' },
    intimidate: { label: '恐吓', group: 'social', base: 15, use: 'Coerce through threats' },
    stealth: { label: '潜行', group: 'physical', base: 20, use: 'Avoid being noticed' },
    climb: { label: '攀爬', group: 'physical', base: 20, use: 'Climb walls, trees and similar obstacles' },
    jump: { label: '跳跃', group: 'physical', base: 20, use: 'Leap gaps and obstacles' },
    swim: { label: '游泳', group: 'physical', base: 20, use: 'Move through dangerous water' },
    dodge: { label: '闪避', group: 'combat', base: { attribute: 'DEX', divisor: 2 }, use: 'Evade an incoming danger' },
    brawl: { label: '格斗（斗殴）', group: 'combat', base: 25, use: 'Close combat with fists or simple brawling weapons' },
    throw: { label: '投掷', group: 'combat', base: 20, use: 'Throw an object at a target' },
    handgun: { label: '射击（手枪）', group: 'combat', base: 20, use: 'Fire a handgun' },
    rifle_shotgun: { label: '射击（步枪／霰弹枪）', group: 'combat', base: 25, use: 'Fire a rifle or shotgun' },
    first_aid: { label: '急救', group: 'practical', base: 30, use: 'Give immediate emergency care' },
    navigate: { label: '导航', group: 'practical', base: 10, use: 'Find a route and maintain direction' },
    track: { label: '追踪', group: 'practical', base: 10, use: 'Follow physical tracks' },
    mechanical_repair: { label: '机械维修', group: 'practical', base: 10, use: 'Repair mechanical devices' },
    electrical_repair: { label: '电气维修', group: 'practical', base: 10, use: 'Repair electrical devices' },
    locksmith: { label: '锁匠', group: 'practical', base: 1, use: 'Open or repair locks with tools' },
    drive_auto: { label: '汽车驾驶', group: 'practical', base: 20, use: 'Handle a car in difficult conditions' },
} as const satisfies Record<string, { label: string; group: keyof typeof COC7_SKILL_GROUPS; base: number | { attribute: Coc7Attribute; divisor: number }; use: string }>;
export type Coc7Skill = keyof typeof COC7_SKILLS;
export const COC7_CAPABILITIES = {
    ...COC7_ATTRIBUTES, ...COC7_SKILLS,
    luck: { label: '幸运', use: 'External chance rather than personal competence' },
} as const;
export type Coc7Stat = keyof typeof COC7_CAPABILITIES;
export const COC7_STAT_IDS = Object.keys(COC7_CAPABILITIES) as Coc7Stat[];
export const COC7_ATTRIBUTE_IDS = Object.keys(COC7_ATTRIBUTES) as Coc7Attribute[];
export const COC7_SKILL_IDS = Object.keys(COC7_SKILLS) as Coc7Skill[];

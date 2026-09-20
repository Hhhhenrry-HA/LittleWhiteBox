export const COC7_ATTRIBUTES = {
    body: { label: '体魄' },
    will: { label: '意志' },
    appearance: { label: '外表' },
} as const;
export type Coc7Attribute = keyof typeof COC7_ATTRIBUTES;

export const COC7_SKILLS = {
    athletics: { label: '运动' },
    melee: { label: '近战' },
    shooting: { label: '射击' },
    awareness: { label: '侦察' },
    survival: { label: '求生' },
    medicine: { label: '医学' },
    knowledge: { label: '常识学' },
    social: { label: '社交' },
    mechanics: { label: '机工' },
    concealment: { label: '隐匿' },
} as const;
export type Coc7Skill = keyof typeof COC7_SKILLS;
export const COC7_CAPABILITIES = { ...COC7_ATTRIBUTES, ...COC7_SKILLS } as const;
export type Coc7Stat = keyof typeof COC7_CAPABILITIES;
export const COC7_STAT_IDS = Object.keys(COC7_CAPABILITIES) as Coc7Stat[];
export const COC7_ATTRIBUTE_IDS = Object.keys(COC7_ATTRIBUTES) as Coc7Attribute[];
export const COC7_SKILL_IDS = Object.keys(COC7_SKILLS) as Coc7Skill[];

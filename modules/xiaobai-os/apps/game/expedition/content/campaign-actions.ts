import type { CourtyardFact, CourtyardPerson } from './world-types.js';
import { COURTYARD } from './courtyard.js';
import { PERSON_PLACES } from './people-places.js';
import type { PersonLocation } from '../world/people.js';
import { INTERACTION_REACH } from '../world/exploration.js';

interface CampaignAction {
    people: readonly CourtyardPerson[];
    requires: readonly CourtyardFact[];
    fact: CourtyardFact | null;
    atHome: boolean;
    label: string;
    meaning: string;
    moments: readonly string[];
}
/** Plot gates have facts; repeatable personal interactions do not change world state. */
export const CAMPAIGN_ACTIONS = {
    briefing: { atHome: false, people: ['sanniang', 'laobai'], requires: [], fact: 'briefed', label: '去哨站找人',
        meaning: '玩家接下哨站救援，得知正门与旧水道两条路线。',
        moments: ['一根细枝划过墙根的湿土。正门后是烽火台，旧水道通向牢房；牢房的小门朝着檐下。人带不动时，得先把那扇门打开。'] },
    receiving: { atHome: false, people: ['laobai'], requires: [], fact: 'receiving_arranged', label: '安排担架接应',
        meaning: '老白安排担架队在小门接应。牢门和小门打开后，玩家回到檐下才完成接回。',
        moments: ['老白把签本夹在腋下，腾出手去够门后的绳索。他没试着把伤腿踩实，只叫来两个人，把担架沿墙摆好。小门这边有人守着了。'] },
    finish: { atHome: false, people: ['sanniang'], requires: ['captives_arrived', 'supplies_secured', 'warden_defeated'], fact: 'chapter_completed', label: '清点归来的人与药',
        meaning: '与三娘核对回来的两个人和药材，结束第一章。第二章尚未开放。',
        moments: ['药箱合上，名单上多了两个勾。三娘把笔搁在箱沿，终于没有再伸手去找下一件事。'] },
    clinic: { atHome: true, people: ['sanniang'], requires: ['captives_arrived', 'supplies_secured'], fact: 'clinic_helped', label: '一起整理诊棚',
        meaning: '协助三娘归置归还的药材。记录共同经历，不规定她的好感或态度。',
        moments: ['三娘把药材分成几堆，袖口挽得整齐。你把散开的绷带卷好，留出桌边一小块空处。她的手停了一下，才把那把椅子拉近。'] },
    sit: { atHome: true, people: ['sanniang'], requires: [], fact: null, label: '在诊棚边坐一会儿',
        meaning: '玩家在诊棚边安静陪坐一会儿，不替人物决定关系进展。',
        moments: ['帘边漏进一线风。三娘把手里的针放回布包，拢了拢衣领。桌边空出来的位置没有再被药箱占住。',
            '诊棚外有人咳嗽，三娘侧耳听了听，没起身。药碾子搁在膝上，她慢慢推了两圈，又停下来。',
            '灯芯短了，三娘伸手拨亮，顺手把你那边的灯罩也擦了一下。帘外的人声远了些。'] },
    stones: { atHome: false, people: ['laobai'], requires: [], fact: null, label: '陪他摆一盘石子棋',
        meaning: '玩家陪老白用石子下棋，这是两人共同度过的一段时间。',
        moments: ['老白从墙根挑出几枚颜色不同的石子，把原先摆在左手边的一半推过来。这回另一边不用他自己下了。签本仍搁在够得着的地方。',
            '老白下到一半，盯着门外看了一会儿，回头才发现你挪了他一颗子。他没说破，把那颗又推回原处。',
            '石子不够了，老白从签本里抖出两粒干豆子顶上。这一盘他下得慢，伤腿伸直了搁在门槛上。'] },
    play: { atHome: false, people: ['anian'], requires: ['captives_arrived'], fact: null, label: '用小石子逗她玩',
        meaning: '玩家和阿念在诊棚旁玩猜石子的游戏，不自动改变剧情、认知或关系。',
        moments: ['阿念的目光跟着小石子转了一圈，伸手把地上的细沙抹平。货签压在膝下，她不再一张张摸它们了。',
            '石子藏在你左手，阿念猜右手。又猜右手。第三回她不猜了，直接来掰你的手指头，笑出了声。',
            '阿念把货签翻过来当棋盘，画了几道歪线。规矩是她现编的，编到一半忘了，又改了一条。'] },
    tools: { atHome: true, people: ['kouzi'], requires: ['supplies_secured', 'captives_arrived'], fact: null, label: '把管件放到她够得着处',
        meaning: '把归还的管件放到管架旁，不强塞给扣子，也不替她修理。',
        moments: ['管件落在管架下的干地上。扣子先看了看你，没有伸手接。等你让开，她才换了个落脚点，把那枚松动的接头拧紧。',
            '你把一截弯管放在管架下。扣子蹲在上头没动，过了一会儿垂下一根绳，绳头打了个活扣。',
            '扣子在高处拧一枚卡死的阀，你在底下递不上手。她拧开了，把旧垫圈往下一扔，正落在你脚边。'] },
} satisfies Record<string, CampaignAction>;
export type CampaignChoice = keyof typeof CAMPAIGN_ACTIONS;
export const CAMPAIGN_CHOICES = Object.keys(CAMPAIGN_ACTIONS) as CampaignChoice[];
export function availableChoices(facts: readonly CourtyardFact[], person: CourtyardPerson, location: PersonLocation): CampaignChoice[] {
    if (location.scene !== 'camp') { return []; }
    return CAMPAIGN_CHOICES.filter(id => {
        const action: CampaignAction = CAMPAIGN_ACTIONS[id];
        const home = PERSON_PLACES[person].home, point = COURTYARD[home.scene].anchors[home.anchor];
        if (action.atHome && Math.hypot(location.position.x - point.x, location.position.y - point.y) > INTERACTION_REACH) { return false; }
        return action.people.includes(person) && (action.fact === null || !facts.includes(action.fact)) && action.requires.every(f => facts.includes(f));
    });
}

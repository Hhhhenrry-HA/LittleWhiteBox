import type { GameServiceView } from '../application/service.js';
import type { GamePublicActivityRecord, GamePublicGameView } from '../../../domains/game/types.js';
import type { StoryReconciliationState } from '../../../host/story-reconciliation-runtime.js';
import type {
    GameActiveGameView,
    GameClientState,
    GameClientStatus,
    GameRecordDetailView,
    GameRecordPageView,
    GameRecordView,
} from '../types.js';

const GAME_LABELS = Object.freeze({
    dice: '秘骰对决',
    push: '翻倍或收手',
    ladder: '鎏金阶梯',
});

const OUTCOME_LABELS: Readonly<Record<string, string>> = Object.freeze({
    'player-win': '玩家胜出',
    'dealer-win': '庄家胜出',
    'cashed-out': '稳妥收手',
    busted: '触雷离场',
    cleared: '全程通关',
    failed: '挑战失利',
    capped: '抵达封顶',
});

function resolveStatus(
    view: GameServiceView,
    storyState: StoryReconciliationState,
    chatIdentity: string,
    economyReady: boolean,
): { status: GameClientStatus; message: string } {
    if (view.writeState === 'conflict') {
        return { status: 'conflict', message: '服务端数据与当前候选不一致，请刷新酒馆后再继续。' };
    }
    if (view.writeState === 'unconfirmed') {
        return { status: 'unconfirmed', message: '上一次保存结果尚未确认，赌局与资金写入已冻结。' };
    }
    if (view.writeState === 'saving') {
        return { status: 'saving', message: '正在确认赌局与账本保存结果…' };
    }
    if (storyState.identityKey === chatIdentity && storyState.status !== 'ready') {
        return { status: storyState.status, message: storyState.message };
    }
    if (!economyReady) {
        return { status: 'blocked', message: '钱包尚未完成开户，请重新读取。' };
    }
    return { status: 'ready', message: '' };
}

function presentActiveGame(game: GamePublicGameView | undefined): GameActiveGameView | null {
    if (!game) {return null;}
    if (game.kind === 'dice') {
        return {
            kind: 'dice',
            id: game.id,
            bet: game.bet,
            playerDice: [...game.playerDice],
            bids: game.bids.map((bid) => ({ count: bid.count, face: bid.face, by: bid.by })),
            legalActions: [...game.legalActions],
            legalBids: game.legalBids.map((bid) => ({ count: bid.count, face: bid.face })),
        };
    }
    if (game.kind === 'push') {
        return {
            kind: 'push',
            id: game.id,
            bet: game.bet,
            revealedCoins: game.revealedCoins,
            cashoutAmount: game.cashoutAmount,
            remainingCards: game.remainingCards,
            remainingBombs: game.remainingBombs,
            nextBombProbabilityBps: game.nextBombProbabilityBps,
            legalActions: [...game.legalActions],
        };
    }
    return {
        kind: 'ladder',
        id: game.id,
        bet: game.bet,
        riskBase: game.riskBase,
        completedFloors: game.completedFloors,
        cashoutAmount: game.cashoutAmount,
        canCashOut: game.canCashOut,
        steps: game.steps.map((step) => ({
            floor: step.floor,
            choice: step.choice,
            amountAfterSuccess: step.amountAfterSuccess,
        })),
        nextChoices: game.nextChoices.map((choice) => ({
            choice: choice.choice,
            successProbabilityBps: choice.successProbabilityBps,
            successAmount: choice.successAmount,
        })),
        legalActions: [...game.legalActions],
    };
}

function presentRecordDetail(record: GamePublicActivityRecord): GameRecordDetailView {
    const detail = record.detail;
    if (detail.kind === 'dice') {
        return {
            kind: 'dice',
            challenger: detail.challenger,
            finalBid: {
                count: detail.finalBid.count,
                face: detail.finalBid.face,
                by: detail.finalBid.by,
            },
            bids: detail.bids.map((bid) => ({ count: bid.count, face: bid.face, by: bid.by })),
            playerDice: [...detail.playerDice],
            matchingDiceCount: detail.matchingDiceCount,
        };
    }
    if (detail.kind === 'push') {
        return { kind: 'push', revealedCoins: detail.revealedCoins };
    }
    return {
        kind: 'ladder',
        steps: detail.steps.map((step) => ({
            floor: step.floor,
            choice: step.choice,
            success: step.success,
            amountAfterStep: step.amountAfterStep,
        })),
    };
}

function presentRecord(record: GamePublicActivityRecord): GameRecordView {
    const game = record.detail.kind;
    return {
        id: record.id,
        gameId: record.sourceId,
        game,
        gameLabel: GAME_LABELS[game],
        outcome: record.detail.outcome,
        outcomeLabel: OUTCOME_LABELS[record.detail.outcome] || record.detail.outcome,
        outcomeTone: record.net > 0 ? 'win' : record.net < 0 ? 'loss' : 'neutral',
        amountIn: record.amountIn,
        payout: record.payout,
        net: record.net,
        createdAt: record.createdAt,
        detail: presentRecordDetail(record),
    };
}

export function presentGameRecords(view: GameServiceView): GameRecordPageView {
    return {
        records: view.activities.map(presentRecord),
        offset: view.activityPage.offset,
        total: view.activityPage.total,
        hasMore: view.activityPage.hasMore,
    };
}

export function presentGameState({
    chatIdentity,
    serviceView,
    storyState,
    economyReady,
    generationActive,
}: {
    chatIdentity: string;
    serviceView: GameServiceView;
    storyState: StoryReconciliationState;
    economyReady: boolean;
    generationActive: boolean;
}): GameClientState {
    return {
        chatIdentity,
        currency: '小白币',
        balance: serviceView.balance,
        lockedAmount: serviceView.lockedAmount,
        revision: serviceView.revision,
        eventId: serviceView.eventId,
        ...resolveStatus(serviceView, storyState, chatIdentity, economyReady),
        generationActive,
        activeGame: presentActiveGame(serviceView.activeGame),
        ...presentGameRecords(serviceView),
    };
}

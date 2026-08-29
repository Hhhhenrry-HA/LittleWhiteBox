export interface FourthWallMessageData {
    role: 'user' | 'ai';
    content: string;
    ts: number;
    thinking?: string;
    type?: string;
}

export interface FourthWallSession {
    id: string;
    name: string;
    createdAt: number;
    history: FourthWallMessageData[];
}

export interface FourthWallChatState {
    settings: {
        maxChatLayers: number;
        maxMetaTurns: number;
        stream: boolean;
        disableAssistantPrefill: boolean;
    };
    sessions: FourthWallSession[];
    activeSessionId: string;
}

export interface FourthWallGlobalSettings {
    image: { enablePrompt: boolean };
    voice: { enabled: boolean };
    commentary: { enabled: boolean; probability: number };
    promptTemplates: {
        topuser: string;
        confirm: string;
        metaProtocol: string;
        bottom: string;
    };
}

export interface FourthWallClientState {
    chatIdentity: string;
    userName: string;
    characterName: string;
    userAvatar: string;
    characterAvatar: string;
    chat: FourthWallChatState;
    global: FourthWallGlobalSettings;
    capabilities: {
        image: { available: boolean };
        voice: { available: boolean };
    };
}

export interface FourthWallGenerationState {
    status: 'idle' | 'started' | 'progress' | 'error';
    sessionId: string;
    text: string;
    thinking: string;
    message: string;
    unsaved: boolean;
}

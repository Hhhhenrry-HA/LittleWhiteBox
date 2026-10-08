import { readFile } from 'node:fs/promises';
import { loadNarrativeCanon } from '../../apps/game/expedition/narrative/canon.ts';
import { estimateConversationTokens } from '../../../agent-core/runtime/context-tokens.js';

export const loadCanon = (person, signal) => loadNarrativeCanon(person, signal,
    name => readFile(new URL(`../../docs/expedition-cards/${name}.md`, import.meta.url), 'utf8'));
export const countTokens = async options => ({ tokens: estimateConversationTokens(options), source: 'estimated' });
export const narrativeOptions = { loadCanon, countTokens, received() {}, saveMemory: async () => {} };

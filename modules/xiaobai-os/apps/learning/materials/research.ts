import { isTavilyConfigured, searchWithTavily } from '../../../../agent-core/tavily-search.js';
import { safePromptJson } from '../../../capabilities/maintenance/prompt-safety.js';
import { learningRecord, learningText, LearningValidationError } from '../../../domains/learning/profile.js';
import { learningArray, learningId, learningInteger, requireLearning } from '../../../domains/learning/validation.js';
import type { createLearningSourceRegistry, LearningSource } from './lesson-sources.js';
import { extractLearningSources, LearningMaterialError, learningPublicUrl } from './tavily-extract.js';

export const LEARNING_RESEARCH_LIMITS = Object.freeze({ searches: 2, urls: 4, query: 400,
    results: 8, defaultResults: 5, source: 20_000, page: 4500, chunk: 500 });
const L = LEARNING_RESEARCH_LIMITS;
type Candidate = { id: string; url: string; title: string; summary: string };

function sourceParagraphs(text: string) {
    const paragraphs: LearningSource['paragraphs'] = [];
    let size = 0;
    const parts = text.split(/\r?\n\s*\r?\n/u).filter(part => part.trim());
    for (const part of parts) {
        const length = [...part].length + (paragraphs.length ? 2 : 0);
        if (size + length > L.source) { break; }
        paragraphs.push({ id: `p${paragraphs.length + 1}`, text: part });
        size += length;
    }
    return { paragraphs, truncated: paragraphs.length < parts.length };
}

function sourcePage(source: LearningSource, offset: number, truncated: boolean) {
    const chunks = source.paragraphs.flatMap((paragraph, index) => {
        const points = [...paragraph.text];
        return Array.from({ length: Math.ceil(points.length / L.chunk) }, (_, part) => ({
            paragraph: index + 1, id: paragraph.id, textOffset: part * L.chunk,
            text: points.slice(part * L.chunk, (part + 1) * L.chunk).join(''),
            paragraphComplete: (part + 1) * L.chunk >= points.length,
        }));
    });
    const base = { sourceId: source.id, url: source.url, title: source.title, retrievedAt: source.retrievedAt,
        paragraphCount: source.paragraphs.length, truncated };
    const paragraphs: typeof chunks = [];
    for (const chunk of chunks.slice(offset)) {
        if ([...safePromptJson({ ...base, paragraphs: [...paragraphs, chunk] })].length > L.page - 256) { break; }
        paragraphs.push(chunk);
    }
    const nextOffset = offset + paragraphs.length < chunks.length ? offset + paragraphs.length : null;
    requireLearning(nextOffset === null || paragraphs.length > 0, 'candidateIds', 'This source cannot fit a reading page; choose another article');
    return { ...base, paragraphs, nextOffset };
}

/** Search candidates and extracted sources live only for this teaching action. */
export function createLearningResearch(config: { tavilyApiKey?: string; tavilyBaseUrl?: string }, options: {
    sources: ReturnType<typeof createLearningSourceRegistry>; signal: AbortSignal;
    createId?: () => string; now?: () => string; timeoutMs?: number;
}) {
    const candidates = new Map<string, Candidate>();
    const extracted = new Map<string, { source: LearningSource; truncated: boolean }>();
    const createId = options.createId ?? (() => crypto.randomUUID());
    let searches = 0;
    let urls = 0;
    const available = isTavilyConfigured(config);
    async function search(args: unknown) {
        const input = learningRecord(args, 'LearningSearch', ['query', 'maxResults']);
        const query = learningText(input.query, 'query', L.query);
        const maxResults = learningInteger(input.maxResults ?? L.defaultResults, 'maxResults', 1, L.results);
        requireLearning(searches < L.searches, 'query', 'The search allowance for this teaching action has been used');
        searches++;
        const controller = new AbortController();
        const abort = () => controller.abort();
        options.signal.addEventListener('abort', abort, { once: true });
        const timer = setTimeout(abort, options.timeoutMs ?? 30_000);
        try {
            if (options.signal.aborted) { abort(); throw new LearningMaterialError('learning_research_cancelled'); }
            const results = await searchWithTavily(config, { query, maxResults, signal: controller.signal });
            if (controller.signal.aborted) { throw new LearningMaterialError('learning_search_timeout'); }
            const selected: Candidate[] = [];
            for (const result of results.slice(0, maxResults)) {
                let url;
                try { url = learningPublicUrl(result.url); } catch { continue; }
                if (url.length > 2048) { continue; }
                const candidate = { id: createId(), url, title: [...result.title].slice(0, 240).join(''),
                    summary: [...result.content].slice(0, 600).join('') };
                candidates.set(candidate.id, candidate);
                selected.push(candidate);
            }
            return { ok: true, results: selected, searchesRemaining: L.searches - searches };
        } catch {
            throw new LearningMaterialError(controller.signal.aborted ? 'learning_search_timeout' : 'learning_search_failed');
        } finally {
            clearTimeout(timer);
            options.signal.removeEventListener('abort', abort);
        }
    }
    async function extract(args: unknown) {
        const input = learningRecord(args, 'LearningExtract', ['candidateIds', 'offset']);
        const ids = learningArray(input.candidateIds, 'candidateIds', learningId, 2);
        requireLearning(ids.length > 0 && new Set(ids).size === ids.length, 'candidateIds', 'Choose one or two distinct search candidates');
        const offset = learningInteger(input.offset ?? 0, 'offset');
        const selected = ids.map(id => {
            const candidate = candidates.get(id);
            requireLearning(candidate, 'candidateIds', 'Choose an ID returned by LearningSearch in this action');
            return candidate;
        });
        const missing = selected.filter(candidate => !extracted.has(candidate.id));
        requireLearning(urls + missing.length <= L.urls, 'candidateIds', 'The article extraction allowance for this action has been used');
        const failed: { candidateId: string; error: string }[] = [];
        if (missing.length) {
            urls += missing.length;
            const received = await extractLearningSources(config, missing.map(candidate => candidate.url), options);
            if (options.signal.aborted) { throw new LearningMaterialError('learning_research_cancelled'); }
            for (const candidate of missing) {
                const text = received.results.find(result => result.url === candidate.url)?.text;
                const projected = sourceParagraphs(text ?? '');
                if (!projected.paragraphs.length) {
                    failed.push({ candidateId: candidate.id, error: 'learning_source_unavailable' });
                    continue;
                }
                const source = { id: createId(), url: candidate.url, title: candidate.title || candidate.url.slice(0, 240),
                    retrievedAt: (options.now ?? (() => new Date().toISOString()))(), paragraphs: projected.paragraphs };
                options.sources.add(source);
                extracted.set(candidate.id, { source, truncated: projected.truncated });
            }
        }
        return { ok: failed.length === 0, results: selected.flatMap(candidate => {
            const entry = extracted.get(candidate.id);
            return entry ? [{ candidateId: candidate.id, ...sourcePage(entry.source, offset, entry.truncated) }] : [];
        }), failed, urlsRemaining: L.urls - urls };
    }
    return {
        available,
        async executeTool(name: string, args: unknown): Promise<unknown> {
            try {
                requireLearning(available, 'tool', 'Configure the shared Tavily key in API settings to use web research');
                if (options.signal.aborted) { throw new LearningMaterialError('learning_research_cancelled'); }
                if (name === 'LearningSearch') { return await search(args); }
                if (name === 'LearningExtract') { return await extract(args); }
                throw new LearningMaterialError('learning_research_unknown_tool');
            } catch (error) {
                if (options.signal.aborted) { throw new LearningMaterialError('learning_research_cancelled'); }
                if (error instanceof LearningValidationError) { return { ok: false, error: 'invalid_arguments', path: error.path, message: error.message }; }
                return { ok: false, error: error instanceof LearningMaterialError ? error.code : 'learning_research_failed' };
            }
        },
    };
}

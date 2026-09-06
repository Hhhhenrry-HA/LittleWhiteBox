import { LEARNING_RESEARCH_LIMITS as L } from '../materials/research.js';

export function learningResearchTools() {
    return [
        { type: 'function', function: {
            name: 'LearningSearch',
            description: [
                'Search the public web for teaching materials or factual references. You choose the query from the current teaching need.',
                'Returns {ok,results:[{id,url,title,summary}],searchesRemaining}; on failure returns {ok:false,error,path?,message?}. Results are search summaries, not article text.',
                `Available with the shared Tavily key. At most ${L.searches} searches per teaching action; use LearningExtract to read a selected article.`,
            ].join('\n'),
            parameters: { type: 'object', properties: {
                query: { type: 'string', maxLength: L.query, description: 'A focused search query.' },
                maxResults: { type: 'integer', minimum: 1, maximum: L.results, description: `Default ${L.defaultResults}, maximum ${L.results}.` },
            }, required: ['query'], additionalProperties: false },
        } },
        { type: 'function', function: {
            name: 'LearningExtract',
            description: [
                'Read actual article text from search candidates. Successful sources can be used by LearningLessonEdit for original excerpts or teaching adaptations.',
                'Returns {ok,results,failed:[{candidateId,error}],urlsRemaining}. Each result contains candidateId, sourceId, url, title, retrievedAt, paragraphCount, truncated, paragraphs and nextOffset. Partial successes remain usable.',
                'Paragraph entries contain paragraph (1-based), id, textOffset, text and paragraphComplete. Assemble chunks with the same paragraph number in offset order. Only fully read ranges can support an excerpt.',
                `Each source retains up to ${L.source} code points in complete paragraphs; truncated marks omitted tail content. Each returned page is bounded to ${L.page} formatted code points.`,
                `At most ${L.urls} URL extractions per teaching action. Reading another page of a successful source uses the same in-memory text without another network request. Errors return {ok:false,error,path?,message?}.`,
                'Navigation, access notices and search summaries are not sufficient reading material. Select readable body paragraphs or try another source.',
            ].join('\n'),
            parameters: { type: 'object', properties: {
                candidateIds: { type: 'array', minItems: 1, maxItems: 2, items: { type: 'string' }, description: 'One or two IDs returned by LearningSearch in this action.' },
                offset: { type: 'integer', minimum: 0, description: 'Page offset, default 0. Follow nextOffset with that result’s candidate ID.' },
            }, required: ['candidateIds'], additionalProperties: false },
        } },
    ];
}

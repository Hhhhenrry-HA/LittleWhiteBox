import { AGENT_IMAGE_INPUT_COPY } from '../../../agent-core/config.js';

const API_ADDRESS_GUIDANCE = '找不到 API 接口，请检查 API 预设里的地址。';
const MISSING_ROUTE = /\b(?:route|endpoint|path)\s+(?:was\s+)?not found\b|\bcannot\s+post\s+\/|\b404 page not found\b/i;
const UNSUPPORTED_IMAGE_INPUT = /\b(?:model\b[^.\n]{0,80}\b(?:does not|doesn't) support (?:image inputs?|images?|vision)|(?:image inputs?|images?|vision)\s+(?:is|are)\s+not supported (?:by|for|on) (?:this|the|your) model|image_url is only supported by certain models)\b/i;

export function describeModelRequestFailure(failure, error, { requestHadImages } = {}) {
    if (!failure) return failure;
    const code = error?.error?.code ?? error?.code;
    const detail = String(error?.error?.message ?? error?.message ?? '');
    if (Number(error?.status) === 404 && (code === 'route_not_found' || code === 'endpoint_not_found'
        || MISSING_ROUTE.test(detail))) {
        return `${API_ADDRESS_GUIDANCE}\n\n${failure}`;
    }
    if (requestHadImages && (code === 'unsupported_image_input' || UNSUPPORTED_IMAGE_INPUT.test(detail))) {
        return `${failure}\n\n${AGENT_IMAGE_INPUT_COPY.requestFailed}`;
    }
    return failure;
}

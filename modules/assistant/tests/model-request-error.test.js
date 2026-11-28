import test from 'node:test';
import assert from 'node:assert/strict';
import { AGENT_IMAGE_INPUT_COPY } from '../../agent-core/config.js';
import { describeModelRequestFailure } from '../app-src/runtime/model-request-error.js';

test('an explicit missing route points to the API address and preserves the provider error', () => {
    const error = { status: 404, error: { message: 'Route not found' }, message: '404 Route not found' };
    for (const requestHadImages of [false, true]) {
        const notice = describeModelRequestFailure(error.message, error, { requestHadImages });
        assert.notEqual(notice, error.message);
        assert.ok(notice.endsWith(error.message));
        assert.ok(!notice.includes(AGENT_IMAGE_INPUT_COPY.requestFailed));
    }
});

test('only an image request explicitly rejected by the model receives image guidance', () => {
    const unsupported = { status: 400, message: 'This model does not support image inputs.' };
    const unknownModel = { status: 404, code: 'model_not_found', message: 'Model not found' };
    const invalidImage = { status: 400, code: 'invalid_image', message: 'Invalid image URL' };
    assert.ok(describeModelRequestFailure(unsupported.message, unsupported, { requestHadImages: true })
        .includes(AGENT_IMAGE_INPUT_COPY.requestFailed));
    assert.equal(describeModelRequestFailure(unsupported.message, unsupported), unsupported.message);
    for (const error of [unknownModel, invalidImage]) {
        assert.equal(describeModelRequestFailure(error.message, error, { requestHadImages: true }), error.message);
    }
});

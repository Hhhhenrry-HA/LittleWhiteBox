import { MemoryMaintenanceError } from './errors.js';

// Model/API argument formatting, not data migration. Business text and record IDs
// remain exact; only schema-unambiguous scalars and single-item lists are repaired.
export function normalizeToolArguments(value, schema) {
    if (schema.anyOf) {
        const collection = normalizeToolArguments(value?.collection, { type: 'string', enum: schema.anyOf.flatMap(item => item.properties.collection.enum) });
        const candidate = schema.anyOf.find(item => item.properties.collection.enum.includes(collection));
        return candidate ? normalizeToolArguments({ ...value, collection }, candidate) : value;
    }
    if (schema.type === 'object' && value && typeof value === 'object' && !Array.isArray(value)) {
        const result = Object.fromEntries(Object.entries(value).map(([key, item]) => [key,
            schema.properties[key] ? normalizeToolArguments(item, schema.properties[key]) : item]));
        for (const [key, field] of Object.entries(schema.properties)) {
            if (result[key] === undefined && field.default !== undefined) result[key] = field.default;
        }
        return result;
    }
    if (schema.type === 'array') {
        const items = Array.isArray(value) ? value : value != null && typeof value === schema.items.type ? [value]
            : schema.items.anyOf && value && typeof value === 'object' ? [value] : null;
        return items ? items.map(item => normalizeToolArguments(item, schema.items)) : value;
    }
    if (typeof value === 'string') {
        const text = value.trim();
        if (schema.type === 'integer' && /^[+-]?\d+$/u.test(text) && Number.isSafeInteger(Number(text))) return Number(text);
        if (schema.type === 'boolean' && /^(true|false)$/iu.test(text)) return text.toLowerCase() === 'true';
        if (schema.enum) return schema.enum.find(item => typeof item === 'string' && item.toLowerCase() === text.toLowerCase()) ?? value;
    }
    return value;
}

// Validate the same schema the model receives, including nested patch fields.
export function validateToolArguments(value, schema, field = '') {
    const expectedShape = schema.enum || Object.fromEntries(['type', 'minimum', 'maximum', 'maxItems', 'maxLength']
        .filter(key => schema[key] !== undefined).map(key => [key, schema[key]]));
    const fail = (code = 'invalid_arguments', path = field || 'arguments', expected = expectedShape) => {
        const error = new MemoryMaintenanceError(code, '', path);
        error.expected = expected;
        throw error;
    };
    if (schema.anyOf) {
        const candidate = schema.anyOf.find(item => item.properties.collection.enum.includes(value?.collection));
        if (!candidate) fail('invalid_arguments', `${field}.collection`, schema.anyOf.flatMap(item => item.properties.collection.enum));
        return validateToolArguments(value, candidate, field);
    }
    if (schema.type === 'object') {
        if (!value || typeof value !== 'object' || Array.isArray(value)) fail();
        for (const key of schema.required || []) if (!Object.hasOwn(value, key)) fail('invalid_arguments', field ? `${field}.${key}` : key, schema.properties[key].type);
        for (const [key, item] of Object.entries(value)) {
            const path = field ? `${field}.${key}` : key;
            if (!Object.hasOwn(schema.properties, key)) fail('invalid_field', path, Object.keys(schema.properties));
            validateToolArguments(item, schema.properties[key], path);
        }
    } else if (schema.type === 'array') {
        if (!Array.isArray(value) || (schema.maxItems != null && value.length > schema.maxItems)) fail();
        value.forEach((item, index) => validateToolArguments(item, schema.items, `${field}[${index}]`));
    } else if (schema.type === 'integer') {
        if (!Number.isInteger(value) || value < (schema.minimum ?? -Infinity) || value > (schema.maximum ?? Infinity)) fail();
    } else if (typeof value !== schema.type) fail();
    if (schema.enum && !schema.enum.includes(value)) fail();
    if (schema.maxLength != null && value.length > schema.maxLength) fail();
}

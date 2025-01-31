import { reqStreamApiRule } from './rules/req-stream-api';

export const plugin = {
    meta: {
        name: 'eslint-plugin',
    },
    rules: {
        'req-stream-api': reqStreamApiRule,
    },
};

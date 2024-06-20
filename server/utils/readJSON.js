import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

export function readJSON(json) {
    const JSON = require(json);
    return JSON;
}
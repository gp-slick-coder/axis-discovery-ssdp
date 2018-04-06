"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
function log(formatter, ...args) {
    logger(formatter, ...args);
}
exports.log = log;
const logger = debug('axis-discovery-ssdp');
//# sourceMappingURL=Log.js.map
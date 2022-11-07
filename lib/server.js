"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
// https://github.com/visionmedia/debug
const debug = require("debug");
debug.enable('*');
const discovery = new _1.Discovery();
discovery.on('hello', (device) => {
    console.log(`${new Date().toLocaleTimeString()} - Hello from ${device.friendlyName} on ${device.address}`);
    console.log(`\tmodel: ${device.modelName}`);
    console.log(`\tport: ${device.port}`);
    // console.log('Full data', JSON.stringify(device));
});
discovery.on('goodbye', (device) => {
    console.log(`${new Date().toLocaleTimeString()} - Goodbye from ${device.macAddress} on ${device.address}`);
});
discovery.start().then(() => discovery.search());
//# sourceMappingURL=server.js.map
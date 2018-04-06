"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timers_1 = require("timers");
const _1 = require("./");
// https://github.com/visionmedia/debug
const debug = require("debug");
debug.enable('*');
const discovery = new _1.Discovery();
discovery.onHello((device) => {
    console.log(`${new Date().toLocaleTimeString()} - Hello from ${device.friendlyName} on ${device.address}`);
    console.log(`\tmodel: ${device.modelName}`);
    // console.log('Full data', JSON.stringify(device));
});
discovery.onGoodbye((device) => {
    console.log(`${new Date().toLocaleTimeString()} - Goodbye from ${device.macAddress} on ${device.address}`);
});
discovery.start()
    .then(() => discovery.search());
timers_1.setTimeout(() => {
    discovery.stop();
}, 3000);
//# sourceMappingURL=server.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIPv4Addresses = void 0;
const os_1 = require("os");
/**
 * Returns all public IPv4 addresses from all network interfaces.
 */
function getIPv4Addresses() {
    const interfaces = os_1.networkInterfaces();
    const addresses = [];
    Object.keys(interfaces).forEach((interfaceIndex) => {
        var _a;
        for (const address of (_a = interfaces[interfaceIndex]) !== null && _a !== void 0 ? _a : []) {
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    });
    return addresses;
}
exports.getIPv4Addresses = getIPv4Addresses;
//# sourceMappingURL=NetworkInterface.js.map
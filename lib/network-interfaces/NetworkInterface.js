"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
/**
 * Returns all public IPv4 addresses from all network interfaces.
 */
function getIPv4Addresses() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    Object.keys(interfaces).forEach((interfaceIndex) => {
        for (const address of interfaces[interfaceIndex]) {
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    });
    return addresses;
}
exports.getIPv4Addresses = getIPv4Addresses;
//# sourceMappingURL=NetworkInterface.js.map
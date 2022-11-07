"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapFromMessage = void 0;
const __1 = require("./..");
/**
 * Maps a SSDP message to a device.
 */
function mapFromMessage(message) {
    const macAddressMatch = macAddressRegExp.exec(message.usn);
    if (macAddressMatch == null) {
        return null;
    }
    const macAddress = macAddressMatch[1].toUpperCase();
    return new __1.Device(message.remoteAddress, undefined, macAddress, undefined, undefined, undefined, undefined, undefined);
}
exports.mapFromMessage = mapFromMessage;
const macAddressRegExp = /^uuid:[.]*(.+)::.*$/i;
//# sourceMappingURL=Mappings.js.map
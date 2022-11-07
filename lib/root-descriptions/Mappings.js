"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapFromRootDescription = void 0;
const __1 = require("./..");
/**
 * Maps a root description to a device.
 */
function mapFromRootDescription(rootDescription) {
    // this is not available on generic upnp devices
    // if (rootDescription.macAddress === undefined) {
    //     return null;
    // }
    return new __1.Device(rootDescription.remoteAddress, parsePort(rootDescription.remoteAddress), rootDescription.macAddress, rootDescription.friendlyName, rootDescription.modelName, rootDescription.modelDescription, rootDescription.modelNumber, rootDescription.presentationUrl);
}
exports.mapFromRootDescription = mapFromRootDescription;
const portFromPresentationUrlRegExp = /:(\d+)\/?$/i;
function parsePort(presentationUrl) {
    if (presentationUrl === undefined) {
        return undefined;
    }
    const portMatch = portFromPresentationUrlRegExp.exec(presentationUrl);
    if (portMatch == null) {
        return undefined;
    }
    return Number(portMatch[1]);
}
//# sourceMappingURL=Mappings.js.map
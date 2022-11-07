"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootDescription = void 0;
const xml2js_1 = require("xml2js");
class RootDescription {
    constructor(remoteAddress, rootDescription) {
        this.remoteAddress = remoteAddress;
        this.rootDescription = rootDescription;
    }
    static parse(remoteAddress, xml) {
        return new Promise((resolve, reject) => {
            xml2js_1.parseString(xml, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(new RootDescription(remoteAddress, result));
                }
            });
        });
    }
    get friendlyName() {
        return this.rootDescription['root']['device'][0]['friendlyName'][0];
    }
    get modelDescription() {
        if (!this.rootDescription['root']['device'][0]['modelDescription']) {
            return undefined;
        }
        return this.rootDescription['root']['device'][0]['modelDescription'][0];
    }
    get modelName() {
        return this.rootDescription['root']['device'][0]['modelName'][0];
    }
    get modelNumber() {
        if (!this.rootDescription['root']['device'][0]['modelNumber']) {
            return undefined;
        }
        return this.rootDescription['root']['device'][0]['modelNumber'][0];
    }
    get macAddress() {
        // This package is opinionated regarding the terms 'serial number' and
        // 'MAC address'. What the devices are calling 'serial numbers' are
        // actually 'MAC addresses', so lets call them for what they are...
        if (!this.rootDescription['root']['device'][0]['serialNumber']) {
            return undefined;
        }
        return this.rootDescription['root']['device'][0]['serialNumber'][0].toUpperCase();
    }
    get presentationUrl() {
        if (!this.rootDescription['root']['device'][0]['presentationURL']) {
            return undefined;
        }
        return this.rootDescription['root']['device'][0]['presentationURL'][0];
    }
}
exports.RootDescription = RootDescription;
//# sourceMappingURL=RootDescription.js.map
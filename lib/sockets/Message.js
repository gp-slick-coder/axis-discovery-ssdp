"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
/**
 * Class describing a received SSDP message.
 */
class Message {
    constructor(remoteAddress, message) {
        this.remoteAddress = remoteAddress;
        this.headers = {};
        this.parseHeaders(message);
    }
    /**
     * Gets the HTTP method.
     */
    get method() {
        return this.headers['method'];
    }
    /**
     * Gets the URL to the UPnP description of the root device.
     */
    get location() {
        return this.getHeaderValue('LOCATION');
    }
    /**
     * Gets the Unique Service Name (USN) header.
     */
    get usn() {
        return this.getHeaderValue('USN');
    }
    /**
     * Gets the Notification Type (NT) header.
     */
    get nt() {
        return this.getHeaderValue('NT');
    }
    /**
     * Gets the Notification Sub Type (NTS).
     */
    get nts() {
        return this.getHeaderValue('NTS');
    }
    parseHeaders(message) {
        const headers = message.toString().trim().split('\r\n');
        const method = headers.shift();
        if (method === undefined) {
            throw new Error('SSDP message is not specifying the method.');
        }
        this.headers['method'] = method;
        for (const header of headers) {
            const indexOfValueSeparator = header.indexOf(':');
            const name = header.slice(0, indexOfValueSeparator).trim();
            const value = header.slice(indexOfValueSeparator + 1, header.length).trim();
            this.headers[name] = value;
        }
    }
    getHeaderValue(headerName) {
        const headerValue = this.headers[headerName];
        if (!headerValue) {
            throw new Error(`Header with name ${headerName} does not exist.`);
        }
        return headerValue;
    }
}
exports.Message = Message;
//# sourceMappingURL=Message.js.map
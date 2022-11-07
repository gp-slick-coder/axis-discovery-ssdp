"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSearch = void 0;
/**
 * Class describing the wish to discover available services on a network. A
 * response to such search request is sent via unicast addressing to the
 * originating address and port number of the multicast request.
 */
class MSearch {
    constructor(target) {
        this.target = target;
        this.query = 'M-SEARCH * HTTP/1.1\r\n' +
            'Host:239.255.255.250:1900\r\n' +
            'ST:' + this.target + '\r\n' +
            'Man:"ssdp:discover"\r\n' +
            'MX:3\r\n' +
            '\r\n';
    }
    /**
     * Converts the M-SEARCH request into a buffer.
     */
    toBuffer() {
        return Buffer.from(this.query);
    }
}
exports.MSearch = MSearch;
//# sourceMappingURL=MSearch.js.map
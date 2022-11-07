"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSearchSocket = void 0;
const expect = require("@fantasticfiasco/expect");
const logging_1 = require("../logging");
const Constants_1 = require("./Constants");
const Message_1 = require("./Message");
const MSearch_1 = require("./MSearch");
const SocketBase_1 = require("./SocketBase");
/**
 * Class representing a SSDP socket that support the HTTP method M-SEARCH.
 */
class MSearchSocket extends SocketBase_1.SocketBase {
    /**
     * @param address The network address to listen for M-SEARCH responses on.
     */
    constructor(address) {
        super();
        this.address = address;
    }
    /**
     * Starts a search by using HTTP method M-SEARCH.
     */
    search(target) {
        logging_1.log('MSearchSocket#search - %s', this.address);
        const message = new MSearch_1.MSearch(target).toBuffer();
        return new Promise((resolve, reject) => {
            if (!this.socket) {
                reject(new Error('Socket has never been started'));
                return;
            }
            this.socket.send(message, 0, message.length, Constants_1.SSDP_PORT, Constants_1.SSDP_MULTICAST_ADDRESS, (error) => {
                if (error) {
                    logging_1.log('MSearchSocket#search - %o', error);
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
    onListening() {
        expect.toExist(this.socket, 'M-SEARCH socket has never been started');
        logging_1.log('MSearchSocket#onListening - %s:%d', this.socket.address().address, this.socket.address().port);
    }
    onMessage(messageBuffer, remote) {
        const message = new Message_1.Message(remote.address, messageBuffer);
        if (message.method !== 'HTTP/1.1 200 OK') {
            return;
        }
        this.emit('hello', message);
    }
    bind() {
        expect.toExist(this.socket, 'M-SEARCH socket has never been started');
        return new Promise((resove) => {
            this.socket.bind(undefined, this.address, () => resove());
        });
    }
}
exports.MSearchSocket = MSearchSocket;
//# sourceMappingURL=MSearchSocket.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifySocket = void 0;
const expect = require("@fantasticfiasco/expect");
const logging_1 = require("../logging");
const Constants_1 = require("./Constants");
const Message_1 = require("./Message");
const SocketBase_1 = require("./SocketBase");
/**
 * Class representing a SSDP socket that support the HTTP method NOTIFY.
 */
class NotifySocket extends SocketBase_1.SocketBase {
    /**
     * @param addresses The network addresses to listen for NOTIFY
     * advertisements on.
     */
    constructor(addresses) {
        super();
        this.addresses = addresses;
    }
    onListening() {
        expect.toExist(this.socket, 'Notify socket has never been started');
        logging_1.log('NotifySocket#onListening - %s:%d', this.socket.address().address, this.socket.address().port);
        for (const address of this.addresses) {
            logging_1.log('NotifySocket#onListening - add membership to %s', address);
            try {
                this.socket.addMembership(Constants_1.SSDP_MULTICAST_ADDRESS, address);
            }
            catch (error) {
                logging_1.log('NotifySocket#onListening - %o', error);
            }
        }
    }
    onMessage(messageBuffer, remote) {
        const message = new Message_1.Message(remote.address, messageBuffer);
        if (message.method !== 'NOTIFY * HTTP/1.1') {
            return;
        }
        if (message.nts === 'ssdp:alive') {
            this.emit('hello', message);
        }
        else if (message.nts === 'ssdp:byebye') {
            this.emit('goodbye', message);
        }
    }
    bind() {
        expect.toExist(this.socket, 'Notify socket has never been started');
        return new Promise((resolve) => {
            this.socket.bind(Constants_1.SSDP_PORT, undefined, () => resolve());
        });
    }
}
exports.NotifySocket = NotifySocket;
//# sourceMappingURL=NotifySocket.js.map
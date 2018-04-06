"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const expect = require("@fantasticfiasco/expect");
const dgram = require("dgram");
const events = require("events");
const logging_1 = require("../logging");
class SocketBase extends events.EventEmitter {
    /**
     * Start listen for advertisements.
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            expect.toNotExist(this.socket, 'M-SEARCH socket has already been started');
            this.socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });
            this.socket.on('listening', () => this.onListening());
            this.socket.on('message', (message, remote) => this.onMessage(message, remote));
            this.socket.on('error', (error) => this.onError(error));
            yield this.bind();
        });
    }
    /**
     * Stop listen for advertisements.
     */
    stop() {
        expect.toExist(this.socket, 'M-SEARCH socket has never been started');
        return new Promise((resolve) => {
            this.socket.close(() => resolve());
        });
    }
    onError(error) {
        logging_1.log('SocketBase#onError - %o', error);
    }
}
exports.SocketBase = SocketBase;
//# sourceMappingURL=SocketBase.js.map
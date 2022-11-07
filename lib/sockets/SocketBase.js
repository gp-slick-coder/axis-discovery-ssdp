"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketBase = void 0;
const expect = require("@fantasticfiasco/expect");
const dgram_1 = require("dgram");
const events_1 = require("events");
const logging_1 = require("../logging");
class SocketBase extends events_1.EventEmitter {
    /**
     * Start listen for advertisements.
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            expect.toNotExist(this.socket, 'Socket has already been started');
            this.socket = dgram_1.createSocket({ type: 'udp4', reuseAddr: true });
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
        expect.toExist(this.socket, 'Socket has never been started');
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
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
const events = require("events");
const logging_1 = require("./logging");
const network_interfaces_1 = require("./network-interfaces");
const options_1 = require("./options");
const root_descriptions_1 = require("./root-descriptions");
const sockets_1 = require("./sockets");
/**
 * Class responsible for discovering Axis cameras on the network.
 */
class Discovery {
    /**
     * Initializes a new instance of the class.
     * @param options The SSDP discovery options.
     */
    constructor(options) {
        this.eventEmitter = new events.EventEmitter();
        this.options = options || {};
    }
    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            expect.toNotExist(this.sockets, 'Discovery has already been started');
            logging_1.log('Discovery#start');
            yield this.setup();
        });
    }
    /**
     * Stop listening for device advertisements.
     */
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            expect.toExist(this.sockets, 'Discovery has not been started');
            logging_1.log('Discovery#stop');
            yield this.teardown();
        });
    }
    /**
     * Triggers a new search for devices on the network.
     */
    search(target) {
        return __awaiter(this, void 0, void 0, function* () {
            expect.toExist(this.sockets, 'Discovery has not been started');
            const t = target ? target : 'ssdp:all';
            logging_1.log('Discovery#search');
            for (const socket of this.sockets) {
                if (socket instanceof sockets_1.MSearchSocket) {
                    yield socket.search(t);
                }
            }
        });
    }
    /**
     * Register a callback that is invoked when a device is found on the
     * network.
     */
    onHello(callback) {
        this.eventEmitter.on('hello', (device) => callback(device));
    }
    /**
     * Register a callback that is invoked when a device intentionally is
     * disconnecting from the network.
     */
    onGoodbye(callback) {
        this.eventEmitter.on('goodbye', (device) => callback(device));
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sockets = [];
            const addresses = network_interfaces_1.getIPv4Addresses();
            logging_1.log('Discovery#setup - interface addresses: %o', addresses);
            // Passive SSDP
            yield this.setupSocket(new sockets_1.NotifySocket(addresses));
            // Active SSDP
            for (const address of addresses) {
                yield this.setupSocket(new sockets_1.MSearchSocket(address));
            }
        });
    }
    setupSocket(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sockets.push(socket);
            socket.on('hello', (message) => this.onHelloMessage(message));
            socket.on('goodbye', (message) => this.onGoodbyeMessage(message));
            yield socket.start();
        });
    }
    teardown() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const socket of this.sockets) {
                this.teardownSocket(socket);
            }
            this.sockets = undefined;
        });
    }
    teardownSocket(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            socket.removeAllListeners('hello');
            socket.removeAllListeners('goodbye');
            yield socket.stop();
        });
    }
    onHelloMessage(message) {
        logging_1.log('Discovery#onHelloMessage - %s', message.remoteAddress);
        const device = sockets_1.mapFromMessage(message);
        if (device) {
            // Request root description
            this.requestRootDescription(message.remoteAddress, message.location);
        }
        else {
            logging_1.log('Discovery#onHelloMessage - ignore %s since mapping was unsuccessful', message.remoteAddress);
        }
    }
    onGoodbyeMessage(message) {
        logging_1.log('Discovery#onGoodbyeMessage - %s', message.remoteAddress);
        const device = sockets_1.mapFromMessage(message);
        if (device) {
            this.eventEmitter.emit('goodbye', device);
        }
        else {
            logging_1.log('Discovery#onGoodbyeMessage - ignore %s since mapping was unsuccessful', message.remoteAddress);
        }
    }
    requestRootDescription(remoteAddress, location) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const httpClient = this.options.httpClient || new options_1.HttpClient();
                const rootDescriptionRequest = new root_descriptions_1.RootDescriptionRequest(remoteAddress, location, httpClient);
                const rootDescription = yield rootDescriptionRequest.send();
                const device = root_descriptions_1.mapFromRootDescription(rootDescription);
                if (device !== null) {
                    this.eventEmitter.emit('hello', device);
                }
            }
            catch (error) {
                logging_1.log('Discovery#requestRootDescription - %o', error);
            }
        });
    }
}
exports.Discovery = Discovery;
//# sourceMappingURL=Discovery.js.map
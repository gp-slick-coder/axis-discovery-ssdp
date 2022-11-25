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
exports.Discovery = void 0;
const expect = require("@fantasticfiasco/expect");
const events_1 = require("events");
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
        this.eventEmitter = new events_1.EventEmitter();
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
     * Alias for on(eventName, listener).
     */
    addListener(eventName, listener) {
        this.eventEmitter.addListener(eventName, listener);
        return this;
    }
    /**
     * Adds the listener function to the end of the listeners array for the event named eventName.
     * No checks are made to see if the listener has already been added. Multiple calls passing the
     * same combination of eventName and listener will result in the listener being added, and
     * called, multiple times.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    on(eventName, listener) {
        this.eventEmitter.on(eventName, listener);
        return this;
    }
    /**
     * Adds a one-time listener function for the event named eventName. The next time eventName is
     * triggered, this listener is removed and then invoked.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    once(eventName, listener) {
        this.eventEmitter.once(eventName, listener);
        return this;
    }
    /**
     * Alias for off(eventName, listener).
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    removeListener(eventName, listener) {
        this.eventEmitter.removeListener(eventName, listener);
        return this;
    }
    /**
     * Removes the specified listener from the listener array for the event named eventName.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    off(eventName, listener) {
        this.eventEmitter.off(eventName, listener);
        return this;
    }
    /**
     * Removes all listeners, or those of the specified eventName.
     * @param eventName The name of the event.
     */
    removeAllListeners(eventName) {
        this.eventEmitter.removeAllListeners(eventName);
        return this;
    }
    /**
     * By default EventEmitters will print a warning if more than 10 listeners are added for a
     * particular event. This is a useful default that helps finding memory leaks. The
     * emitter.setMaxListeners() method allows the limit to be modified for this specific
     * EventEmitter instance. The value can be set to Infinity (or 0) to indicate an unlimited
     * number of listeners.
     */
    setMaxListeners(n) {
        this.eventEmitter.setMaxListeners(n);
        return this;
    }
    /**
     * Returns the current max listener value for the EventEmitter which is either set by
     * emitter.setMaxListeners(n) or defaults to EventEmitter.defaultMaxListeners.
     */
    getMaxListeners() {
        return this.eventEmitter.getMaxListeners();
    }
    /**
     * Returns a copy of the array of listeners for the event named eventName.
     * @param eventName The name of the event.
     */
    // tslint:disable-next-line:ban-types
    listeners(eventName) {
        return this.eventEmitter.listeners(eventName);
    }
    /**
     * Returns a copy of the array of listeners for the event named eventName, including any
     * wrappers (such as those created by once()).
     * @param eventName The name of the event.
     */
    // tslint:disable-next-line:ban-types
    rawListeners(eventName) {
        return this.eventEmitter.rawListeners(eventName);
    }
    /**
     * Synchronously calls each of the listeners registered for the event named eventName, in the
     * order they were registered, passing the supplied arguments to each.
     * @param eventName The name of the event.
     */
    emit(eventName, args) {
        return this.eventEmitter.emit(eventName, args);
    }
    /**
     * Returns the number of listeners listening to the event named eventName.
     * @param eventName The name of the event.
     */
    listenerCount(eventName) {
        return this.eventEmitter.listenerCount(eventName);
    }
    /**
     * Adds the listener function to the beginning of the listeners array for the event named
     * eventName. No checks are made to see if the listener has already been added. Multiple calls
     * passing the same combination of eventName and listener will result in the listener being
     * added, and called, multiple times.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    prependListener(eventName, listener) {
        this.eventEmitter.prependListener(eventName, listener);
        return this;
    }
    /**
     * Adds a one-time listener function for the event named eventName to the beginning of the
     * listeners array. The next time eventName is triggered, this listener is removed, and then
     * invoked.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    prependOnceListener(eventName, listener) {
        this.eventEmitter.prependOnceListener(eventName, listener);
        return this;
    }
    /**
     * Returns an array listing the events for which the emitter has registered listeners. The
     * values in the array are strings or Symbols.
     */
    eventNames() {
        return this.eventEmitter.eventNames();
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
            // Emit initial hello
            this.eventEmitter.emit('hello', device);
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
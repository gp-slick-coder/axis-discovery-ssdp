/// <reference types="node" />
import { EventEmitter } from 'events';
import { Device } from './';
import { IOptions } from './options';
/**
 * Interface describing the supported events of Discovery.
 */
interface Events {
    hello: Device;
    goodbye: Device;
}
/**
 * Class responsible for discovering Axis cameras on the network.
 */
export declare class Discovery implements EventEmitter {
    private readonly eventEmitter;
    private readonly options;
    private sockets?;
    /**
     * Initializes a new instance of the class.
     * @param options The SSDP discovery options.
     */
    constructor(options?: IOptions);
    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    start(): Promise<void>;
    /**
     * Stop listening for device advertisements.
     */
    stop(): Promise<void>;
    /**
     * Triggers a new search for devices on the network.
     */
    search(target?: string): Promise<void>;
    /**
     * Alias for on(eventName, listener).
     */
    addListener<E extends keyof Events>(eventName: E, listener: (arg: Events[E]) => void): this;
    /**
     * Adds the listener function to the end of the listeners array for the event named eventName.
     * No checks are made to see if the listener has already been added. Multiple calls passing the
     * same combination of eventName and listener will result in the listener being added, and
     * called, multiple times.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    on<E extends keyof Events>(eventName: E, listener: (arg: Events[E]) => void): this;
    /**
     * Adds a one-time listener function for the event named eventName. The next time eventName is
     * triggered, this listener is removed and then invoked.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    once<E extends keyof Events>(eventName: E, listener: (arg: Events[E]) => void): this;
    /**
     * Alias for off(eventName, listener).
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    removeListener<E extends keyof Events>(eventName: E, listener: (arg: Events[E]) => void): this;
    /**
     * Removes the specified listener from the listener array for the event named eventName.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    off<E extends keyof Events>(eventName: E, listener: (arg: Events[E]) => void): this;
    /**
     * Removes all listeners, or those of the specified eventName.
     * @param eventName The name of the event.
     */
    removeAllListeners<E extends keyof Events>(eventName?: E): this;
    /**
     * By default EventEmitters will print a warning if more than 10 listeners are added for a
     * particular event. This is a useful default that helps finding memory leaks. The
     * emitter.setMaxListeners() method allows the limit to be modified for this specific
     * EventEmitter instance. The value can be set to Infinity (or 0) to indicate an unlimited
     * number of listeners.
     */
    setMaxListeners(n: number): this;
    /**
     * Returns the current max listener value for the EventEmitter which is either set by
     * emitter.setMaxListeners(n) or defaults to EventEmitter.defaultMaxListeners.
     */
    getMaxListeners(): number;
    /**
     * Returns a copy of the array of listeners for the event named eventName.
     * @param eventName The name of the event.
     */
    listeners<E extends keyof Events>(eventName: E): Function[];
    /**
     * Returns a copy of the array of listeners for the event named eventName, including any
     * wrappers (such as those created by once()).
     * @param eventName The name of the event.
     */
    rawListeners<E extends keyof Events>(eventName: E): Function[];
    /**
     * Synchronously calls each of the listeners registered for the event named eventName, in the
     * order they were registered, passing the supplied arguments to each.
     * @param eventName The name of the event.
     */
    emit<E extends keyof Events>(eventName: E, args: Events[E]): boolean;
    /**
     * Returns the number of listeners listening to the event named eventName.
     * @param eventName The name of the event.
     */
    listenerCount<E extends keyof Events>(eventName: E): number;
    /**
     * Adds the listener function to the beginning of the listeners array for the event named
     * eventName. No checks are made to see if the listener has already been added. Multiple calls
     * passing the same combination of eventName and listener will result in the listener being
     * added, and called, multiple times.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    prependListener<E extends keyof Events>(eventName: E, listener: (arg: Events[E]) => void): this;
    /**
     * Adds a one-time listener function for the event named eventName to the beginning of the
     * listeners array. The next time eventName is triggered, this listener is removed, and then
     * invoked.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    prependOnceListener<E extends keyof Events>(eventName: E, listener: (arg: Events[E]) => void): this;
    /**
     * Returns an array listing the events for which the emitter has registered listeners. The
     * values in the array are strings or Symbols.
     */
    eventNames(): (string | symbol)[];
    private setup;
    private setupSocket;
    private teardown;
    private teardownSocket;
    private onHelloMessage;
    private onGoodbyeMessage;
    private requestRootDescription;
}
export {};
//# sourceMappingURL=Discovery.d.ts.map
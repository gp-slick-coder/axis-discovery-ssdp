/// <reference types="node" />
import * as dgram from 'dgram';
import * as events from 'events';
export declare abstract class SocketBase extends events.EventEmitter {
    protected socket: dgram.Socket;
    /**
     * Start listen for advertisements.
     */
    start(): Promise<void>;
    /**
     * Stop listen for advertisements.
     */
    stop(): Promise<void>;
    protected abstract onListening(): void;
    protected abstract onMessage(messageBuffer: Buffer, remote: dgram.AddressInfo): void;
    protected abstract bind(): Promise<void>;
    protected onError(error: Error): void;
}

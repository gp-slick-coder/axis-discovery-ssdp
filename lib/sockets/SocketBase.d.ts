/// <reference types="node" />
import { Socket } from 'dgram';
import { EventEmitter } from 'events';
import { AddressInfo } from 'net';
export declare abstract class SocketBase extends EventEmitter {
    protected socket?: Socket;
    /**
     * Start listen for advertisements.
     */
    start(): Promise<void>;
    /**
     * Stop listen for advertisements.
     */
    stop(): Promise<void>;
    protected abstract onListening(): void;
    protected abstract onMessage(messageBuffer: Buffer, remote: AddressInfo): void;
    protected abstract bind(): Promise<void>;
    protected onError(error: Error): void;
}
//# sourceMappingURL=SocketBase.d.ts.map
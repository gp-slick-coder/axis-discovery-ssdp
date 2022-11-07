/// <reference types="node" />
import { AddressInfo } from 'net';
import { SocketBase } from './SocketBase';
/**
 * Class representing a SSDP socket that support the HTTP method NOTIFY.
 */
export declare class NotifySocket extends SocketBase {
    private readonly addresses;
    /**
     * @param addresses The network addresses to listen for NOTIFY
     * advertisements on.
     */
    constructor(addresses: string[]);
    protected onListening(): void;
    protected onMessage(messageBuffer: Buffer, remote: AddressInfo): void;
    protected bind(): Promise<void>;
}
//# sourceMappingURL=NotifySocket.d.ts.map
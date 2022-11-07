/// <reference types="node" />
import { AddressInfo } from 'net';
import { SocketBase } from './SocketBase';
/**
 * Class representing a SSDP socket that support the HTTP method M-SEARCH.
 */
export declare class MSearchSocket extends SocketBase {
    private address;
    /**
     * @param address The network address to listen for M-SEARCH responses on.
     */
    constructor(address: string);
    /**
     * Starts a search by using HTTP method M-SEARCH.
     */
    search(target: string): Promise<void>;
    protected onListening(): void;
    protected onMessage(messageBuffer: Buffer, remote: AddressInfo): void;
    protected bind(): Promise<void>;
}
//# sourceMappingURL=MSearchSocket.d.ts.map
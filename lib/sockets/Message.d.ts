/// <reference types="node" />
/**
 * Class describing a received SSDP message.
 */
export declare class Message {
    readonly remoteAddress: string;
    private readonly headers;
    constructor(remoteAddress: string, message: Buffer);
    /**
     * Gets the HTTP method.
     */
    get method(): string;
    /**
     * Gets the URL to the UPnP description of the root device.
     */
    get location(): string;
    /**
     * Gets the Unique Service Name (USN) header.
     */
    get usn(): string;
    /**
     * Gets the Notification Type (NT) header.
     */
    get nt(): string;
    /**
     * Gets the Notification Sub Type (NTS).
     */
    get nts(): string;
    private parseHeaders;
    private getHeaderValue;
}
//# sourceMappingURL=Message.d.ts.map
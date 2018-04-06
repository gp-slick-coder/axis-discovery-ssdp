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
    readonly method: string;
    /**
     * Gets the URL to the UPnP description of the root device.
     */
    readonly location: string;
    /**
     * Gets the Unique Service Name (USN) header.
     */
    readonly usn: string;
    /**
     * Gets the Notification Type (NT) header.
     */
    readonly nt: string;
    /**
     * Gets the Notification Sub Type (NTS).
     */
    readonly nts: string;
    private parseHeaders(message);
    private getHeaderValue(headerName);
}

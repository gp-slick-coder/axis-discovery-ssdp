/// <reference types="node" />
/**
 * Class describing the wish to discover available services on a network. A
 * response to such search request is sent via unicast addressing to the
 * originating address and port number of the multicast request.
 */
export declare class MSearch {
    private target;
    private query;
    constructor(target: string);
    /**
     * Converts the M-SEARCH request into a buffer.
     */
    toBuffer(): Buffer;
}
//# sourceMappingURL=MSearch.d.ts.map
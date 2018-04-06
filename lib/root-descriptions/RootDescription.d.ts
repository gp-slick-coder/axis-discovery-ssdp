export declare class RootDescription {
    readonly remoteAddress: string;
    private readonly rootDescription;
    private constructor();
    static parse(remoteAddress: string, xml: string): Promise<RootDescription>;
    readonly friendlyName: string;
    readonly modelDescription: string | undefined;
    readonly modelName: string;
    readonly modelNumber: string | undefined;
    readonly macAddress: string | undefined;
    readonly presentationUrl: string | undefined;
}

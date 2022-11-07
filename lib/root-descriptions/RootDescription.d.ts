export declare class RootDescription {
    readonly remoteAddress: string;
    private readonly rootDescription;
    private constructor();
    static parse(remoteAddress: string, xml: string): Promise<RootDescription>;
    get friendlyName(): string;
    get modelDescription(): string | undefined;
    get modelName(): string;
    get modelNumber(): string | undefined;
    get macAddress(): string | undefined;
    get presentationUrl(): string | undefined;
}
//# sourceMappingURL=RootDescription.d.ts.map
import { IHttpClient } from '../options';
import { RootDescription } from './RootDescription';
export declare class RootDescriptionRequest {
    private readonly remoteAddress;
    private readonly location;
    private readonly httpClient;
    constructor(remoteAddress: string, location: string, httpClient: IHttpClient);
    send(): Promise<RootDescription>;
}
//# sourceMappingURL=RootDescriptionRequest.d.ts.map
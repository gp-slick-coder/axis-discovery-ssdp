import { IHttpClient } from './IHttpClient';
export declare class HttpClient implements IHttpClient {
    get(url: string): Promise<string>;
}

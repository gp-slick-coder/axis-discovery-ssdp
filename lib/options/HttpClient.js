"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const expect = require("@fantasticfiasco/expect");
const request_1 = require("request");
class HttpClient {
    get(url) {
        expect.toExist(url);
        return new Promise((resolve, reject) => {
            request_1.get(url, undefined, (error, _, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(body);
                }
            });
        });
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=HttpClient.js.map
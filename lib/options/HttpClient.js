"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect = require("@fantasticfiasco/expect");
const request = require("request");
class HttpClient {
    get(url) {
        expect.toExist(url);
        return new Promise((resolve, reject) => {
            request.get(url, undefined, (error, _, body) => {
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
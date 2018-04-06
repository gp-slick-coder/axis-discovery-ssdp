"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("./../logging");
const RootDescription_1 = require("./RootDescription");
class RootDescriptionRequest {
    constructor(remoteAddress, location, httpClient) {
        this.remoteAddress = remoteAddress;
        this.location = location;
        this.httpClient = httpClient;
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.log('RootDescriptionRequest#send - %s', this.remoteAddress);
            const body = yield this.httpClient.get(this.location);
            return RootDescription_1.RootDescription.parse(this.location, body);
        });
    }
}
exports.RootDescriptionRequest = RootDescriptionRequest;
//# sourceMappingURL=RootDescriptionRequest.js.map
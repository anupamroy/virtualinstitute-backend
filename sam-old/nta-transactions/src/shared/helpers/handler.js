"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = exports.parseBody = exports.AWSHandler = void 0;
const common_vars_1 = require("../constants/common-vars");
exports.AWSHandler = (requestMethod, callback) => {
    return (event) => __awaiter(void 0, void 0, void 0, function* () {
        // All log statements are written to CloudWatch
        // console.info("received:", event);
        if (event.httpMethod !== requestMethod) {
            throw new Error(`This API only accepts ${requestMethod} method, you tried: ${event.httpMethod}`);
        }
        const response = yield callback(event);
        // All log statements are written to CloudWatch
        // console.info(
        //   `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
        // );
        console.log(response);
        return response;
    });
};
exports.parseBody = (body) => {
    return body ? JSON.parse(body) : null;
};
exports.createResponse = (statusCode, body, headers, multiValueHeaders, isBase64Encoded) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: Object.assign(Object.assign({}, common_vars_1.CORS_HEADERS), headers),
    multiValueHeaders,
    isBase64Encoded,
});

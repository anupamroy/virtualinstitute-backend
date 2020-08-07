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
exports.requestValidatorGuard = exports.NTATokenGuard = void 0;
const request_helper_1 = require("./request.helper");
const response_helper_1 = require("../response.helper");
exports.NTATokenGuard = (event, callback) => __awaiter(void 0, void 0, void 0, function* () {
    return request_helper_1.checkIfNTATokenValid(event)
        ? yield callback(event)
        : response_helper_1.unauthorisedAccessResponse();
});
exports.requestValidatorGuard = (body, classInstance, callback, callbackParams) => __awaiter(void 0, void 0, void 0, function* () {
    return body && request_helper_1.requestValidator(body, classInstance)
        ? () => __awaiter(void 0, void 0, void 0, function* () { return yield callback(...callbackParams); })
        : () => response_helper_1.keysMissingResponse();
});

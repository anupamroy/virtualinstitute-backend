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
exports.deleteNTAUser = exports.createNTAUser = exports.listAllNTAAuthorities = exports.listNTAAuthority = exports.createNTAAuthority = void 0;
const guard_1 = require("../../shared/helpers/requests/guard");
const nta_functions_1 = require("../../shared/functions/nta.functions");
const handler_common_1 = require("../../shared/helpers/handler-common");
const request_method_model_1 = require("../../shared/model/request-method.model");
const cognito_actions_1 = require("../../shared/helpers/cognito/cognito.actions");
exports.createNTAAuthority = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const body = handler_common_1.parseBody(event.body);
    return yield guard_1.NTATokenGuard(event, yield guard_1.requestValidatorGuard(body, new request_method_model_1.CreateNTAAuthorityRequest(), nta_functions_1.createNTAAuthorityFunction, [body]));
});
exports.listNTAAuthority = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield guard_1.NTATokenGuard(event, () => __awaiter(void 0, void 0, void 0, function* () { var _a; return yield nta_functions_1.listNTAAuthorityFunction(((_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id) + ""); }));
});
exports.listAllNTAAuthorities = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield guard_1.NTATokenGuard(event, () => __awaiter(void 0, void 0, void 0, function* () { return yield nta_functions_1.listAllNTAAuthoritiesFunction(); }));
});
exports.createNTAUser = (event) => __awaiter(void 0, void 0, void 0, function* () { return yield cognito_actions_1.cognitoActions.addNTAUser(event); });
exports.deleteNTAUser = (event) => __awaiter(void 0, void 0, void 0, function* () { return yield cognito_actions_1.cognitoActions.deleteNTAUser(event); });

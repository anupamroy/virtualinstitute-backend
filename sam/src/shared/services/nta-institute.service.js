"use strict";
// Handler helpers
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
exports.newPasswordChallenge = exports.checkToken = exports.createStudent = void 0;
const cognito_actions_1 = require("../helpers/cognito/cognito.actions");
const handler_common_1 = require("../helpers/handler-common");
const request_method_model_1 = require("../model/request-method.model");
exports.createStudent = (event) => __awaiter(void 0, void 0, void 0, function* () { return yield cognito_actions_1.cognitoActions.addStudent(event); });
exports.checkToken = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(false, "", event));
});
exports.newPasswordChallenge = (event) => __awaiter(void 0, void 0, void 0, function* () { return yield cognito_actions_1.cognitoActions.setNTAPassword(event); });

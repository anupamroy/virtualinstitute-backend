"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsResponse = exports.keysMissingResponse = exports.unauthorisedAccessResponse = void 0;
const handler_common_1 = require("./handler-common");
const request_method_model_1 = require("../model/request-method.model");
exports.unauthorisedAccessResponse = () => handler_common_1.createResponse(403, new request_method_model_1.APIResponse(true, "Unauthorised Access"));
exports.keysMissingResponse = () => handler_common_1.createResponse(400, new request_method_model_1.APIResponse(true, "Some keys Missing"));
exports.optionsResponse = () => handler_common_1.createResponse(200, null);

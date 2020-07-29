"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsResponse = exports.keysMissingResponse = exports.unauthorisedAccessResponse = void 0;
const handler_1 = require("./handler");
const request_method_model_1 = require("../model/request-method.model");
exports.unauthorisedAccessResponse = () => handler_1.createResponse(403, new request_method_model_1.APIResponse(true, "Unauthorised Access"));
exports.keysMissingResponse = () => handler_1.createResponse(400, new request_method_model_1.APIResponse(true, "Some keys Missing"));
exports.optionsResponse = () => handler_1.createResponse(200, null);

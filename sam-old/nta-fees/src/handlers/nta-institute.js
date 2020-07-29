"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeeTypeHandler = exports.createAccountHeadHandler = exports.createFeesHeadHandler = exports.getFeeTypeListHandler = exports.getAccountHeadListHandler = exports.getFeesHeadListHandler = exports.optionsHandler = exports.newPasswordChallengeHandler = exports.checkTokenHandler = exports.deleteNTAUserHandler = exports.createNTAUserHandler = void 0;
const handler_1 = require("../shared/helpers/handler");
const nta_institute_handlers_service_1 = require("./nta-institute.handlers.service");
const response_helper_1 = require("../shared/helpers/response.helper");
const nta_fees_handlers_service_1 = require("./nta-fees.handlers.service");
const nta_institute_handlers_service_2 = require("./nta-institute.handlers.service");
const nta_institute_handlers_service_3 = require("./nta-institute.handlers.service");
// Actual Functions
const createNTAUserHandler = handler_1.AWSHandler("POST", nta_institute_handlers_service_3.createNTAUser);
exports.createNTAUserHandler = createNTAUserHandler;
const deleteNTAUserHandler = handler_1.AWSHandler("DELETE", nta_institute_handlers_service_3.deleteNTAUser);
exports.deleteNTAUserHandler = deleteNTAUserHandler;
const checkTokenHandler = handler_1.AWSHandler("GET", nta_institute_handlers_service_3.checkToken);
exports.checkTokenHandler = checkTokenHandler;
const newPasswordChallengeHandler = handler_1.AWSHandler("POST", nta_institute_handlers_service_1.newPasswordChallenge);
exports.newPasswordChallengeHandler = newPasswordChallengeHandler;
const optionsHandler = handler_1.AWSHandler("OPTIONS", response_helper_1.optionsResponse);
exports.optionsHandler = optionsHandler;
// Fees Head
// const createFeesHead = AWSHandler('POST')
const getFeesHeadListHandler = handler_1.AWSHandler("GET", nta_institute_handlers_service_1.getFeesHeadList);
exports.getFeesHeadListHandler = getFeesHeadListHandler;
const getAccountHeadListHandler = handler_1.AWSHandler("GET", nta_institute_handlers_service_1.getAccountHeadList);
exports.getAccountHeadListHandler = getAccountHeadListHandler;
const getFeeTypeListHandler = handler_1.AWSHandler("GET", nta_fees_handlers_service_1.getFeeTypeList);
exports.getFeeTypeListHandler = getFeeTypeListHandler;
const createFeesHeadHandler = handler_1.AWSHandler("POST", nta_institute_handlers_service_2.createFeesHead);
exports.createFeesHeadHandler = createFeesHeadHandler;
const createAccountHeadHandler = handler_1.AWSHandler("POST", nta_fees_handlers_service_1.createAccountHead);
exports.createAccountHeadHandler = createAccountHeadHandler;
const createFeeTypeHandler = handler_1.AWSHandler("POST", nta_fees_handlers_service_1.createFeeType);
exports.createFeeTypeHandler = createFeeTypeHandler;

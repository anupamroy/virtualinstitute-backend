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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.newPasswordChallenge = exports.createInstituteMasterUser = exports.deleteNTAUser = exports.createOrganizationMasterUser = exports.GetCurrentUserDetails = exports.listAllNTAAuthorities = exports.GetOrgOfCurrentUser = exports.GetOrganizationById = exports.CreateOrgAffiliation = exports.CreateOrgSettings = exports.CreateOrgDocument = exports.CreateOrgRegistration = exports.CreateOrgEmailId = exports.CreateOrgPhoneNumber = exports.CreateOrgAddress = exports.createOrganization = void 0;
var guard_1 = require("../../shared/helpers/requests/guard");
var nta_authority_functions_1 = require("../functions/nta-authority.functions");
var handler_common_1 = require("../../shared/helpers/handler-common");
var request_method_model_1 = require("../../shared/model/request-method.model");
var cognito_actions_1 = require("../../shared/helpers/cognito/cognito.actions");
var request_model_1 = require("../model/request.model");
var db_handler_1 = require("../helpers/db-handler");
exports.createOrganization = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var body, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = handler_common_1.parseBody(event.body);
                return [4 /*yield*/, guard_1.requestValidatorGuard(body, new request_method_model_1.CreateOrganizationRequest(), nta_authority_functions_1.createOrganizationFunction, [body])];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, result()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.CreateOrgAddress = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var body, orgId, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = handler_common_1.parseBody(event.body);
                orgId = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.orgId;
                return [4 /*yield*/, guard_1.requestValidatorGuard(body, new request_method_model_1.CreateOrgAddressRequest(), nta_authority_functions_1.createOrgAddressFunction, [body, orgId])];
            case 1:
                result = _b.sent();
                return [4 /*yield*/, result()];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.CreateOrgPhoneNumber = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var body, orgId, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = handler_common_1.parseBody(event.body);
                orgId = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.orgId;
                return [4 /*yield*/, guard_1.requestValidatorGuard(body, new request_method_model_1.CreateOrgPhoneNumberRequest(), nta_authority_functions_1.createOrgPhoneNumberFunction, [body, orgId])];
            case 1:
                result = _b.sent();
                return [4 /*yield*/, result()];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.CreateOrgEmailId = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var body, orgId, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = handler_common_1.parseBody(event.body);
                orgId = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.orgId;
                return [4 /*yield*/, guard_1.requestValidatorGuard(body, new request_method_model_1.CreateOrgEmailRequest(), nta_authority_functions_1.createOrgEmailFunction, [body, orgId])];
            case 1:
                result = _b.sent();
                return [4 /*yield*/, result()];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.CreateOrgRegistration = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var body, orgId, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = handler_common_1.parseBody(event.body);
                orgId = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.orgId;
                return [4 /*yield*/, guard_1.requestValidatorGuard(body, new request_method_model_1.CreateOrgRegistrationRequest(), nta_authority_functions_1.createOrgRegistrationFunction, [body, orgId])];
            case 1:
                result = _b.sent();
                return [4 /*yield*/, result()];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.CreateOrgDocument = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var body, orgId, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = handler_common_1.parseBody(event.body);
                orgId = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.orgId;
                return [4 /*yield*/, guard_1.requestValidatorGuard(body, new request_method_model_1.CreateOrgDocumentRequest(), nta_authority_functions_1.createOrgDocumentFunction, [body, orgId])];
            case 1:
                result = _b.sent();
                return [4 /*yield*/, result()];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.CreateOrgSettings = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var body, orgId, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = handler_common_1.parseBody(event.body);
                orgId = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.orgId;
                return [4 /*yield*/, guard_1.requestValidatorGuard(body, new request_method_model_1.CreateOrgSettingsRequest(), nta_authority_functions_1.createOrgSettingsFunction, [body, orgId])];
            case 1:
                result = _b.sent();
                return [4 /*yield*/, result()];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.CreateOrgAffiliation = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var body, orgId, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = handler_common_1.parseBody(event.body);
                orgId = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.orgId;
                return [4 /*yield*/, guard_1.requestValidatorGuard(body, new request_method_model_1.CreateOrgAffiliationRequest(), nta_authority_functions_1.createOrgAffiliationFunction, [body, orgId])];
            case 1:
                result = _b.sent();
                return [4 /*yield*/, result()];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.GetOrganizationById = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, guard_1.NTATokenGuard(event, function () { return __awaiter(void 0, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, nta_authority_functions_1.GetOrganizationByIdFunction(((_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id) + '')];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                }); }); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetOrgOfCurrentUser = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var cognitoUserSub;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cognitoUserSub = event.headers.username || event.headers.Username;
                return [4 /*yield*/, db_handler_1.processDynamoDBResponse(nta_authority_functions_1.GetOrgOfCurrentUserFunction(cognitoUserSub))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.listAllNTAAuthorities = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, guard_1.NTATokenGuard(event, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, nta_authority_functions_1.listAllNTAAuthoritiesFunction()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetCurrentUserDetails = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var cognitoUserSub;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cognitoUserSub = event.headers.username || event.headers.Username;
                return [4 /*yield*/, db_handler_1.processDynamoDBResponse(nta_authority_functions_1.GetCurrentUserDetailsFunction(cognitoUserSub))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
// export const createNTAUser = async (event: APIGatewayProxyEvent) =>
//   await cognitoActions.addNTAUser(event);
exports.createOrganizationMasterUser = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var body, orgId, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = handler_common_1.parseBody(event.body);
                orgId = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.orgId;
                return [4 /*yield*/, guard_1.requestValidatorGuard(body, new request_model_1.CreatePersonRequest(), nta_authority_functions_1.createOrganizationMasterUserFunction, [body, orgId])];
            case 1:
                result = _b.sent();
                return [4 /*yield*/, result()];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.deleteNTAUser = function (event) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, cognito_actions_1.cognitoActions.deleteNTAUser(event)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
exports.createInstituteMasterUser = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var body, orgId, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = handler_common_1.parseBody(event.body);
                orgId = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.orgId;
                return [4 /*yield*/, guard_1.requestValidatorGuard(body, new request_method_model_1.CreateOrganizationRequest(), nta_authority_functions_1.createInstituteMasterUserFunction, [body, orgId])];
            case 1:
                result = _b.sent();
                return [4 /*yield*/, result()];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
// This is no longer required
exports.newPasswordChallenge = function (event) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, cognito_actions_1.cognitoActions.setNTAPassword(event)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };

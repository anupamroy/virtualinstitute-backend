"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.cognitoActions = exports.CognitoActions = void 0;
const aws = __importStar(require("aws-sdk"));
const common_vars_1 = require("../constants/common-vars");
const handler_1 = require("./handler");
const request_method_model_1 = require("../model/request-method.model");
const request_model_1 = require("../model/request.model");
const db_handler_1 = require("./db-handler");
const response_helper_1 = require("./response.helper");
const cognito = new aws.CognitoIdentityServiceProvider();
class CognitoActions {
    constructor() {
        this.setNTAPassword = this.setNTAPassword.bind(this);
    }
    addStudent() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                UserPoolId: common_vars_1.CognitoConfig.ntaUserPoolId,
                Username: "9422086010",
                UserAttributes: [{ Name: "email", Value: "aditya18thm@gmail.com" }],
            };
            const user = yield cognito.adminCreateUser(request).promise();
            return user.User;
        });
    }
    addNTAUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const ntaAPIPasskey = event.headers[common_vars_1.REQUEST_HEADERS.ntaAPIPasskey];
            console.log("ntaAPIPasskey", ntaAPIPasskey, event.headers);
            if (ntaAPIPasskey === common_vars_1.CognitoConfig.ntaAPIPasskey) {
                const body = handler_1.parseBody(event.body);
                if (body &&
                    Object.keys(new request_model_1.CreateNTAUserRequest()).every((key) => body[key])) {
                    const request = {
                        UserPoolId: common_vars_1.CognitoConfig.ntaUserPoolId,
                        Username: body.mobile,
                        TemporaryPassword: body.password,
                        UserAttributes: [
                            { Name: "email", Value: body.email },
                            { Name: "gender", Value: body.gender },
                            { Name: "name", Value: body.name },
                            { Name: "family_name", Value: body.family_name },
                            { Name: "middle_name", Value: body.middle_name },
                        ],
                    };
                    return cognito
                        .adminCreateUser(request)
                        .promise()
                        .then((user) => handler_1.createResponse(200, new request_method_model_1.APIResponse(false, "", user.User)))
                        .catch((e) => handler_1.createResponse(422, new request_method_model_1.APIResponse(true, e.message, e)));
                }
                else {
                    return response_helper_1.keysMissingResponse();
                }
            }
            else {
                return response_helper_1.unauthorisedAccessResponse();
            }
        });
    }
    setNTAPassword(event) {
        const body = handler_1.parseBody(event.body);
        const mobile = body === null || body === void 0 ? void 0 : body.mobile;
        const session = body === null || body === void 0 ? void 0 : body.session;
        if (mobile && session) {
            const object = {
                ChallengeName: "NEW_PASSWORD_REQUIRED",
                ChallengeResponses: {
                    NEW_PASSWORD: "12345678",
                    USERNAME: mobile,
                },
                ClientId: common_vars_1.CognitoConfig.ntaAppId,
                Session: session,
            };
            return cognito
                .respondToAuthChallenge(object)
                .promise()
                .then((data) => handler_1.createResponse(200, new request_method_model_1.APIResponse(false, "", data)))
                .catch((error) => handler_1.createResponse(422, error.message, error));
        }
        else {
            return response_helper_1.keysMissingResponse();
        }
    }
    deleteNTA(event) {
        var _a;
        const ntaAPIPasskey = event.headers[common_vars_1.REQUEST_HEADERS.ntaAPIPasskey];
        console.log("ntaAPIPasskey", ntaAPIPasskey, event.headers);
        if (ntaAPIPasskey === common_vars_1.CognitoConfig.ntaAPIPasskey) {
            const mobile = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.mobile;
            if (mobile) {
                const request = {
                    UserPoolId: common_vars_1.CognitoConfig.ntaUserPoolId,
                    Username: mobile,
                };
                const cognito = new aws.CognitoIdentityServiceProvider();
                return cognito
                    .adminDeleteUser(request)
                    .promise()
                    .then((user) => handler_1.createResponse(200, new request_method_model_1.APIResponse(false, "", user)))
                    .catch((e) => handler_1.createResponse(422, new request_method_model_1.APIResponse(true, e.message, e)));
            }
            else {
                return handler_1.createResponse(400, new request_method_model_1.APIResponse(true, "Key mobile Missing in URL"));
            }
        }
        else {
            return handler_1.createResponse(403, new request_method_model_1.APIResponse(true, "Unauthorised Access"));
        }
    }
    createNTA(event) {
        const NTA = db_handler_1.DynamoDBActions.get({ type: "NTA" });
    }
}
exports.CognitoActions = CognitoActions;
exports.cognitoActions = new CognitoActions();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserPassword = exports.deleteCognitoUser = exports.ProcessCognitoUserResponse = void 0;
const handler_common_1 = require("../helpers/handler-common");
const request_method_model_1 = require("../model/request-method.model");
const common_vars_1 = require("../constants/common-vars");
const db_handler_1 = require("../helpers/db-handler");
exports.ProcessCognitoUserResponse = (event) => event
    .then((result) => handler_common_1.createResponse(200, new request_method_model_1.APIResponse(false, '', result.User)))
    .catch((e) => handler_common_1.createResponse(422, new request_method_model_1.APIResponse(true, e.message, e)));
// export const createCognitoUser = (user: AdminCreateUserRequest) =>
//   ProcessCognitoUserResponse(cognito.adminCreateUser(user).promise());
exports.deleteCognitoUser = (UserPoolId, Username) => db_handler_1.processDynamoDBResponse(common_vars_1.cognito.adminDeleteUser({ UserPoolId, Username }).promise());
// Password Challenge
exports.setUserPassword = (USERNAME, Session) => {
    const object = {
        ChallengeName: 'NEW_PASSWORD_REQUIRED',
        ChallengeResponses: {
            NEW_PASSWORD: '12345678',
            USERNAME,
        },
        ClientId: common_vars_1.CognitoConfig.ntaAppId,
        Session,
    };
    return db_handler_1.processDynamoDBResponse(common_vars_1.cognito.respondToAuthChallenge(object).promise());
};

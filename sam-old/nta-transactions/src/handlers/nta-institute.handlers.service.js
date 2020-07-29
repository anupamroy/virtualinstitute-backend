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
exports.getAccountHeadList = exports.createAccountHeadMaster = exports.getFeesMasterList = exports.createFeesMaster = exports.getFeesHeadList = exports.createFeesHead = exports.newPasswordChallenge = exports.checkToken = exports.deleteNTAUser = exports.createNTAUser = void 0;
const db_handler_1 = require("../shared/helpers/db-handler");
const handler_1 = require("../shared/helpers/handler");
const cognito_helper_1 = require("../shared/helpers/cognito.helper");
const request_method_model_1 = require("../shared/model/request-method.model");
const masters_model_1 = require("../shared/model/DB/imports/masters.model");
const request_helper_1 = require("../shared/helpers/request.helper");
const response_helper_1 = require("../shared/helpers/response.helper");
const request_method_model_2 = require("../shared/model/request-method.model");
// export const getAllItems = async () => {
//   const data = await DynamoDBActions.scan();
//   const items = data.Items;
//   return createResponse(200, items);
// };
// export const getById = async (event: APIGatewayProxyEvent) => {
//   const id = event.pathParameters?.id;
//   const data = await DynamoDBActions.get({ id });
//   const item = data.Item;
//   return createResponse(200, item);
// };
// export const putItem = async (event: APIGatewayProxyEvent) => {
//   const body = parseBody<any>(event.body);
//   const id = body.id;
//   const name = body.name;
//   const result = await DynamoDBActions.putItem({ id, name });
//   return createResponse(200, result);
// };
exports.createNTAUser = (event) => __awaiter(void 0, void 0, void 0, function* () { return yield cognito_helper_1.cognitoActions.addNTAUser(event); });
exports.deleteNTAUser = (event) => __awaiter(void 0, void 0, void 0, function* () { return yield cognito_helper_1.cognitoActions.deleteNTA(event); });
exports.checkToken = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("checkToken");
    console.log(event.requestContext);
    return handler_1.createResponse(200, new request_method_model_1.APIResponse(false, "", event));
});
exports.newPasswordChallenge = (event) => __awaiter(void 0, void 0, void 0, function* () { return yield cognito_helper_1.cognitoActions.setNTAPassword(event); });
// Fees Head Master
exports.createFeesHead = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const body = handler_1.parseBody(event.body);
    if (body && request_helper_1.requestValidator(body, request_method_model_1.CreateFeesHeadRequest)) {
        const userId = event.headers.username;
        const feesHead = new masters_model_1.FeesHeadName();
        feesHead.created_by = userId;
        feesHead.updated_by = userId;
        feesHead.name = body.name;
        feesHead.parentId = body.parentId;
        feesHead.instituteTypeId = body.institutionTypeId;
        return yield db_handler_1.DynamoDBActions.putItem(feesHead)
            .then((data) => handler_1.createResponse(200, new request_method_model_1.APIResponse(false, "", data)))
            .catch((error) => handler_1.createResponse(422, new request_method_model_1.APIResponse(false, error.message || "An Error Occured", error)));
    }
    else {
        return response_helper_1.keysMissingResponse();
    }
});
exports.getFeesHeadList = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_handler_1.DynamoDBActions.batchGet({})
        .then((data) => handler_1.createResponse(200, new request_method_model_1.APIResponse(false, "", data)))
        .catch((error) => handler_1.createResponse(422, new request_method_model_1.APIResponse(false, error.message || "An Error Occured", error)));
});
// Fees Type master
exports.createFeesMaster = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const body = handler_1.parseBody(event.body);
    if (body && request_helper_1.requestValidator(body, request_method_model_2.CreateFeesMasterRequest)) {
        const userId = event.headers.username;
        const feeType = new masters_model_1.FeeType();
        feeType.created_by = userId;
        feeType.updated_by = userId;
        feeType.name = body.name;
        return yield db_handler_1.DynamoDBActions.putItem(feeType)
            .then((data) => handler_1.createResponse(200, new request_method_model_1.APIResponse(false, "", data)))
            .catch((error) => handler_1.createResponse(422, new request_method_model_1.APIResponse(false, error.message || "An Error Occured", error)));
    }
    else {
        return response_helper_1.keysMissingResponse();
    }
});
exports.getFeesMasterList = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_handler_1.DynamoDBActions.batchGet({})
        .then((data) => handler_1.createResponse(200, new request_method_model_1.APIResponse(false, "", data)))
        .catch((error) => handler_1.createResponse(422, new request_method_model_1.APIResponse(false, error.message || "An Error Occured", error)));
});
// AccountsHead Master
exports.createAccountHeadMaster = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const body = handler_1.parseBody(event.body);
    if (body && request_helper_1.requestValidator(body, request_method_model_2.CreateFeesMasterRequest)) {
        const userId = event.headers.username;
        const feeType = new masters_model_1.FeeType();
        feeType.created_by = userId;
        feeType.updated_by = userId;
        feeType.name = body.name;
        return yield db_handler_1.DynamoDBActions.putItem(feeType)
            .then((data) => handler_1.createResponse(200, new request_method_model_1.APIResponse(false, "", data)))
            .catch((error) => handler_1.createResponse(422, new request_method_model_1.APIResponse(false, error.message || "An Error Occured", error)));
    }
    else {
        return response_helper_1.keysMissingResponse();
    }
});
exports.getAccountHeadList = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_handler_1.DynamoDBActions.batchGet({})
        .then((data) => handler_1.createResponse(200, new request_method_model_1.APIResponse(false, "", data)))
        .catch((error) => handler_1.createResponse(422, new request_method_model_1.APIResponse(false, error.message || "An Error Occured", error)));
});

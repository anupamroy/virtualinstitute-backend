"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processDynamoDBResponse = exports.DynamoDBActions = void 0;
const common_vars_1 = require("../constants/common-vars");
const handler_common_1 = require("./handler-common");
const request_method_model_1 = require("../model/request-method.model");
exports.DynamoDBActions = {
    putItem: (Item, TableName) => common_vars_1.CommonItems.documentClient.put({ TableName, Item }).promise(),
    get: (Key, TableName) => common_vars_1.CommonItems.documentClient.get({ TableName, Key }).promise(),
    getItemById: (id, tableType, TableName) => common_vars_1.CommonItems.documentClient
        .query({
        TableName,
        KeyConditionExpression: "id = :id and tableType = :tableType",
        ExpressionAttributeValues: {
            ":id": id,
            ":tableType": tableType,
        },
    })
        .promise()
        .then((result) => result.Items[0]),
    scan: (TableName, params) => common_vars_1.CommonItems.documentClient.scan(Object.assign({ TableName }, params)).promise(),
    batchGet: (params) => common_vars_1.CommonItems.documentClient.batchGet({ RequestItems: params }).promise(),
    query: (params) => common_vars_1.CommonItems.documentClient.query(params).promise(),
    delete: (params, TableName) => common_vars_1.CommonItems.documentClient.delete(Object.assign({ TableName }, params)).promise(),
};
exports.processDynamoDBResponse = (event, data) => event
    .then((response) => handler_common_1.createResponse(200, new request_method_model_1.APIResponse(false, "", data || response)))
    .catch((error) => handler_common_1.createResponse(422, new request_method_model_1.APIResponse(false, error.message || "An Error Occured", error)));

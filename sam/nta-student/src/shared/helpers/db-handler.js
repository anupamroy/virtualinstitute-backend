"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDBActions = void 0;
const common_vars_1 = require("../constants/common-vars");
// import { documentClient } from "../constants/common-vars";
const TableName = common_vars_1.CommonItems.tableName;
exports.DynamoDBActions = {
    putItem: (Item) => common_vars_1.CommonItems.documentClient.put({ TableName, Item }).promise(),
    get: (Key) => common_vars_1.CommonItems.documentClient.get({ TableName, Key }).promise(),
    scan: () => common_vars_1.CommonItems.documentClient.scan({ TableName }).promise(),
};

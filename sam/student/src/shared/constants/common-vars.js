"use strict";
// Create clients and set shared const values outside of the handler.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonItems = void 0;
// Create a DocumentClient that represents the query to add an item
const dynamodb = require("aws-sdk/clients/dynamodb");
exports.CommonItems = {
    documentClient: new dynamodb.DocumentClient(),
    // Get the DynamoDB table name from environment variables
    tableName: process.env.STUDENT_TABLE,
};

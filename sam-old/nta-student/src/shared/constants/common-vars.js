"use strict";
// Create clients and set shared const values outside of the handler.
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_PASSWORD = exports.REQUEST_HEADERS = exports.CognitoConfig = exports.CORS_HEADERS = exports.CommonItems = void 0;
// Create a DocumentClient that represents the query to add an item
const dynamodb = require("aws-sdk/clients/dynamodb");
exports.CommonItems = {
    documentClient: new dynamodb.DocumentClient(),
    // Get the DynamoDB table name from environment variables
    tableName: process.env.STUDENT_TABLE,
};
exports.CORS_HEADERS = {
    "Access-Control-Allow-Headers": "Authorization",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
};
exports.CognitoConfig = {
    studentInstituteUserPoolId: "ap-south-1_75LKZuJ8p",
    ntaUserPoolId: "ap-south-1_qhEXlobaj",
    ntaAPIPasskey: '426b5e01-ba0f-42bf-8da9-2143f19ec57a-c909bce0-f3a4-4e67-8a3f-63958c77fdc8',
    ntaAppId: '1sg9rfttg59hf5r8ee9en037sd'
};
exports.REQUEST_HEADERS = {
    ntaAPIPasskey: 'Nta-Api-Pass-Key'
};
exports.USER_PASSWORD = 'e9dd7046-d1af-11ea-b33d-976e79865d9c-eaf73d4a-d1af-11ea-bb68-6350c5c6f354';

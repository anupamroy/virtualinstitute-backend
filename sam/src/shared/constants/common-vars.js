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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENT_HEADERS_LOCAL = exports.EVENT_HEADERS = exports.cognito = exports.NTA_MASTER_SET_ID = exports.TABLE_NAMES = exports.USER_PASSWORD = exports.REQUEST_HEADERS = exports.CognitoConfig = exports.CORS_HEADERS = exports.CommonItems = exports.DYNAMO_DB_URL = void 0;
const aws = __importStar(require("aws-sdk"));
// Create clients and set shared const values outside of the handler.
// Create a DocumentClient that represents the query to add an item
const dynamodb = require("aws-sdk/clients/dynamodb");
exports.DYNAMO_DB_URL = "";
exports.CommonItems = {
    documentClient: new dynamodb.DocumentClient(),
    // Get the DynamoDB table name from environment variables
    studentTable: process.env.STUDENT_TABLE,
};
exports.CORS_HEADERS = {
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,GET,PATCH,PUT,DELETE",
};
exports.CognitoConfig = {
    studentInstituteUserPoolId: "ap-south-1_75LKZuJ8p",
    ntaUserPoolId: "ap-south-1_YOsP7cTUw",
    ntaAPIPasskey: "426b5e01-ba0f-42bf-8da9-2143f19ec57a-c909bce0-f3a4-4e67-8a3f-63958c77fdc8",
    ntaAppId: "41m76ih5a4du31srs3qe0lnfg8",
};
exports.REQUEST_HEADERS = {
    ntaAPIPasskey: "Nta-Api-Pass-Key",
};
exports.USER_PASSWORD = "e9dd7046-d1af-11ea-b33d-976e79865d9c-eaf73d4a-d1af-11ea-bb68-6350c5c6f354";
exports.TABLE_NAMES = {
    studentTable: "StudentsTable",
    instituteTable: "InstituteTableV1",
    feesTable: "FeesTable",
    transactionsTable: "TransactionsTable",
};
exports.NTA_MASTER_SET_ID = "debe7d4a-d29a-11ea-b256-073ae46f3a1a";
exports.cognito = new aws.CognitoIdentityServiceProvider();
exports.EVENT_HEADERS = {
    accessToken: "access-token",
    ntaAuthorityId: "nta-authority-id",
};
exports.EVENT_HEADERS_LOCAL = {
    accessToken: "Access-Token",
    ntaAuthorityId: "Nta-Authority-Id",
};

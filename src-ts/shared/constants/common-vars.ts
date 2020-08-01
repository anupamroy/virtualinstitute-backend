import * as aws from "aws-sdk";
// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const dynamodb = require("aws-sdk/clients/dynamodb");

export const DYNAMO_DB_URL = "";

export const CommonItems = {
  documentClient: new dynamodb.DocumentClient(),
  // Get the DynamoDB table name from environment variables
  studentTable: process.env.STUDENT_TABLE,
  // institutetable: process.env.
};

export const CORS_HEADERS = {
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,PATCH,PUT,DELETE",
  // "Access-Control-Allow-Credentials": "true",
};

export const CognitoConfig = {
  studentInstituteUserPoolId: "ap-south-1_75LKZuJ8p",
  ntaUserPoolId: "ap-south-1_qhEXlobaj",
  ntaAPIPasskey:
    "426b5e01-ba0f-42bf-8da9-2143f19ec57a-c909bce0-f3a4-4e67-8a3f-63958c77fdc8",
  ntaAppId: "1sg9rfttg59hf5r8ee9en037sd",
};

export const REQUEST_HEADERS = {
  ntaAPIPasskey: "Nta-Api-Pass-Key",
};

export const USER_PASSWORD =
  "e9dd7046-d1af-11ea-b33d-976e79865d9c-eaf73d4a-d1af-11ea-bb68-6350c5c6f354";

export const TABLE_NAMES = {
  studentTable: "StudentsTable",
  instituteTable: "InstituteTable",
  feesTable: "FeesTable",
  transactionsTable: "TransactionsTable",
};

export const NTA_MASTER_SET_ID = "debe7d4a-d29a-11ea-b256-073ae46f3a1a";

export const cognito = new aws.CognitoIdentityServiceProvider();

export const EVENT_HEADERS = {
  accessToken: "access-token",
  ntaAuthorityId: "nta-authority-id",
};

export const EVENT_HEADERS_LOCAL = {
  accessToken: "Access-Token",
  ntaAuthorityId: "Nta-Authority-Id",
};
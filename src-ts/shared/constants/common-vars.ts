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
  studentInstituteUserPoolId: "ap-south-1_GYBsglFix",
  studentInstituteAppId: "12gn9davklo64a8rtn8mtvo2qv",
  ntaUserPoolId: "ap-south-1_YOsP7cTUw",
  ntaAPIPasskey:
    "426b5e01-ba0f-42bf-8da9-2143f19ec57a-c909bce0-f3a4-4e67-8a3f-63958c77fdc8",
  ntaAppId: "41m76ih5a4du31srs3qe0lnfg8",
};

export const REQUEST_HEADERS = {
  ntaAPIPasskey: "Nta-Api-Pass-Key",
};

export const USER_PASSWORD =
  "e9dd7046-d1af-11ea-b33d-976e79865d9c-eaf73d4a-d1af-11ea-bb68-6350c5c6f354";

export const TABLE_NAMES = {
  // studentTable: 'StudentsTable',
  instituteTable: "InstituteTableV1",
  // feesTable: 'FeesTable',
  // transactionsTable: 'TransactionsTable',
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

export const ERRORS = {
  INSTITUTION_TYPE_NO_EXIST: "Institution Type Does not exist",
  PARENT_FEES_HEAD_NOT_EXIST: "Parent Fees head Does not exist",
  FEES_HEAD_NO_SPECIAL_CHARS:
    "Fees head name should not contain any special characters.",
  FEES_HEAD_NAME_ALREADY_EXISTS: "Fees head name already exists",
  FEES_HEAD_NO_EXISTS: "Fees head does not Exist",
  FEES_HEAD_INSTITUTE_ID_NO_MATCH_PARENT:
    "The Fees Head Institute does not match with the parent Fees head",
  FEES_TYPE_NO_SPECIAL_CHARS:
    "Fees Type name should not contain any special characters.",
  FEES_TYPE_NO_EXIST: "Fees Type does not Exist",
  FEES_TYPE_NAME_ALREADY_EXISTS: "Fees type name already exists",
  PARENT_ACCOUNT_HEAD_NO_EXISTS: "Parent Accounts head Does not exist",
  ACCOUNTS_HEAD_NO_SPECIAL_CHARS:
    "Accounts head name should not contain any special characters.",
  ACCOUNTS_HEAD_NO_EXISTS: "Accounts head does not Exist",
  ACCOUNTS_HEAD_NAME_ALREADY_EXISTS: "Fees type name already exists",
  GENERAL_UNAUTHORISED_ACCESS: "Unauthorised Access",
  GENERAL_KEYS_MISSING: "Some keys Missing",
};

export const S3_BUCKETS = {
  PRIMARY: "virtualinstitutestorage",
};

export const S3_FOLDER_STRUCTURE = {
  ORGANIZATION: "org_meta",
  IMAGES: "/images",
  REGISTRATION_DOCUMENTS: "/registration-documents",
  AFFILIATION_DOCUMENTS: "/affiliation-documents",
  PROFILE_META: "/profile_meta",
  PROFILE_PICTURE: "/profile-picture",
  LOGO: "/logo",
};

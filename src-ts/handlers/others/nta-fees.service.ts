import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { DynamoDBActions } from "../../shared/helpers/db-handler";
import { createResponse, parseBody } from "../../shared/helpers/handler";

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

// Actual Functions

// export const getFeeTypeById = async (event: APIGatewayProxyEvent) => {};
// export const getAccountHeadById = async (event: APIGatewayProxyEvent) => {};
// export const getFeesHeadById = async (event: APIGatewayProxyEvent) => {};

// export const getFeeTypeList = async (event: APIGatewayProxyEvent) => {};
// export const getAccountTypeList = async (event: APIGatewayProxyEvent) => {};
// export const getFeeHeadList = async (event: APIGatewayProxyEvent) => {};

// export const createFeeType = async (event: APIGatewayProxyEvent) => {};
// export const createAccountHead = async (event: APIGatewayProxyEvent) => {};
// export const createFeesHead = async (event: APIGatewayProxyEvent) => {};
// export const editFeeType = async (event: APIGatewayProxyEvent) => {};
// export const editAccountHead = async (event: APIGatewayProxyEvent) => {};
// export const editFeesHead = async (event: APIGatewayProxyEvent) => {};
// export const deleteFeeType = async (event: APIGatewayProxyEvent) => {};
// export const deleteAccountHead = async (event: APIGatewayProxyEvent) => {};
// export const deleteFeesHead = async (event: APIGatewayProxyEvent) => {};

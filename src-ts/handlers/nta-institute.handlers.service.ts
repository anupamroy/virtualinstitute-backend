import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { DynamoDBActions } from "../shared/helpers/db-handler";
import { createResponse, parseBody } from "../shared/helpers/handler";
import { cognitoActions } from "../shared/helpers/cognito.helper";
import { APIResponse } from "../shared/model/request-method.model";

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

export const createNTAUser = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.addNTAUser(event);

export const deleteNTAUser = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.deleteNTA(event);

export const checkToken = async (event: APIGatewayProxyEvent) => {
  console.log('checkToken');
  console.log(event.requestContext);
  return createResponse(200, new APIResponse(false, "", event));
};

export const newPasswordChallenge = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.setNTAPassword(event);

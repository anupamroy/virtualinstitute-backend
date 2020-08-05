import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { DynamoDBActions } from "../../shared/helpers/db-handler";
import { createResponse } from "../../shared/helpers/handler-common";
import { cognitoActions } from '../../shared/helpers/cognito/cognito.actions';

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
//   // const body = parseBody<any>(event.body);
//   // const id = body.id;
//   // const name = body.name;
//   // const result = await DynamoDBActions.putItem({ id, name });
//   const result = await cognitoActions.addStudent(event)
//   return createResponse(200, result);
// };

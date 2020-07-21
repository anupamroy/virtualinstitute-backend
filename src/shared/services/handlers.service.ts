import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";

export const getAllItems = async () => {
  const data = await DynamoDBActions.scan();
  const items = data.Items;
  return ResponseProcessing.createResponse(200, items);
};

export const getById = async (event: APIGatewayProxyEvent) => {
  const id = event.pathParameters?.id;
  const data = await DynamoDBActions.get({ id });
  const item = data.Item;
  return ResponseProcessing.createResponse(200, item);
};

export const putItem = async (event: APIGatewayProxyEvent) => {
  const body = RequestProcessing.parseBody<any>(event.body);
  const id = body.id;
  const name = body.name;
  const result = await DynamoDBActions.putItem({ id, name });
  return ResponseProcessing.createResponse(200, result);
};

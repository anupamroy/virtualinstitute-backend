import { CreateFeesHeadRequest } from "../model/request-method.model";
import { APIGatewayProxyEvent } from "aws-lambda";
import {
  createNewFeesType,
  createNewAccountHead,
} from "../transforms/fees.transform";
import {
  processDynamoDBResponse,
  DynamoDBActions,
} from "../helpers/db-handler";
import { TABLE_NAMES } from "../constants/common-vars";



export const createFeesTypeFunction = async (
  body: CreateFeesHeadRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const feeType = createNewFeesType(userId, body);
  return await processDynamoDBResponse(
    DynamoDBActions.putItem(feeType, TABLE_NAMES.feesTable)
  );
};

export const createAccountHeadFunction = async (
  body: CreateFeesHeadRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const accountHead = createNewAccountHead(userId, body);
  return await processDynamoDBResponse(
    DynamoDBActions.putItem(accountHead, TABLE_NAMES.feesTable)
  );
};

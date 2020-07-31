import { CreateFeesHeadRequest } from "../model/request-method.model";
import { APIGatewayProxyEvent } from "aws-lambda";
import {
  createNewFeesType,
  createNewAccountHead,
  createNewFeesHead,
} from "../transforms/fees.transform";
import {
  processDynamoDBResponse,
  DynamoDBActions,
} from "../helpers/db-handler";
import { TABLE_NAMES } from "../constants/common-vars";
import { addItemToNTAMasters } from "../helpers/general.helpers";
import { getNTAById, saveNTAAuthority } from './nta.functions';
import { NTA } from '../model/DB/nta.DB.model';

export const createFeesHeadFunction = async (
  body: CreateFeesHeadRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const feesHead = createNewFeesHead(userId, body);
  const ntaId = event.headers["Nta-Authority-Id"];
  const nta: NTA = await getNTAById(ntaId);
  console.log('-----------------nta-------------', nta)
  addItemToNTAMasters(feesHead, "feesHeadNames", nta);
  return await processDynamoDBResponse(saveNTAAuthority(nta));
};

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

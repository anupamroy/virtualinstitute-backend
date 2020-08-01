import {
  CreateFeesHeadRequest,
  CreateFeesTypeMasterRequest,
} from "../model/request-method.model";
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
import { getNTAById, saveNTAAuthority } from "./nta.functions";
import { NTA } from "../model/DB/nta.DB.model";
import { addItemToNTAMasters } from "./nta-masters.functions";
import {
  CreateAccountsHeadMasterRequest,
  APIResponse,
} from "../model/request-method.model";
import { createResponse } from "../helpers/handler";

export const createFeesHeadFunction = async (
  body: CreateFeesHeadRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const feesHead = createNewFeesHead(userId, body);
  const ntaId = event.headers["Nta-Authority-Id"];
  const nta: NTA = await getNTAById(ntaId);
  addItemToNTAMasters(feesHead, "feesHeadNames", nta);
  return await processDynamoDBResponse(saveNTAAuthority(nta));
};

export const createFeesTypeFunction = async (
  body: CreateFeesTypeMasterRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const feeType = createNewFeesType(userId, body);
  const ntaId = event.headers["Nta-Authority-Id"];
  const nta: NTA = await getNTAById(ntaId);
  addItemToNTAMasters(feeType, "feeTypeNames", nta);
  return await processDynamoDBResponse(saveNTAAuthority(nta));
};

export const createAccountHeadFunction = async (
  body: CreateAccountsHeadMasterRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const accountHead = createNewAccountHead(userId, body);
  const ntaId = event.headers["Nta-Authority-Id"];
  const nta: NTA = await getNTAById(ntaId);
  addItemToNTAMasters(accountHead, "accountHeads", nta);
  return await processDynamoDBResponse(saveNTAAuthority(nta));
};

export const getFeesHeadListFunction = async (event: APIGatewayProxyEvent) => {
  const ntaId = event.headers["Nta-Authority-Id"];
  const nta: NTA = await getNTAById(ntaId);
  return createResponse(
    200,
    new APIResponse(false, "", nta.masters.feesHeadNames)
  );
};
export const getFeesTypeListFunction = async (event: APIGatewayProxyEvent) => {
  const ntaId = event.headers["Nta-Authority-Id"];
  const nta: NTA = await getNTAById(ntaId);
  return createResponse(
    200,
    new APIResponse(false, "", nta.masters.feeTypeNames)
  );
};
export const getAccountsHeadListFunction = async (
  event: APIGatewayProxyEvent
) => {
  const ntaId = event.headers["Nta-Authority-Id"];
  const nta: NTA = await getNTAById(ntaId);
  return createResponse(
    200,
    new APIResponse(false, "", nta.masters.accountHeads)
  );
};

export const getFeesHeadByIdFunction = async (event: APIGatewayProxyEvent) => {
  const ntaId = event.headers["Nta-Authority-Id"];
  const nta: NTA = await getNTAById(ntaId);
  const feesHeadId = event.pathParameters?.id;
  return createResponse(
    200,
    new APIResponse(
      false,
      "",
      nta.masters.feesHeadNames.find((feesHead) => feesHead.id === feesHeadId)
    )
  );
};

import {
  CreateFeesHeadRequest,
  CreateFeesTypeMasterRequest,
} from "../model/request-method.model";
import { APIGatewayProxyEvent } from "aws-lambda";
import {
  createNewFeesType,
  createNewAccountHead,
  createNewFeesHead,
  createEditFeesHead,
} from "../transforms/fees.transform";
import {
  processDynamoDBResponse,
  DynamoDBActions,
} from "../helpers/db-handler";
import { EVENT_HEADERS, TABLE_NAMES } from "../constants/common-vars";
import { getNTAById, saveNTAAuthority, getNTAIdofUser } from "./nta.functions";
import { NTA } from "../model/DB/nta.DB.model";
import {
  addItemToNTAMasters,
  deleteItemFromNTAMasters,
} from "./nta-masters.functions";
import {
  CreateAccountsHeadMasterRequest,
  APIResponse,
} from "../model/request-method.model";
import { createResponse, parseBody } from "../helpers/handler-common";
import {
  editNTAMasterItem,
  setParentNameInMasterArray,
} from "./nta-masters.functions";
import {
  getNTAFromEvent,
  getNTAIdFromEvent,
  getNTAMasterList,
} from "../helpers/general.helpers";
import { getNTAMasterArray } from "./nta-masters.functions";
import { getFeesHeadRangeKey } from "../transforms/fees.transform";
import { checkIfMasterListItemExistsByName } from "../helpers/general.helpers";
import { ObjectId } from "../model/DB/imports/types.DB.model";
import {
  CreateFeesMasterRequest,
  StatusChangeRequest,
} from "../model/request-method.model";
import {
  createEditFeesType,
  createEditAccountHead,
} from "../transforms/fees.transform";

export const createFeesHeadFunction = async (
  body: CreateFeesHeadRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const feesHead = createNewFeesHead(userId, body);
  const ntaId = await getNTAIdFromEvent(event);
  feesHead.id = getFeesHeadRangeKey(ntaId, feesHead);
  feesHead.tableType = `#NTA#${ntaId}`;
  return await processDynamoDBResponse(
    DynamoDBActions.putItem(feesHead, TABLE_NAMES.instituteTable)
  );
};

export const createFeesTypeFunction = async (
  body: CreateFeesTypeMasterRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const feeType = createNewFeesType(userId, body);
  const nta = await getNTAFromEvent(event);
  addItemToNTAMasters(feeType, "feeTypeNames", nta);
  return await processDynamoDBResponse(saveNTAAuthority(nta));
};

export const createAccountHeadFunction = async (
  body: CreateAccountsHeadMasterRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const accountHead = createNewAccountHead(userId, body);
  const nta = await getNTAFromEvent(event);
  addItemToNTAMasters(accountHead, "accountHeads", nta);
  return await processDynamoDBResponse(saveNTAAuthority(nta));
};

export const getFeesHeadListFunction = async (event: APIGatewayProxyEvent) => {
  const ntaId = await getNTAIdFromEvent(event);
  return await processDynamoDBResponse(
    getNTAMasterList(ntaId, "FEE_HEAD_MASTER")
  );
};
export const getFeesTypeListFunction = async (event: APIGatewayProxyEvent) => {
  const nta = await getNTAFromEvent(event);
  return createResponse(
    200,
    new APIResponse(false, "", getNTAMasterArray("feeTypeNames", nta))
  );
};
export const getAccountsHeadListFunction = async (
  event: APIGatewayProxyEvent
) => {
  const nta = await getNTAFromEvent(event);
  return createResponse(
    200,
    new APIResponse(false, "", setParentNameInMasterArray("accountHeads", nta))
  );
};

export const getFeesHeadByIdFunction = async (event: APIGatewayProxyEvent) => {
  const nta = await getNTAFromEvent(event);
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

export const getFeesTypeByIdFunction = async (event: APIGatewayProxyEvent) => {
  const nta = await getNTAFromEvent(event);
  const feesTypeId = event.pathParameters?.id;
  return createResponse(
    200,
    new APIResponse(
      false,
      "",
      nta.masters.feeTypeNames.find((feeType) => feeType.id === feesTypeId)
    )
  );
};

export const getAccountsHeadByIdFunction = async (
  event: APIGatewayProxyEvent
) => {
  const nta = await getNTAFromEvent(event);
  const accountsHeadId = event.pathParameters?.id;
  return createResponse(
    200,
    new APIResponse(
      false,
      "",
      nta.masters.accountHeads.find(
        (accountsHead) => accountsHead.id === accountsHeadId
      )
    )
  );
};

// Delete Functions

export const deleteFeesHeadByIdFunction = async (
  event: APIGatewayProxyEvent
) => {
  const nta = await getNTAFromEvent(event);
  const feesHeadId = event.pathParameters?.id + "";
  return deleteItemFromNTAMasters(feesHeadId, "feesHeadNames", nta)
    ? await processDynamoDBResponse(saveNTAAuthority(nta))
    : createResponse(
        200,
        new APIResponse(true, "Fees Head Does Not Exist", null)
      );
};

export const deleteFeesTypeByIdFunction = async (
  event: APIGatewayProxyEvent
) => {
  const nta = await getNTAFromEvent(event);
  const feesTypeId = event.pathParameters?.id + "";
  return deleteItemFromNTAMasters(feesTypeId, "feeTypeNames", nta)
    ? await processDynamoDBResponse(saveNTAAuthority(nta))
    : createResponse(
        200,
        new APIResponse(true, "Fees Type Does Not Exist", null)
      );
};

export const deleteAccountsHeadByIdFunction = async (
  event: APIGatewayProxyEvent
) => {
  const nta = await getNTAFromEvent(event);
  const accountsId = event.pathParameters?.id + "";
  return deleteItemFromNTAMasters(accountsId, "accountHeads", nta)
    ? await processDynamoDBResponse(saveNTAAuthority(nta))
    : createResponse(
        200,
        new APIResponse(true, "Accounts Head Does Not Exist", null)
      );
};

export const editFeesHeadByIdFunction = async (
  body: CreateFeesHeadRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const nta = await getNTAFromEvent(event);
  const feesHeadId = event.pathParameters?.id + "";
  const feesHead = createEditFeesHead(userId, body);
  return editNTAMasterItem(feesHeadId, feesHead, "feesHeadNames", nta)
    ? processDynamoDBResponse(saveNTAAuthority(nta))
    : createResponse(
        200,
        new APIResponse(true, "Fees Head Does Not Exist", null)
      );
};

export const editFeesTypeByIdFunction = async (
  body: CreateFeesTypeMasterRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const nta = await getNTAFromEvent(event);
  const feesTypeId = event.pathParameters?.id + "";
  const feesType = createEditFeesType(userId, body);
  return editNTAMasterItem(feesTypeId, feesType, "feeTypeNames", nta)
    ? processDynamoDBResponse(saveNTAAuthority(nta))
    : createResponse(
        200,
        new APIResponse(true, "Fees Type Does Not Exist", null)
      );
};

export const editAccountsHeadByIdFunction = async (
  body: CreateAccountsHeadMasterRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const nta = await getNTAFromEvent(event);
  const accountsHeadId = event.pathParameters?.id + "";
  const accountsHead = createEditAccountHead(userId, body);
  return editNTAMasterItem(accountsHeadId, accountsHead, "accountHeads", nta)
    ? processDynamoDBResponse(saveNTAAuthority(nta))
    : createResponse(
        200,
        new APIResponse(true, "Accounts Head Does Not Exist", null)
      );
};

export const statusChangeofFeesHeadByIdFunction = async (
  body: StatusChangeRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const nta = await getNTAFromEvent(event);
  const feesHeadId = event.pathParameters?.id + "";
  return editNTAMasterItem(
    feesHeadId,
    { isActive: body.isActive, updated_by: userId },
    "feesHeadNames",
    nta
  )
    ? processDynamoDBResponse(saveNTAAuthority(nta))
    : createResponse(
        200,
        new APIResponse(true, "Fees Head Does Not Exist", null)
      );
};

export const statusChangeofFeesTypeByIdFunction = async (
  body: StatusChangeRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const nta = await getNTAFromEvent(event);
  const feesTypeId = event.pathParameters?.id + "";
  return editNTAMasterItem(
    feesTypeId,
    { isActive: body.isActive, updated_by: userId },
    "feeTypeNames",
    nta
  )
    ? processDynamoDBResponse(saveNTAAuthority(nta))
    : createResponse(
        200,
        new APIResponse(true, "Fees Type Does Not Exist", null)
      );
};

export const statusChangeofAccountHeadByIdFunction = async (
  body: StatusChangeRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const nta = await getNTAFromEvent(event);
  const accountHeadId = event.pathParameters?.id + "";
  return editNTAMasterItem(
    accountHeadId,
    { isActive: body.isActive, updated_by: userId },
    "accountHeads",
    nta
  )
    ? processDynamoDBResponse(saveNTAAuthority(nta))
    : createResponse(
        200,
        new APIResponse(true, "Accounts Head Does Not Exist", null)
      );
};

export const checkIfNTAFeesHeadMasterExistsFunction = async (
  event: APIGatewayProxyEvent
) => {
  const ntaId = getNTAIdFromEvent(event);
  const requestBody = parseBody<{ name: string; institutionTypeId: ObjectId }>(
    event.body
  );
  const feesHeadName = requestBody?.name || "";
  const institutionTypeId = requestBody?.institutionTypeId || "";
  return await processDynamoDBResponse(
    checkIfMasterListItemExistsByName(
      ntaId,
      "FEE_HEAD_MASTER",
      feesHeadName,
      institutionTypeId
    )
  );
};

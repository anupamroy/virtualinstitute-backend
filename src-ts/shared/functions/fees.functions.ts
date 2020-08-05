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
import { saveNTAAuthority } from "./nta.functions";
import { addItemToNTAMasters } from "./nta-masters.functions";
import {
  CreateAccountsHeadMasterRequest,
  APIResponse,
} from "../model/request-method.model";
import { createResponse } from "../helpers/handler-common";
import {
  getNTAFromEvent,
  getNTAIdFromEvent,
  getNTAMasterList,
} from "../helpers/general.helpers";
import { getFeesHeadRangeKey } from "../transforms/fees.transform";
import { getIdFromURLEvent } from "../helpers/general.helpers";
import {
  getNTAObjectById,
  setUpdationDetailsOfObject,
} from "../helpers/general.helpers";
import { StatusChangeRequest } from "../model/request-method.model";
import { FeesHeadName, FeeType } from "../model/DB/imports/masters.model";
import { AccountHead } from "../model/DB/institute.DB.model";

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
  const ntaId = await getNTAIdFromEvent(event);
  return await processDynamoDBResponse(
    getNTAMasterList(ntaId, "FEE_TYPE_MASTER")
  );
};
export const getAccountsHeadListFunction = async (
  event: APIGatewayProxyEvent
) => {
  const ntaId = await getNTAIdFromEvent(event);
  return await processDynamoDBResponse(
    getNTAMasterList(ntaId, "ACCOUNTS_HEAD_MASTER")
  );
};


// Delete Functions

export const deleteFeesHeadByIdFunction = async (
  event: APIGatewayProxyEvent
) => {
  return await processDynamoDBResponse(deleteNTAObjectFromEvent(event));
};

export const deleteFeesTypeByIdFunction = async (
  event: APIGatewayProxyEvent
) => {
  return await processDynamoDBResponse(deleteNTAObjectFromEvent(event));
};

export const deleteAccountsHeadByIdFunction = async (
  event: APIGatewayProxyEvent
) => {
  return await processDynamoDBResponse(deleteNTAObjectFromEvent(event));
};

export const editFeesHeadByIdFunction = async (
  body: CreateFeesHeadRequest,
  event: APIGatewayProxyEvent
) => {
  const feesHead = await getNTAObjectFromEvent<FeesHeadName>(event);
  feesHead.name = body.name;
  feesHead.instituteTypeId = body.institutionTypeId;
  feesHead.parentId = body.parentId;
  setUpdationDetailsOfObject(feesHead, event);
  return await processDynamoDBResponse(
    DynamoDBActions.putItem(feesHead, TABLE_NAMES.instituteTable)
  );
};

export const editFeesTypeByIdFunction = async (
  body: CreateFeesTypeMasterRequest,
  event: APIGatewayProxyEvent
) => {
  const feesType = await getNTAObjectFromEvent<FeeType>(event);
  feesType.name = body.name;
  setUpdationDetailsOfObject(feesType, event);
  return await processDynamoDBResponse(
    DynamoDBActions.putItem(feesType, TABLE_NAMES.instituteTable)
  );
};

export const editAccountsHeadByIdFunction = async (
  body: CreateAccountsHeadMasterRequest,
  event: APIGatewayProxyEvent
) => {
  const accountsHead = await getNTAObjectFromEvent<AccountHead>(event);
  accountsHead.name = body.name;
  accountsHead.parentId = body.parentId;
  setUpdationDetailsOfObject(accountsHead, event);
  return await processDynamoDBResponse(
    DynamoDBActions.putItem(accountsHead, TABLE_NAMES.instituteTable)
  );
};

export const statusChangeofFeesHeadByIdFunction = async (
  body: StatusChangeRequest,
  event: APIGatewayProxyEvent
) => {
  const feesHead = await getNTAObjectFromEvent<FeesHeadName>(event);
  feesHead.isActive = body.isActive;
  setUpdationDetailsOfObject(feesHead, event);
  return await processDynamoDBResponse(
    DynamoDBActions.putItem(feesHead, TABLE_NAMES.instituteTable)
  );
};

export const statusChangeofFeesTypeByIdFunction = async (
  body: StatusChangeRequest,
  event: APIGatewayProxyEvent
) => {
  const feesType = await getNTAObjectFromEvent<FeeType>(event);
  feesType.isActive = body.isActive;
  setUpdationDetailsOfObject(feesType, event);
  return await processDynamoDBResponse(
    DynamoDBActions.putItem(feesType, TABLE_NAMES.instituteTable)
  );
};

export const statusChangeofAccountHeadByIdFunction = async (
  body: StatusChangeRequest,
  event: APIGatewayProxyEvent
) => {
  const accountsHead = await getNTAObjectFromEvent<AccountHead>(event);
  accountsHead.isActive = body.isActive;
  setUpdationDetailsOfObject(accountsHead, event);
  return await processDynamoDBResponse(
    DynamoDBActions.putItem(accountsHead, TABLE_NAMES.instituteTable)
  );
};

// TODO: modify this
// export const checkIfNTAFeesHeadMasterExistsFunction = async (
//   event: APIGatewayProxyEvent
// ) => {
//   const ntaId = getNTAIdFromEvent(event);
//   const requestBody = parseBody<{ name: string; institutionTypeId: ObjectId }>(
//     event.body
//   );
//   const feesHeadName = requestBody?.name || "";
//   const institutionTypeId = requestBody?.institutionTypeId || "";
//   return await processDynamoDBResponse(
//     checkIfMasterListItemExistsByName(
//       ntaId,
//       "FEE_HEAD_MASTER",
//       feesHeadName,
//       institutionTypeId
//     )
//   );
// };

export const getNTAObjectFromEvent = async <T>(event: APIGatewayProxyEvent) => {
  const ntaId = getNTAIdFromEvent(event);
  const objectId = getIdFromURLEvent(event);
  return await getNTAObjectById<T>(objectId, ntaId);
};

// TODO Delete Child Items After Deleting a Parent
export const deleteNTAObjectFromEvent = async (event: APIGatewayProxyEvent) => {
  const ntaId = getNTAIdFromEvent(event);
  const objectId = getIdFromURLEvent(event);
  const params = {
    tableType: `#NTA#${ntaId}`,
    id: objectId,
  };
  return await DynamoDBActions.delete(params, TABLE_NAMES.instituteTable);
};

// TODO Write this function
// export const getChildMasters = async (parentId: ObjectId, masterType: TableName) => {
//   return DynamoDBActions.query()
// }

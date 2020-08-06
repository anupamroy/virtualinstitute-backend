import {
  CreateFeesHeadRequest,
  CreateFeesTypeMasterRequest,
  APIResponse,
} from '../model/request-method.model';
import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  createNewFeesType,
  createNewAccountHead,
  createNewFeesHead,
  getFeesTypeRangeKey,
} from '../transforms/fees.transform';
import {
  processDynamoDBResponse,
  DynamoDBActions,
} from '../helpers/db-handler';
import { TABLE_NAMES } from '../constants/common-vars';
import { CreateAccountsHeadMasterRequest } from '../model/request-method.model';
import { parseBody, createResponse } from '../helpers/handler-common';
import {
  getNTAIdFromEvent,
  getNTAMasterList,
  checkIfMasterListItemExistsByName,
  checkIfMasterListitemExistsById,
  checkIfMasterExistsByIdQuery,
  sanitizeString,
} from '../helpers/general.helpers';
import {
  getFeesHeadRangeKey,
  getAccountsHeadRangeKey,
} from '../transforms/fees.transform';
import { getIdFromURLEvent } from '../helpers/general.helpers';
import {
  getNTAObjectById,
  setUpdationDetailsOfObject,
} from '../helpers/general.helpers';
import { StatusChangeRequest } from '../model/request-method.model';
import { FeesHeadName, FeeType } from '../model/DB/imports/masters.model';
import { AccountHead } from '../model/DB/institute.DB.model';
import { ObjectId, TableName } from '../model/DB/imports/types.DB.model';
import { ChildMasterItem } from '../model/DB/imports/misc.DB.model';

export const createFeesHeadFunction = async (
  body: CreateFeesHeadRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const ntaId = getNTAIdFromEvent(event);
  const institutionType =
    body.institutionTypeId &&
    (await checkIfMasterListitemExistsById(
      ntaId,
      `#MASTER#MASTER_TYPE#INSTITUTE_TYPE_MASTER#MASTER_ID#${body.institutionTypeId}`
    ));
  const parentMaster =
    body.parentId &&
    (await checkIfMasterListitemExistsById(ntaId, body.parentId));
  if (body.institutionTypeId && !institutionType) {
    return createResponse(
      200,
      new APIResponse(true, 'Institution Type Does not exist')
    );
  } else if (body.parentId && !parentMaster) {
    return createResponse(
      200,
      new APIResponse(true, 'Parent Fees head Does not exist')
    );
  } else if (sanitizeString(body.name) !== body.name) {
    return createResponse(
      200,
      new APIResponse(
        true,
        'Fees head name should not contain any special characters.'
      )
    );
  } else if (
    await checkIfMasterListItemExistsByName(
      ntaId,
      'FEE_HEAD_MASTER',
      sanitizeString(body.name),
      body.institutionTypeId || ''
    )
  ) {
    return createResponse(
      200,
      new APIResponse(true, 'Fees head name already exists')
    );
  } else {
    const feesHead = createNewFeesHead(userId, body);
    feesHead.id = getFeesHeadRangeKey(feesHead);
    feesHead.tableType = `#NTA#${ntaId}`;
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(feesHead, TABLE_NAMES.instituteTable)
    );
  }
};
export const createFeesTypeFunction = async (
  body: CreateFeesTypeMasterRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const feeType = createNewFeesType(userId, body);
  const ntaId = getNTAIdFromEvent(event);
  if (sanitizeString(body.name) !== body.name) {
    return createResponse(
      200,
      new APIResponse(
        true,
        'Fees Type name should not contain any special characters.'
      )
    );
  } else {
    feeType.id = getFeesTypeRangeKey(feeType);
    feeType.tableType = `#NTA#${ntaId}`;
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(feeType, TABLE_NAMES.instituteTable)
    );
  }
};
export const createAccountHeadFunction = async (
  body: CreateAccountsHeadMasterRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const ntaId = getNTAIdFromEvent(event);
  const parentMaster =
    body.parentId &&
    (await checkIfMasterListitemExistsById(ntaId, body.parentId));
  if (body.parentId && !parentMaster) {
    return createResponse(
      200,
      new APIResponse(true, 'Parent Accounts head Does not exist')
    );
  } else if (sanitizeString(body.name) !== body.name) {
    return createResponse(
      200,
      new APIResponse(
        true,
        'Accounts head name should not contain any special characters.'
      )
    );
  } else {
    const accountHead = createNewAccountHead(userId, body);
    accountHead.id = getAccountsHeadRangeKey(accountHead);
    accountHead.tableType = `#NTA#${ntaId}`;
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(accountHead, TABLE_NAMES.instituteTable)
    );
  }
};

// Get list
export const getFeesHeadListFunction = async (event: APIGatewayProxyEvent) => {
  const ntaId = getNTAIdFromEvent(event);
  const feesHeadList = await getNTAMasterList<FeesHeadName>(
    ntaId,
    'FEE_HEAD_MASTER'
  );
  for (let feesHead of feesHeadList) {
    await setParentNameInmaster(feesHead, ntaId);
  }
  return createResponse(
    200,
    new APIResponse(
      false,
      '',
      feesHeadList.filter((feesHead) => !feesHead.isDeleted)
    )
  );
};

export const getFeesTypeListFunction = async (event: APIGatewayProxyEvent) => {
  const ntaId = getNTAIdFromEvent(event);
  return await processDynamoDBResponse(
    getNTAMasterList(ntaId, 'FEE_TYPE_MASTER').then((feesTypeList: any) =>
      feesTypeList.filter((feesType: any) => !feesType.isDeleted)
    )
  );
};
export const getAccountsHeadListFunction = async (
  event: APIGatewayProxyEvent
) => {
  const ntaId = getNTAIdFromEvent(event);
  return await processDynamoDBResponse(
    getNTAMasterList(ntaId, 'ACCOUNTS_HEAD_MASTER').then((accountsHeadList) =>
      accountsHeadList.filter((accountsHead: any) => !accountsHead.isDeleted)
    )
  );
};

export const getInstituteTypeListFunction = async (
  event: APIGatewayProxyEvent
) => {
  const ntaId = getNTAIdFromEvent(event);
  return await processDynamoDBResponse(
    getNTAMasterList(ntaId, 'INSTITUTE_TYPE_MASTER')
  );
};

// Check If Master Exists
export const checkIfFeesHeadExistsFunction = async (
  event: APIGatewayProxyEvent
) => {
  const ntaId = getNTAIdFromEvent(event);
  const body = parseBody<{ name: string; institutionTypeId: ObjectId }>(
    event.body
  );
  return await processDynamoDBResponse(
    checkIfMasterListItemExistsByName(
      ntaId,
      'FEE_HEAD_MASTER',
      sanitizeString(body?.name || ''),
      body?.institutionTypeId || ''
    )
  );
};

export const checkIfNTAFeesTypeExistsFunction = async (
  event: APIGatewayProxyEvent
) => {
  const ntaId = getNTAIdFromEvent(event);
  const body = parseBody<{ name: string }>(event.body);
  return await processDynamoDBResponse(
    checkIfMasterListItemExistsByName(
      ntaId,
      'FEE_TYPE_MASTER',
      body?.name || ''
    )
  );
};

export const checkIfNtaAccountsHeadExistsFunction = async (
  event: APIGatewayProxyEvent
) => {
  const ntaId = getNTAIdFromEvent(event);
  const body = parseBody<{ name: string; institutionTypeId: ObjectId }>(
    event.body
  );
  return await processDynamoDBResponse(
    checkIfMasterListItemExistsByName(
      ntaId,
      'ACCOUNTS_HEAD_MASTER',
      body?.name || ''
    )
  );
};

// Get By Id
export const getFeesHeadByIdFunction = async (event: APIGatewayProxyEvent) => {
  const object = await getNTAObjectFromEvent(event);
  if (object) {
    return createResponse(200, new APIResponse(false, '', object));
  } else {
    return createResponse(
      200,
      new APIResponse(true, 'Fees head does not Exist')
    );
  }
};

export const getFeesTypeByIdFunction = async (event: APIGatewayProxyEvent) => {
  const object = await getNTAObjectFromEvent(event);
  if (object) {
    return createResponse(200, new APIResponse(false, '', object));
  } else {
    return createResponse(
      200,
      new APIResponse(true, 'Fees head does not Exist')
    );
  }
};

export const getAccountsHeadByIdFunction = async (
  event: APIGatewayProxyEvent
) => {
  const object = await getNTAObjectFromEvent(event);
  if (object) {
    return createResponse(200, new APIResponse(false, '', object));
  } else {
    return createResponse(
      200,
      new APIResponse(true, 'Fees head does not Exist')
    );
  }
};

// Delete By Id Functions
export const deleteFeesHeadByIdFunction = async (
  event: APIGatewayProxyEvent
) => {
  const feesHead = await getNTAObjectFromEvent<FeesHeadName>(event);
  if (feesHead) {
    feesHead.isDeleted = true;
    setUpdationDetailsOfObject(feesHead, event);
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(feesHead, TABLE_NAMES.instituteTable)
    );
  } else {
    return createResponse(
      200,
      new APIResponse(true, 'Fees Head does not exist')
    );
  }
};
export const deleteFeesTypeByIdFunction = async (
  event: APIGatewayProxyEvent
) => {
  const feesType = await getNTAObjectFromEvent<FeeType>(event);
  if (feesType) {
    feesType.isDeleted = true;
    setUpdationDetailsOfObject(feesType, event);
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(feesType, TABLE_NAMES.instituteTable)
    );
  } else {
    return createResponse(
      200,
      new APIResponse(true, 'Fees Type Does not exist')
    );
  }
};
export const deleteAccountsHeadByIdFunction = async (
  event: APIGatewayProxyEvent
) => {
  const accountsHead = await getNTAObjectFromEvent<AccountHead>(event);
  if (accountsHead) {
    accountsHead.isDeleted = true;
    setUpdationDetailsOfObject(accountsHead, event);
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(accountsHead, TABLE_NAMES.instituteTable)
    );
  } else {
    return createResponse(
      200,
      new APIResponse(true, 'Accounts Head does not exist')
    );
  }
};

// Edit by Id
export const editFeesHeadByIdFunction = async (
  body: CreateFeesHeadRequest,
  event: APIGatewayProxyEvent
) => {
  const feesHead = await getNTAObjectFromEvent<FeesHeadName>(event);
  if (feesHead) {
    feesHead.name = body.name;
    feesHead.instituteTypeId = body.institutionTypeId;
    feesHead.parentId = body.parentId;
    setUpdationDetailsOfObject(feesHead, event);
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(feesHead, TABLE_NAMES.instituteTable)
    );
  } else {
    return createResponse(
      200,
      new APIResponse(true, 'Fees Head does not exist')
    );
  }
};
export const editFeesTypeByIdFunction = async (
  body: CreateFeesTypeMasterRequest,
  event: APIGatewayProxyEvent
) => {
  const feesType = await getNTAObjectFromEvent<FeeType>(event);
  if (feesType) {
    feesType.name = body.name;
    setUpdationDetailsOfObject(feesType, event);
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(feesType, TABLE_NAMES.instituteTable)
    );
  } else {
    return createResponse(
      200,
      new APIResponse(true, 'Fees Type Does not exist')
    );
  }
};
export const editAccountsHeadByIdFunction = async (
  body: CreateAccountsHeadMasterRequest,
  event: APIGatewayProxyEvent
) => {
  const accountsHead = await getNTAObjectFromEvent<AccountHead>(event);
  if (accountsHead) {
    accountsHead.name = body.name;
    accountsHead.parentId = body.parentId;
    setUpdationDetailsOfObject(accountsHead, event);
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(accountsHead, TABLE_NAMES.instituteTable)
    );
  } else {
    return createResponse(
      200,
      new APIResponse(true, 'Accounts Head does not exist')
    );
  }
};

// Status Change By id
export const statusChangeofFeesHeadByIdFunction = async (
  body: StatusChangeRequest,
  event: APIGatewayProxyEvent
) => {
  const feesHead = await getNTAObjectFromEvent<FeesHeadName>(event);
  if (feesHead) {
    feesHead.isActive = body.isActive;
    setUpdationDetailsOfObject(feesHead, event);
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(feesHead, TABLE_NAMES.instituteTable)
    );
  } else {
    return createResponse(
      200,
      new APIResponse(true, 'Fees Head does not exist')
    );
  }
};
export const statusChangeofFeesTypeByIdFunction = async (
  body: StatusChangeRequest,
  event: APIGatewayProxyEvent
) => {
  const feesType = await getNTAObjectFromEvent<FeeType>(event);
  if (feesType) {
    feesType.isActive = body.isActive;
    setUpdationDetailsOfObject(feesType, event);
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(feesType, TABLE_NAMES.instituteTable)
    );
  } else {
    return createResponse(
      200,
      new APIResponse(true, 'Fees Type Does not exist')
    );
  }
};
export const statusChangeofAccountHeadByIdFunction = async (
  body: StatusChangeRequest,
  event: APIGatewayProxyEvent
) => {
  const accountsHead = await getNTAObjectFromEvent<AccountHead>(event);
  if (accountsHead) {
    accountsHead.isActive = body.isActive;
    setUpdationDetailsOfObject(accountsHead, event);
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(accountsHead, TABLE_NAMES.instituteTable)
    );
  } else {
    return createResponse(
      200,
      new APIResponse(true, 'Accounts Head does not exist')
    );
  }
};

// Helpers
export const getNTAObjectFromEvent = async <T>(event: APIGatewayProxyEvent) => {
  const ntaId = getNTAIdFromEvent(event);
  const objectId = getIdFromURLEvent(event);
  return await getNTAObjectById<T>(objectId, ntaId);
};

export const setParentNameInmaster = async (
  master: ChildMasterItem,
  ntaId: ObjectId
) => {
  master.parentName = master.parentId
    ? (await getParentItemById(master.parentId + '', ntaId))?.name || ''
    : '';
  master.parentId = master.parentId ? decodeURI(master.parentId) : '';
  return master;
};

export const getParentItemById = async (
  parentIdURI: string,
  ntaId: ObjectId
) => {
  const parentId = decodeURI(parentIdURI);
  return await DynamoDBActions.query({
    TableName: TABLE_NAMES.instituteTable,
    KeyConditionExpression: 'tableType = :ntaItem and id = :id',
    ExpressionAttributeValues: {
      ':ntaItem': `#NTA#${ntaId}`,
      ':id': parentId,
    },
  }).then((result: { Items: any[] }) => result.Items[0]);
};

// TODO Delete Child Items After Deleting a Parent
export const deleteNTAObjectFromEvent = async (event: APIGatewayProxyEvent) => {
  const ntaId = getNTAIdFromEvent(event);
  const objectId = getIdFromURLEvent(event);
  const params = {
    Key: { id: objectId, tableType: `#NTA#${ntaId}` },
  };
  return await DynamoDBActions.delete(params, TABLE_NAMES.instituteTable);
};

export const checkIfInstituteTypeExists = async (instituteId: ObjectId) => {};

// TODO Write this function
// export const getChildMasters = async (parentId: ObjectId, masterType: TableName) => {
//   return DynamoDBActions.query()
// }

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
import { TABLE_NAMES, ERRORS } from '../constants/common-vars';
import { CreateAccountsHeadMasterRequest } from '../model/request-method.model';
import {
  parseBody,
  createResponse,
  createErrorResponse,
} from '../helpers/handler-common';
import {
  getNTAIdFromEvent,
  getNTAMasterList,
  checkIfMasterListItemExistsByName,
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
import { ObjectId } from '../model/DB/imports/types.DB.model';
import { ChildMasterItem } from '../model/DB/imports/misc.DB.model';
import { conditionsAccountsHeadEdit } from '../conditions/nta-masters.conditions';
import {
  conditiondFeesHeadCreate,
  conditionFeesTypeCreate,
  conditionsAccountsHead,
  conditionFeesHeadEdit,
  conditionsAccountsHeadCreate,
  conditionFeesTypeEdit,
} from '../conditions/nta-masters.conditions';

export const createFeesHeadFunction = async (
  body: CreateFeesHeadRequest,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  const ntaId = getNTAIdFromEvent(event);
  const error = await conditiondFeesHeadCreate(body, ntaId);
  if (error) {
    return error;
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
  const error = await conditionFeesTypeCreate(body, ntaId);
  if (error) {
    return error;
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
  const error = await conditionsAccountsHeadCreate(body, ntaId);
  if (error) {
    return error;
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
    await setParentNameInMaster(feesHead, ntaId);
    await setInstituteNameInMaster(feesHead, ntaId);
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
  const object = await getNTAObjectFromEvent<FeesHeadName>(event);
  if (object) {
    const ntaId = getNTAIdFromEvent(event);
    await setParentNameInMaster(object, ntaId);
    await setInstituteNameInMaster(object, ntaId);
    return createResponse(200, new APIResponse(false, '', object));
  } else {
    return createErrorResponse(ERRORS.FEES_HEAD_NO_EXISTS);
  }
};

export const getFeesTypeByIdFunction = async (event: APIGatewayProxyEvent) => {
  const object = await getNTAObjectFromEvent<FeeType>(event);
  if (object) {
    const ntaId = getNTAIdFromEvent(event);
    await setParentNameInMaster(object, ntaId);
    return createResponse(200, new APIResponse(false, '', object));
  } else {
    return createErrorResponse(ERRORS.FEES_TYPE_NO_EXIST);
  }
};

export const getAccountsHeadByIdFunction = async (
  event: APIGatewayProxyEvent
) => {
  const object = await getNTAObjectFromEvent<AccountHead>(event);
  if (object) {
    const ntaId = getNTAIdFromEvent(event);
    await setParentNameInMaster(object, ntaId);
    return createResponse(200, new APIResponse(false, '', object));
  } else {
    return createErrorResponse(ERRORS.ACCOUNTS_HEAD_NO_EXISTS);
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
    return createErrorResponse(ERRORS.FEES_HEAD_NO_EXISTS);
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
    return createErrorResponse(ERRORS.FEES_TYPE_NO_EXIST);
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
    return createErrorResponse(ERRORS.ACCOUNTS_HEAD_NO_EXISTS);
  }
};

// Edit by Id
export const editFeesHeadByIdFunction = async (
  body: CreateFeesHeadRequest,
  event: APIGatewayProxyEvent
) => {
  const feesHead = await getNTAObjectFromEvent<FeesHeadName>(event);
  const ntaId = getNTAIdFromEvent(event);
  const feesHeadNewName = sanitizeString(body.name);
  if (feesHead) {
    const error = await conditionFeesHeadEdit(feesHead, body, ntaId);
    if (error) {
      return error;
    } else {
      feesHead.name = feesHeadNewName;
      feesHead.instituteTypeId = body.instituteTypeId;
      feesHead.parentId = body.parentId;
      setUpdationDetailsOfObject(feesHead, event);
      return await processDynamoDBResponse(
        DynamoDBActions.putItem(feesHead, TABLE_NAMES.instituteTable)
      );
    }
  } else {
    return createErrorResponse(ERRORS.FEES_HEAD_NO_EXISTS);
  }
};
export const editFeesTypeByIdFunction = async (
  body: CreateFeesTypeMasterRequest,
  event: APIGatewayProxyEvent
) => {
  const ntaId = getNTAIdFromEvent(event);
  const feesType = await getNTAObjectFromEvent<FeeType>(event);
  if (feesType) {
    const error = await conditionFeesTypeEdit(feesType, body, ntaId);
    if (error) {
      return error;
    } else {
      feesType.name = body.name;
      setUpdationDetailsOfObject(feesType, event);
      return await processDynamoDBResponse(
        DynamoDBActions.putItem(feesType, TABLE_NAMES.instituteTable)
      );
    }
  } else {
    return createErrorResponse(ERRORS.FEES_TYPE_NO_EXIST);
  }
};
export const editAccountsHeadByIdFunction = async (
  body: CreateAccountsHeadMasterRequest,
  event: APIGatewayProxyEvent
) => {
  const ntaId = getNTAIdFromEvent(event);
  const accountsHead = await getNTAObjectFromEvent<AccountHead>(event);
  if (accountsHead) {
    const error = await conditionsAccountsHeadEdit(accountsHead, body, ntaId);
    if (error) {
      return error;
    } else {
      accountsHead.name = body.name;
      accountsHead.parentId = body.parentId;
      setUpdationDetailsOfObject(accountsHead, event);
      return await processDynamoDBResponse(
        DynamoDBActions.putItem(accountsHead, TABLE_NAMES.instituteTable)
      );
    }
  } else {
    return createErrorResponse(ERRORS.ACCOUNTS_HEAD_NO_EXISTS);
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
    return createErrorResponse(ERRORS.FEES_HEAD_NO_EXISTS);
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
    return createErrorResponse(ERRORS.FEES_TYPE_NO_EXIST);
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
    return createErrorResponse(ERRORS.ACCOUNTS_HEAD_NO_EXISTS);
  }
};

// Helpers
export const getNTAObjectFromEvent = async <T>(event: APIGatewayProxyEvent) => {
  const ntaId = getNTAIdFromEvent(event);
  const objectId = getIdFromURLEvent(event);
  return await getNTAObjectById<T>(objectId, ntaId);
};

export const setParentNameInMaster = async (
  master: ChildMasterItem,
  ntaId: ObjectId
) => {
  master.parentName = master.parentId
    ? (await getParentItemById(master.parentId + '', ntaId))?.name || ''
    : '';
  master.parentId = master.parentId ? decodeURI(master.parentId) : '';
  return master;
};

export const setInstituteNameInMaster = async (
  master: FeesHeadName,
  ntaId: ObjectId
) => {
  master.instituteTypeName = master.instituteTypeId
    ? (await getInstituteById(master.instituteTypeId + '', ntaId))?.name || ''
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

export const getInstituteById = async (
  instituteIdURI: string,
  ntaId: ObjectId
) => {
  const instituteId = decodeURI(instituteIdURI);
  return await DynamoDBActions.query({
    TableName: TABLE_NAMES.instituteTable,
    KeyConditionExpression: 'tableType = :ntaItem and id = :id',
    ExpressionAttributeValues: {
      ':ntaItem': `#NTA#${ntaId}`,
      ':id': instituteId,
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

export const checkIfInstituteTypeExists = async () => {};

// TODO Write this function
// export const getChildMasters = async (parentId: ObjectId, masterType: TableName) => {
//   return DynamoDBActions.query()
// }

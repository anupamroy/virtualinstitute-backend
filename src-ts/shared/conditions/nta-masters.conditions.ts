import { ObjectId } from '../model/DB/imports/types.DB.model';
import {
  checkIfMasterListitemExistsById,
  sanitizeString,
  checkIfMasterListItemExistsByName,
} from '../helpers/general.helpers';
import {
  CreateFeesHeadRequest,
  CreateFeesTypeMasterRequest,
  CreateAccountsHeadMasterRequest,
} from '../model/request-method.model';
import { createErrorResponse } from '../helpers/handler-common';
import { ERRORS } from '../constants/common-vars';
import { FeesHeadName, FeeType } from '../model/DB/imports/masters.model';
import { AccountHead } from '../model/DB/institute.DB.model';
import { getNTAObjectById } from '../helpers/general.helpers';
export const conditiondFeesHeadCreate = async (
  body: CreateFeesHeadRequest,
  ntaId: ObjectId
) => {
  const error = await conditionsFeesHead(body, ntaId);
  if (error) {
    return error;
  } else if (await checkIfFeesHeadExists(ntaId, body)) {
    return createErrorResponse(ERRORS.FEES_HEAD_NAME_ALREADY_EXISTS);
  } else {
    return false;
  }
};

export const conditionFeesHeadEdit = async (
  feesHead: FeesHeadName,
  body: CreateFeesHeadRequest,
  ntaId: ObjectId
) => {
  const feesHeadNewName = sanitizeString(body.name);
  const error = await conditionsFeesHead(body, ntaId);
  if (error) {
    return error;
  } else if (
    feesHead.name !== feesHeadNewName &&
    (await checkIfFeesHeadExists(ntaId, body))
  ) {
    return createErrorResponse(ERRORS.FEES_HEAD_NAME_ALREADY_EXISTS);
  } else {
    return false;
  }
};

export const conditionsFeesHead = async (
  body: CreateFeesHeadRequest,
  ntaId: ObjectId
) => {
  const institutionType =
    body.instituteTypeId &&
    (await checkIfInstitutionTypeIdValid(ntaId, body.instituteTypeId));
  const parentMaster = await getNTAObjectById<FeesHeadName>(
    body.parentId,
    ntaId
  );
  if (body.instituteTypeId && !institutionType) {
    return createErrorResponse(ERRORS.INSTITUTION_TYPE_NO_EXIST);
  } else if (body.parentId && !parentMaster) {
    return createErrorResponse(ERRORS.PARENT_FEES_HEAD_NOT_EXIST);
  } else if (
    body.instituteTypeId &&
    parentMaster &&
    parentMaster.instituteTypeId !== body.instituteTypeId
  ) {
    return createErrorResponse(ERRORS.FEES_HEAD_INSTITUTE_ID_NO_MATCH_PARENT);
  } else if (sanitizeString(body.name) !== body.name) {
    return createErrorResponse(ERRORS.FEES_HEAD_NO_SPECIAL_CHARS);
  } else {
    return false;
  }
};

export const conditionFeesTypeCreate = async (
  body: CreateFeesTypeMasterRequest,
  ntaId: ObjectId
) => {
  const error = await conditionsFeesType(body, ntaId);
  if (error) {
    return error;
  } else if (await checkIfFeesTypeExists(ntaId, body)) {
    return createErrorResponse(ERRORS.FEES_TYPE_NAME_ALREADY_EXISTS);
  } else {
    return false;
  }
};

export const conditionFeesTypeEdit = async (
  feesType: FeeType,
  body: CreateFeesTypeMasterRequest,
  ntaId: ObjectId
) => {
  const feesTypeNewName = sanitizeString(body.name);
  const error = await conditionsFeesType(body, ntaId);
  if (error) {
    return error;
  } else if (
    feesTypeNewName !== feesType.name &&
    (await checkIfFeesTypeExists(ntaId, body))
  ) {
    return createErrorResponse(ERRORS.FEES_TYPE_NAME_ALREADY_EXISTS);
  } else {
    return false;
  }
};

export const conditionsFeesType = async (
  body: CreateFeesTypeMasterRequest,
  ntaId: ObjectId
) => {
  if (await checkIfFeesTypeExists(ntaId, body)) {
    return createErrorResponse(ERRORS.FEES_TYPE_NAME_ALREADY_EXISTS);
  } else if (sanitizeString(body.name) !== body.name) {
    return createErrorResponse(ERRORS.FEES_TYPE_NO_SPECIAL_CHARS);
  } else {
    return false;
  }
};

export const conditionsAccountsHeadCreate = async (
  body: CreateAccountsHeadMasterRequest,
  ntaId: ObjectId
) => {
  const error = await conditionsAccountsHead(body, ntaId);
  if (error) {
    return error;
  } else if (await checkIfAccountsHeadExists(ntaId, body)) {
    return createErrorResponse(ERRORS.ACCOUNTS_HEAD_NAME_ALREADY_EXISTS);
  } else {
    return false;
  }
};

export const conditionsAccountsHeadEdit = async (
  accountsHead: AccountHead,
  body: CreateAccountsHeadMasterRequest,
  ntaId: ObjectId
) => {
  const accountsHeadName = sanitizeString(body.name);
  const error = await conditionsAccountsHead(body, ntaId);
  if (error) {
    return error;
  } else if (
    accountsHeadName !== accountsHead.name &&
    (await checkIfAccountsHeadExists(ntaId, body))
  ) {
    return createErrorResponse(ERRORS.ACCOUNTS_HEAD_NAME_ALREADY_EXISTS);
  } else {
    return false;
  }
};

export const conditionsAccountsHead = async (
  body: CreateAccountsHeadMasterRequest,
  ntaId: ObjectId
) => {
  const parentMaster =
    body.parentId &&
    (await checkIfMasterListitemExistsById(ntaId, body.parentId));
  if (body.parentId && !parentMaster) {
    return createErrorResponse(ERRORS.PARENT_ACCOUNT_HEAD_NO_EXISTS);
  } else if (sanitizeString(body.name) !== body.name) {
    return createErrorResponse(ERRORS.ACCOUNTS_HEAD_NO_SPECIAL_CHARS);
  } else {
    return false;
  }
};

export const checkIfInstitutionTypeIdValid = async (
  ntaId: ObjectId,
  instituteTypeId: ObjectId
) => {
  return await checkIfMasterListitemExistsById(
    ntaId,
    `#MASTER#MASTER_TYPE#INSTITUTE_TYPE_MASTER#MASTER_ID#${instituteTypeId}`
  );
};

export const checkIfFeesHeadExists = async (
  ntaId: ObjectId,
  body: CreateFeesHeadRequest
) => {
  return await checkIfMasterListItemExistsByName(
    ntaId,
    'FEE_HEAD_MASTER',
    sanitizeString(body.name),
    body.instituteTypeId || ''
  );
};

export const checkIfFeesTypeExists = async (
  ntaId: ObjectId,
  body: CreateFeesTypeMasterRequest
) => {
  return await checkIfMasterListItemExistsByName(
    ntaId,
    'FEE_TYPE_MASTER',
    sanitizeString(body.name)
  );
};

export const checkIfAccountsHeadExists = async (
  ntaId: ObjectId,
  body: CreateAccountsHeadMasterRequest
) => {
  return await checkIfMasterListItemExistsByName(
    ntaId,
    'ACCOUNTS_HEAD_MASTER',
    sanitizeString(body.name)
  );
};

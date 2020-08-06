import { FeesHeadName, FeeType } from '../model/DB/imports/masters.model';
import { AccountHead } from '../model/DB/institute.DB.model';
import {
  sanitizeString,
  getNTAMasterRangeKey,
} from '../helpers/general.helpers';
import {
  CreateFeesHeadRequest,
  CreateFeesTypeMasterRequest,
  CreateAccountsHeadMasterRequest,
} from '../model/request-method.model';

export const createNewFeesHead = (
  userId: string,
  body: CreateFeesHeadRequest
) => {
  const feesHead = new FeesHeadName();
  feesHead.created_by = userId;
  feesHead.updated_by = userId;
  feesHead.name = sanitizeString(body.name);
  feesHead.parentId = encodeURI(body.parentId);
  feesHead.instituteTypeId = body.instituteTypeId;
  return feesHead;
};

export const createNewFeesType = (
  userId: string,
  body: CreateFeesTypeMasterRequest
) => {
  const feeType = new FeeType();
  feeType.created_by = userId;
  feeType.updated_by = userId;
  feeType.name = sanitizeString(body.name);
  return feeType;
};

export const createNewAccountHead = (
  userId: string,
  body: CreateAccountsHeadMasterRequest
) => {
  const accountHead = new AccountHead();
  accountHead.created_by = userId;
  accountHead.updated_by = userId;
  accountHead.name = sanitizeString(body.name);
  accountHead.parentId = body.parentId;
  return accountHead;
};

export const createEditFeesHead = (userId: string, body: any) => {
  const feesHead = {
    updated_by: userId,
    name: sanitizeString(body.name),
    parentId: body.parentId,
    instituteTypeId: body.institutionTypeId,
    updated_at: new Date().toISOString(),
  };
  return feesHead;
};

export const createEditFeesType = (userId: string, body: any) => {
  const feeType = {
    updated_by: userId,
    name: sanitizeString(body.name),
    updated_at: new Date().toISOString(),
  };
  return feeType;
};

export const createEditAccountHead = (userId: string, body: any) => {
  const accountHead = {
    updated_by: userId,
    name: sanitizeString(body.name),
    parentId: body.parentId,
    updated_at: new Date().toISOString(),
  };
  return accountHead;
};

export const getFeesHeadRangeKey = (feeHead: FeesHeadName) => {
  return getNTAMasterRangeKey(
    'FEE_HEAD_MASTER',
    feeHead.id,
    feeHead.parentId,
    feeHead.instituteTypeId
  );
};

export const getFeesTypeRangeKey = (feesType: FeeType) => {
  return getNTAMasterRangeKey('FEE_TYPE_MASTER', feesType.id);
};

export const getAccountsHeadRangeKey = (accountsHead: AccountHead) => {
  return getNTAMasterRangeKey(
    'ACCOUNTS_HEAD_MASTER',
    accountsHead.id,
    accountsHead.parentId
  );
};

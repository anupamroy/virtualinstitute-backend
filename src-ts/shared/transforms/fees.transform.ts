import { FeesHeadName, FeeType } from "../model/DB/imports/masters.model";
import { AccountHead } from "../model/DB/institute.DB.model";

export const createNewFeesHead = (userId: string, body: any) => {
  const feesHead = new FeesHeadName();
  feesHead.created_by = userId;
  feesHead.updated_by = userId;
  feesHead.name = body.name;
  feesHead.parentId = body.parentId;
  feesHead.instituteTypeId = body.institutionTypeId;
  return feesHead;
};

export const createNewFeesType = (userId: string, body: any) => {
  const feeType = new FeeType();
  feeType.created_by = userId;
  feeType.updated_by = userId;
  feeType.name = body.name;
  return feeType;
};

export const createNewAccountHead = (userId: string, body: any) => {
  const accountHead = new AccountHead();
  accountHead.created_by = userId;
  accountHead.updated_by = userId;
  accountHead.name = body.name;
  accountHead.parentId = body.parentId;
  return accountHead;
};

export const createEditFeesHead = (userId: string, body: any) => {
  const feesHead = new FeesHeadName();
  feesHead.updated_by = userId;
  feesHead.name = body.name;
  feesHead.parentId = body.parentId;
  feesHead.instituteTypeId = body.institutionTypeId;
  return feesHead;
};


export const createEditFeesType = (userId: string, body: any) => {
  const feeType = new FeeType();
  feeType.updated_by = userId;
  feeType.name = body.name;
  return feeType;
};

export const createEditAccountHead = (userId: string, body: any) => {
  const accountHead = new AccountHead();
  accountHead.updated_by = userId;
  accountHead.name = body.name;
  accountHead.parentId = body.parentId;
  return accountHead;
};
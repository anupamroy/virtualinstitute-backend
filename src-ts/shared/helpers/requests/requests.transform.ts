import { FeesHeadName } from "../../model/DB/imports/masters.model";

export const createNewFeesHead = (userId: string, body: any) => {
  const feesHead = new FeesHeadName();
  feesHead.created_by = userId;
  feesHead.updated_by = userId;
  feesHead.name = body.name;
  feesHead.parentId = body.parentId;
  feesHead.instituteTypeId = body.institutionTypeId;
  return feesHead;
};

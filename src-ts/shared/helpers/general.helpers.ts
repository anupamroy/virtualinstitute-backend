import { DynamoDBActions } from "./db-handler";
import { NTA_MASTER_SET_ID, TABLE_NAMES } from "../constants/common-vars";
import { FeesHeadName } from "../model/DB/imports/masters.model";
import { NTAMasters } from "../model/DB/institute.DB.model";

// General Helpers
export const checkIFNTAMastersExist = () =>
  DynamoDBActions.get({ id: NTA_MASTER_SET_ID }, TABLE_NAMES.instituteTable);

export const getNTAMasters = () =>
  DynamoDBActions.get({ id: NTA_MASTER_SET_ID }, TABLE_NAMES.instituteTable);

export const setNTAMasters = (NTAMasters: NTAMasters) =>
  DynamoDBActions.putItem(NTAMasters, TABLE_NAMES.instituteTable);

export const createNewFeesHead = (userId: string, body: any) => {
  const feesHead = new FeesHeadName();
  feesHead.created_by = userId;
  feesHead.updated_by = userId;
  feesHead.name = body.name;
  feesHead.parentId = body.parentId;
  feesHead.instituteTypeId = body.institutionTypeId;
  return feesHead;
};

export const addItemToNTAMasters = <T>(
  item: T,
  masterArrayName: keyof NTAMasters,
  NTAMasters: NTAMasters
) => {
  const masterArray = NTAMasters[masterArrayName] as any[];
  console.log("masterArray");
  console.log(masterArray);
//   const matchedItem = masterArray.find(
//     (arrayItem: T) => (arrayItem as any).id === (item as any).id
//   );
//   if (matchedItem) {
//     Object.keys(matchedItem).forEach((key) => {
//       (matchedItem as any)[key] = (item as any)[key];
//     });
//   } else {
//     masterArray.push(item);
//   }
};

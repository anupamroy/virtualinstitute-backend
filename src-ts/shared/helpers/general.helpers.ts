import { DynamoDBActions } from "./db-handler";
import { NTA_MASTER_SET_ID, TABLE_NAMES } from "../constants/common-vars";
import { NTAMasters } from "../model/DB/nta.DB.model";
import { TableName } from "../model/DB/imports/types.DB.model";

// General Helpers
export const checkIFNTAMastersExist = () =>
  DynamoDBActions.get({ id: NTA_MASTER_SET_ID }, TABLE_NAMES.instituteTable);

export const getNTAMasters = () =>
  DynamoDBActions.get({ id: NTA_MASTER_SET_ID }, TABLE_NAMES.instituteTable);

export const setNTAMasters = (NTAMasters: NTAMasters) =>
  DynamoDBActions.putItem(NTAMasters, TABLE_NAMES.instituteTable);

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

export const runDynamoDBQuery = (
  TableName: string,
  key: string,
  value: string,
  comparator: string
) => {
  console.log(
    `KeyConditionExpression: "` +
      key +
      ` " + ` +
      comparator +
      ` + " :` +
      value +
      `"`
  );
  return DynamoDBActions.query({
    TableName,
    KeyConditionExpression: "#key " + comparator + " :value",
    ExpressionAttributeNames: {
      "#key": key,
    },
    ExpressionAttributeValues: {
      ":value": value,
    },
  });
};

export const getContentsByType = (tablename: string, tableType: TableName) => {
  const params = {
    FilterExpression: "tableType = :tableType",
    ExpressionAttributeValues: {
      ":tableType": tableType,
    },
  };
  return DynamoDBActions.scan(tablename, params);
};

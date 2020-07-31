import { DynamoDBActions } from "./db-handler";
import {
  NTA_MASTER_SET_ID,
  TABLE_NAMES,
  cognito,
  CognitoConfig,
} from "../constants/common-vars";
import { NTAMasters, NTA } from "../model/DB/nta.DB.model";
import { TableName } from "../model/DB/imports/types.DB.model";
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import AWS from "aws-sdk";

// General Helpers
export const checkIFNTAMastersExist = () =>
  DynamoDBActions.get({ id: NTA_MASTER_SET_ID }, TABLE_NAMES.instituteTable);

// export const getNTAMasters = () =>
//   DynamoDBActions.get({ id: NTA_MASTER_SET_ID }, TABLE_NAMES.instituteTable);

// export const setNTAMasters = (NTAMasters: NTAMasters) =>
//   DynamoDBActions.putItem(NTAMasters, TABLE_NAMES.instituteTable);

export const addItemToNTAMasters = <T>(
  item: T,
  masterArrayName: keyof NTAMasters,
  nta: NTA
) => {
  const masterArray = nta.masters[masterArrayName] as any;
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

export const getCognitoUserFromToken = (event: APIGatewayProxyEvent) => {
  return cognito
    .getUser({
      AccessToken: event.headers["Access-Token"] /* required */,
    })
    .promise();
};

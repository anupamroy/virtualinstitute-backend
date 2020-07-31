import { DynamoDBActions } from "./db-handler";
import {
  NTA_MASTER_SET_ID,
  TABLE_NAMES,
  cognito,
} from "../constants/common-vars";
import { TableName } from "../model/DB/imports/types.DB.model";
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";

export const checkIFNTAMastersExist = () =>
  DynamoDBActions.get({ id: NTA_MASTER_SET_ID }, TABLE_NAMES.instituteTable);

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
      AccessToken: event.headers["Access-Token"],
    })
    .promise();
};

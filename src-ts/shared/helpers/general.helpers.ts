import { DynamoDBActions } from "./db-handler";
import {
  NTA_MASTER_SET_ID,
  TABLE_NAMES,
  cognito,
  EVENT_HEADERS,
} from "../constants/common-vars";
import { TableName } from "../model/DB/imports/types.DB.model";
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { NTA } from "../model/DB/nta.DB.model";
import { getNTAById } from "../functions/nta.functions";
import { EVENT_HEADERS_LOCAL } from "../constants/common-vars";

export const checkIFNTAMastersExist = () =>
  DynamoDBActions.get({ id: NTA_MASTER_SET_ID }, TABLE_NAMES.instituteTable);

export const runDynamoDBQuery = (
  TableName: string,
  key: string,
  value: string,
  comparator: string
) => {
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

export const getContentsByType = (tablename: string, tableType: TableName): Promise<any[]> => {
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

export const getNTAFromEvent = async (event: APIGatewayProxyEvent) => {
  const ntaId =
    event.headers[EVENT_HEADERS.ntaAuthorityId] ||
    event.headers[EVENT_HEADERS_LOCAL.ntaAuthorityId];
  const nta: NTA = await getNTAById(ntaId);
  return nta;
};

export const sanitizeString = (inputString: string) =>
  (inputString || "").trim().replace(/[^\w\s]/gi, "");

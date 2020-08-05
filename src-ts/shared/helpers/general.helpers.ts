import { DynamoDBActions } from "./db-handler";
import {
  NTA_MASTER_SET_ID,
  TABLE_NAMES,
  cognito,
  EVENT_HEADERS,
} from "../constants/common-vars";
import { TableName, ObjectId } from "../model/DB/imports/types.DB.model";
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { NTA } from "../model/DB/nta.DB.model";
import { getNTAById } from "../functions/nta.functions";
import { EVENT_HEADERS_LOCAL } from "../constants/common-vars";

export const checkIFNTAMastersExist = () =>
  DynamoDBActions.get({ id: NTA_MASTER_SET_ID }, TABLE_NAMES.instituteTable);

export const getContentsByType = (
  tablename: string,
  tableType: TableName
): Promise<any[]> => {
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
  const ntaId = getNTAIdFromEvent(event);
  const nta: NTA = await getNTAById(ntaId);
  return nta;
};

export const getNTAIdFromEvent = (event: APIGatewayProxyEvent) => {
  const ntaId =
    event.headers[EVENT_HEADERS.ntaAuthorityId] ||
    event.headers[EVENT_HEADERS_LOCAL.ntaAuthorityId];
  return ntaId;
};

export const sanitizeString = (inputString: string) =>
  (inputString || "").trim().replace(/[^\w\s]/gi, "");

export const getNTAMasterRangeKey = (
  tableType: TableName,
  masterName: string,
  masterId: ObjectId,
  parentId?: ObjectId,
  institutionTypeId?: ObjectId
) => {
  return (
    `#MASTER` +
    `#MASTER_TYPE#${tableType}` +
    (institutionTypeId ? `#INSTITUTION_TYPE#${institutionTypeId}` : ``) +
    (parentId ? `#PARENT_ID#${parentId}` : ``) +
    `#MASTER_NAME#${masterName}#MASTER_ID#${masterId}`
  );
};

export const getNTAMasterList = async (ntaId: string, tableType: TableName) => {
  console.log(
    "#MASTER#MASTER_TYPE#${tableType}",
    `#MASTER#MASTER_TYPE#${tableType}`
  );
  return await DynamoDBActions.query({
    TableName: TABLE_NAMES.instituteTable,
    KeyConditionExpression:
      "tableType = :ntaItem and  begins_with(id, :master) ",
    ExpressionAttributeValues: {
      ":ntaItem": `#NTA#${ntaId}`,
      ":master": `#MASTER#MASTER_TYPE#${tableType}`,
    },
  });
};

export const checkIfMasterListItemExistsByName = async (
  ntaId: string,
  tableType: TableName,
  masterName: string,
  institutionTypeId?: string
) => {
  return await DynamoDBActions.query({
    TableName: TABLE_NAMES.instituteTable,
    KeyConditionExpression:
      "tableType = :ntaItem and begins_with(id, :id)",
    ExpressionAttributeValues: {
      ":ntaItem": `#NTA#${ntaId}`,
      ":id":
        `#MASTER#MASTER_TYPE#${tableType}` +
        (institutionTypeId ? `#INSTITUTION_TYPE#${institutionTypeId}` : ``) +
        `#MASTER_NAME#${masterName}`,
    },
  }).then(result => !!result.Items.length);
};

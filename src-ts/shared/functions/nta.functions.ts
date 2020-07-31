import { NTA, NTAUser } from "../model/DB/nta.DB.model";
import {
  DynamoDBActions,
  processDynamoDBResponse,
} from "../helpers/db-handler";
import { TABLE_NAMES } from "../constants/common-vars";
import { CreateNTAAuthorityRequest } from "../model/request-method.model";
import {
  getContentsByType,
  getCognitoUserFromToken,
} from "../helpers/general.helpers";
import { createResponse } from "../helpers/handler";
import { APIGatewayProxyEvent } from "aws-lambda";

export const createNTAAuthorityFunction = async (
  body: CreateNTAAuthorityRequest
) => {
  const ntaAuthority = new NTA();
  ntaAuthority.ntaName = body.ntaName;
  console.log(" ");
  console.log(
    "-----------------------------------------------ntaAuthority-----------------------"
  );
  console.log("ntaAuthority", ntaAuthority, ntaAuthority.tableType);
  return processDynamoDBResponse(
    DynamoDBActions.putItem(ntaAuthority, TABLE_NAMES.instituteTable)
  );
};

export const listNTAAuthorityFunction = async () => {
  return processDynamoDBResponse(
    getContentsByType(TABLE_NAMES.instituteTable, "NTA_AUTHORITY")
  );
};

export const saveNTAAuthority = (ntaAuthority: NTA) =>
  DynamoDBActions.putItem(ntaAuthority, TABLE_NAMES.instituteTable);

export const getNTAByIDFunction = (ntaId: string) => {
  return DynamoDBActions.get({ id: ntaId }, TABLE_NAMES.instituteTable);
};

export const insertCognitoUserInNTAFunction = async (
  ntaId: string,
  username: string
) => {
  const ntaUser = new NTAUser();
  ntaUser.username = username;
  ntaUser.ntaId = ntaId;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(ntaUser, TABLE_NAMES.instituteTable)
  );
};

export const getNTAIdofUser = async (event: APIGatewayProxyEvent) => {
  const cognitoUser = await getCognitoUserFromToken(event);
  const userId =
    cognitoUser.UserAttributes.find((attr) => attr.Name === "sub")?.Value + "";
  const user: NTAUser = await DynamoDBActions.get(
    { id: userId },
    TABLE_NAMES.instituteTable
  );
  console.log("---------------user------------------", userId, user);

  return user.ntaId;
};

export const getNTAofUser = async (event: APIGatewayProxyEvent) => {
  const ntaId = getNTAIdofUser(event);
  const nta: NTA = await DynamoDBActions.get(
    { id: ntaId },
    TABLE_NAMES.instituteTable
  );
  return nta;
};

export const getNTAById = (ntaId: string) =>
  DynamoDBActions.get({ id: ntaId }, TABLE_NAMES.instituteTable).then(nta => nta.Item);


  export const getNTAFromEvent = async (event: APIGatewayProxyEvent) => {
    
  }
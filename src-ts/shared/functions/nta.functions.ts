import { NTA, NTAUser } from "../model/DB/nta.DB.model";
import {
  DynamoDBActions,
  processDynamoDBResponse,
} from "../helpers/db-handler";
import { TABLE_NAMES } from "../constants/common-vars";
import { CreateNTAAuthorityRequest } from "../model/request-method.model";
import { getContentsByType } from "../helpers/general.helpers";
import { createResponse } from "../helpers/handler";

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

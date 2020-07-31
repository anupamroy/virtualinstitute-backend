import { NTA } from "../model/DB/nta.DB.model";
import {
  DynamoDBActions,
  processDynamoDBResponse,
} from "../helpers/db-handler";
import { TABLE_NAMES } from "../constants/common-vars";
import { CreateNTAAuthorityRequest } from "../model/request-method.model";

export const createNTAAuthorityFunction = async (
  body: CreateNTAAuthorityRequest
) => {
  const ntaAuthority = new NTA();
  ntaAuthority.ntaName = body.ntaName;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(ntaAuthority, TABLE_NAMES.instituteTable)
  );
};

export const listNTAAuthorityFunction = async () => {
  return processDynamoDBResponse(
    DynamoDBActions.scan(TABLE_NAMES.instituteTable)
  );
};

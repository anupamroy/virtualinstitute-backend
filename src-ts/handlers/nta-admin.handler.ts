import {
  requestValidatorGuard,
  NTATokenGuard,
} from "../shared/helpers/requests/guard";
import {
  createNTAAuthorityFunction,
  listNTAAuthorityFunction,
} from "../shared/functions/nta.functions";
import { APIGatewayProxyEvent } from "aws-lambda";
import { parseBody, createResponse } from "../shared/helpers/handler";
import {
  CreateNTAAuthorityRequest,
  APIResponse,
} from "../shared/model/request-method.model";
import { NTAMasters } from "../shared/model/DB/nta.DB.model";
import {
  checkIFNTAMastersExist,
  getNTAMasters,
} from "../shared/helpers/general.helpers";
import {
  processDynamoDBResponse,
  DynamoDBActions,
} from "../shared/helpers/db-handler";
import { TABLE_NAMES } from "../shared/constants/common-vars";
import { cognitoActions } from "../shared/helpers/cognito/cognito.actions";

export const createNTAAuthority = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateNTAAuthorityRequest>(event.body);
  return await NTATokenGuard(
    event,
    await requestValidatorGuard(
      body,
      new CreateNTAAuthorityRequest(),
      createNTAAuthorityFunction,
      [body]
    )
  );
};

export const listNTAAuthority = async (event: APIGatewayProxyEvent) => {
  return await NTATokenGuard(
    event,
    async () => await listNTAAuthorityFunction()
  );
};

export const createNTAUser = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.addNTAUser(event);

export const deleteNTAUser = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.deleteNTA(event);

export const createNTAMasters = async () => {
  const ntaMasters = new NTAMasters();
  return await checkIFNTAMastersExist()
    .then((data) =>
      data?.id
        ? createResponse(
            200,
            new APIResponse(true, "NTA Master Data Already exists", data)
          )
        : processDynamoDBResponse(
            DynamoDBActions.putItem(ntaMasters, TABLE_NAMES.instituteTable)
          )
    )
    .catch(() =>
      processDynamoDBResponse(
        DynamoDBActions.putItem(ntaMasters, TABLE_NAMES.instituteTable)
      )
    );
};

export const listNTAMasters = async () =>
  createResponse(200, new APIResponse(false, "", await getNTAMasters()));

import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import {
  DynamoDBActions,
  processDynamoDBResponse,
} from "../shared/helpers/db-handler";
import { createResponse, parseBody } from "../shared/helpers/handler";
import { cognitoActions } from "../shared/helpers/cognito/cognito.actions";
import {
  APIResponse,
  CreateFeesHeadRequest,
  CreateAccountsHeadMasterRequest,
} from "../shared/model/request-method.model";
import {
  CreateFeesMasterRequest as CreateFeesTypeMasterRequest,
  CreateNTAAuthorityRequest,
} from "../shared/model/request-method.model";
import {
  TABLE_NAMES,
  NTA_MASTER_SET_ID,
} from "../shared/constants/common-vars";
import {
  checkIFNTAMastersExist,
  getNTAMasters,
} from "../shared/helpers/general.helpers";
import { NTAMasters } from "../shared/model/DB/nta.DB.model";
import {
  requestValidatorGuard,
  NTATokenGuard,
} from "../shared/helpers/requests/guard";
import {
  createFeesHeadFunction,
  createFeesTypeFunction,
  createAccountHeadFunction,
} from "../shared/functions/fees.functions";
import { CreatePersonRequest } from "../shared/model/request.model";
import { createNTAAuthorityFunction, listNTAAuthorityFunction } from '../shared/functions/nta.functions';

// Handler helpers

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
  return await NTATokenGuard(event, async () => await listNTAAuthorityFunction());
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

export const createStudent = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.addStudent(event);

export const checkToken = async (event: APIGatewayProxyEvent) => {
  return createResponse(200, new APIResponse(false, "", event));
};

export const newPasswordChallenge = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.setNTAPassword(event);

// Fees Head Master
export const createFeesHead = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateFeesHeadRequest>(event.body);
  return requestValidatorGuard(
    body,
    new CreateFeesHeadRequest(),
    createFeesHeadFunction,
    [body, event]
  );
};

export const getFeesHeadList = async () => {
  console.log("query: true");
  return await DynamoDBActions.query({
    // [TABLE_NAMES.feesTable]: {
    //   Keys: [
    //     {
    //       type: "456a1546-d33c-42ff-a34b-24ec072cddc5",
    //     },
    //   ],
    //   ConsistentRead: true,
    // },
    TableName: TABLE_NAMES.feesTable,
    FilterExpression: "#type = :type",
    ExpressionAttributeNames: {
      "#type": "type",
    },
    ExpressionAttributeValues: {
      ":type": TABLE_NAMES.feesTable,
    },
  })
    // return await DynamoDBActions.scan(TABLE_NAMES.feesTable)
    .then((data) => createResponse(200, new APIResponse(false, "", data)))
    .catch((error) =>
      createResponse(
        422,
        new APIResponse(false, error.message || "An Error Occured", error)
      )
    );
};

// Fees Type master
export const createFeesTypeMaster = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateFeesTypeMasterRequest>(event.body);
  return requestValidatorGuard(
    body,
    new CreateFeesTypeMasterRequest(),
    createFeesTypeFunction,
    [body, event]
  );
};

export const getFeesMasterList = async () => {
  return await processDynamoDBResponse(DynamoDBActions.batchGet({}));
};

// AccountsHead Master
export const createAccountHeadMaster = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateAccountsHeadMasterRequest>(event.body);
  return requestValidatorGuard(
    body,
    new CreateAccountsHeadMasterRequest(),
    createAccountHeadFunction,
    [body, event]
  );
};

export const getAccountHeadList = async () => {
  return await processDynamoDBResponse(DynamoDBActions.batchGet({}));
};

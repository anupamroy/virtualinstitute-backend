// Handler helpers

import { APIGatewayProxyEvent } from "aws-lambda";
import { cognitoActions } from "../shared/helpers/cognito/cognito.actions";
import { createResponse, parseBody } from "../shared/helpers/handler";
import {
  APIResponse,
  CreateFeesHeadRequest,
  CreateAccountsHeadMasterRequest,
} from "../shared/model/request-method.model";
import { getUserFromToken } from "../shared/helpers/general.helpers";
import {
  DynamoDBActions,
  processDynamoDBResponse,
} from "../shared/helpers/db-handler";
import { TABLE_NAMES } from "../shared/constants/common-vars";
import { requestValidatorGuard } from "../shared/helpers/requests/guard";
import { createAccountHeadFunction } from "../shared/functions/fees.functions";

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
  console.log(
    "---------------------------getUserFromToken---------------------------------"
  );
  // console.log(await getUserFromToken(event));
  return createResponse(
    200,
    new APIResponse(false, "", await getUserFromToken(event))
  );
  // requestValidatorGuard(
  //   body,
  //   new CreateFeesHeadRequest(),
  //   createFeesHeadFunction,
  //   [body, event]
  // );
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
  // const body = parseBody<CreateFeesTypeMasterRequest>(event.body);
  // return requestValidatorGuard(
  //   body,
  //   new CreateFeesTypeMasterRequest(),
  //   createFeesTypeFunction,
  //   [body, event]
  // );
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

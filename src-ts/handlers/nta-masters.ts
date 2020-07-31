import { APIGatewayProxyEvent } from "aws-lambda";
import { parseBody, createResponse } from "../shared/helpers/handler";
import {
  CreateFeesHeadRequest,
  APIResponse,
  CreateAccountsHeadMasterRequest,
} from "../shared/model/request-method.model";
import {
  DynamoDBActions,
  processDynamoDBResponse,
} from "../shared/helpers/db-handler";
import { TABLE_NAMES } from "../shared/constants/common-vars";
import { requestValidatorGuard } from "../shared/helpers/requests/guard";
import {
  createAccountHeadFunction,
  createFeesHeadFunction,
} from "../shared/functions/fees.functions";
import { getNTAofUser, getNTAById } from "../shared/functions/nta.functions";
import { createNewFeesHead } from "../shared/transforms/fees.transform";
import { NTA } from "../shared/model/DB/nta.DB.model";

// Fees Head Master
export const createFeesHeadMaster = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateFeesHeadRequest>(event.body);
  // return requestValidatorGuard(
  //   body,
  //   new CreateFeesHeadRequest(),
  //   createFeesHeadFunction,
  //   [body, event]
  // );
  if (body) {
    return createFeesHeadFunction(body, event);
  }
};

export const getFeesHeadMastersList = async () => {
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
export const createFeesTypeMaster = async () => {
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

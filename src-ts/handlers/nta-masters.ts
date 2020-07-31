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
import { CreateFeesTypeMasterRequest } from "../shared/model/request-method.model";
import {
  createFeesTypeFunction,
  getFeesHeadListFunction,
} from "../shared/functions/fees.functions";
import { keysMissingResponse } from "../shared/helpers/response.helper";
import {
  getFeesTypeListFunction,
  getAccountsHeadListFunction,
} from "../shared/functions/fees.functions";

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
  } else {
    return keysMissingResponse();
  }
};

export const getFeesHeadMastersList = async (event: APIGatewayProxyEvent) => {
  return await getFeesHeadListFunction(event);
};

// Fees Type master
export const createFeesTypeMaster = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateFeesTypeMasterRequest>(event.body);
  if (body) {
    return createFeesTypeFunction(body, event);
  } else {
    return keysMissingResponse();
  }
};

export const getFeesMasterList = async (event: APIGatewayProxyEvent) => {
  return await getFeesTypeListFunction(event);
};

// AccountsHead Master
export const createAccountHeadMaster = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateAccountsHeadMasterRequest>(event.body);
  // return requestValidatorGuard(
  //   body,
  //   new CreateAccountsHeadMasterRequest(),
  //   createAccountHeadFunction,
  //   [body, event]
  // );
  if (body) {
    return createAccountHeadFunction(body, event);
  } else {
    return keysMissingResponse();
  }
};

export const getAccountHeadList = async (event: APIGatewayProxyEvent) => {
  return await getAccountsHeadListFunction(event);
};

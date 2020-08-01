import { APIGatewayProxyEvent } from "aws-lambda";
import { parseBody } from "../shared/helpers/handler";
import {
  CreateFeesHeadRequest,
  CreateAccountsHeadMasterRequest,
} from "../shared/model/request-method.model";
import {
  createAccountHeadFunction,
  createFeesHeadFunction,
} from "../shared/functions/fees.functions";
import { CreateFeesTypeMasterRequest } from "../shared/model/request-method.model";
import {
  createFeesTypeFunction,
  getFeesHeadListFunction,
} from "../shared/functions/fees.functions";
import { keysMissingResponse } from "../shared/helpers/response.helper";
import { getFeesHeadByIdFunction } from "../shared/functions/fees.functions";
import {
  getFeesTypeListFunction,
  getAccountsHeadListFunction,
} from "../shared/functions/fees.functions";

export const createFeesHeadMaster = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateFeesHeadRequest>(event.body);
  if (body) {
    return createFeesHeadFunction(body, event);
  } else {
    return keysMissingResponse();
  }
};

export const getFeesHeadMastersList = async (event: APIGatewayProxyEvent) => {
  return await getFeesHeadListFunction(event);
};

export const getFeesHeadMasterById = async (event: APIGatewayProxyEvent) => {
  return await getFeesHeadByIdFunction(event);
};

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

export const createAccountHeadMaster = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateAccountsHeadMasterRequest>(event.body);
  if (body) {
    return createAccountHeadFunction(body, event);
  } else {
    return keysMissingResponse();
  }
};

export const getAccountHeadList = async (event: APIGatewayProxyEvent) => {
  return await getAccountsHeadListFunction(event);
};

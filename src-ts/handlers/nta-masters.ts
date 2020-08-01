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
import { editAccountsHeadByIdFunction } from "../shared/functions/fees.functions";
import {
  editFeesTypeByIdFunction,
  editFeesHeadByIdFunction,
} from "../shared/functions/fees.functions";
import {
  deleteFeesTypeByIdFunction,
  deleteAccountsHeadByIdFunction,
} from "../shared/functions/fees.functions";
import {
  getFeesHeadByIdFunction,
  deleteFeesHeadByIdFunction,
} from "../shared/functions/fees.functions";
import {
  getFeesTypeListFunction,
  getAccountsHeadListFunction,
} from "../shared/functions/fees.functions";

// Create Functions
export const createFeesHeadMaster = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateFeesHeadRequest>(event.body);
  if (body) {
    return createFeesHeadFunction(body, event);
  } else {
    return keysMissingResponse();
  }
};

export const createFeesTypeMaster = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateFeesTypeMasterRequest>(event.body);
  if (body) {
    return createFeesTypeFunction(body, event);
  } else {
    return keysMissingResponse();
  }
};

export const createAccountHeadMaster = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateAccountsHeadMasterRequest>(event.body);
  if (body) {
    return createAccountHeadFunction(body, event);
  } else {
    return keysMissingResponse();
  }
};

// Get Functions
export const getFeesHeadMastersList = async (event: APIGatewayProxyEvent) => {
  return await getFeesHeadListFunction(event);
};

export const getFeesHeadMasterById = async (event: APIGatewayProxyEvent) => {
  return await getFeesHeadByIdFunction(event);
};

export const getFeesTypeMasterList = async (event: APIGatewayProxyEvent) => {
  return await getFeesTypeListFunction(event);
};

export const getAccountHeadList = async (event: APIGatewayProxyEvent) => {
  return await getAccountsHeadListFunction(event);
};

// Delete Functions
export const deleteFeesHeadMasterById = async (event: APIGatewayProxyEvent) => {
  return await deleteFeesHeadByIdFunction(event);
};

export const deleteFeesTypeMasterById = async (event: APIGatewayProxyEvent) => {
  return await deleteFeesTypeByIdFunction(event);
};

export const deleteAccountsHeadMasterById = async (
  event: APIGatewayProxyEvent
) => {
  return await deleteAccountsHeadByIdFunction(event);
};

// Edit Functions
export const editFeesHeadMasterById = async (event: APIGatewayProxyEvent) => {
  return await editFeesHeadByIdFunction(event);
};

export const editFeesTypeMasterById = async (event: APIGatewayProxyEvent) => {
  return await editFeesTypeByIdFunction(event);
};

export const editAccountsHeadMasterById = async (
  event: APIGatewayProxyEvent
) => {
  return await editAccountsHeadByIdFunction(event);
};

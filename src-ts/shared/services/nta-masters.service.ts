import { APIGatewayProxyEvent } from "aws-lambda";
import { parseBody } from "../helpers/handler-common";
import {
  CreateFeesHeadRequest,
  CreateAccountsHeadMasterRequest,
} from "../model/request-method.model";
import {
  createAccountHeadFunction,
  createFeesHeadFunction,
  statusChangeofAccountHeadByIdFunction,
} from "../functions/fees.functions";
import {
  CreateFeesTypeMasterRequest,
  StatusChangeRequest,
} from "../model/request-method.model";
import {
  createFeesTypeFunction,
  getFeesHeadListFunction,
} from "../functions/fees.functions";
import { keysMissingResponse } from "../helpers/response.helper";
import { statusChangeofFeesTypeByIdFunction } from "../functions/fees.functions";
import {
  editAccountsHeadByIdFunction,
  statusChangeofFeesHeadByIdFunction,
} from "../functions/fees.functions";
import {
  editFeesTypeByIdFunction,
  editFeesHeadByIdFunction,
} from "../functions/fees.functions";
import {
  deleteFeesTypeByIdFunction,
  deleteAccountsHeadByIdFunction,
} from "../functions/fees.functions";
import { deleteFeesHeadByIdFunction } from "../functions/fees.functions";
import {
  getFeesTypeListFunction,
  getAccountsHeadListFunction,
} from "../functions/fees.functions";

// Create

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

// Get List
export const getFeesHeadMastersList = async (event: APIGatewayProxyEvent) => {
  return await getFeesHeadListFunction(event);
};

export const getFeesTypeMasterList = async (event: APIGatewayProxyEvent) => {
  return await getFeesTypeListFunction(event);
};

export const getAccountHeadList = async (event: APIGatewayProxyEvent) => {
  return await getAccountsHeadListFunction(event);
};

// Delete By Id
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

// Edit By Id
export const editFeesHeadMasterById = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateFeesHeadRequest>(event.body);
  if (body) {
    return await editFeesHeadByIdFunction(body, event);
  } else {
    return keysMissingResponse();
  }
};

export const editFeesTypeMasterById = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateFeesTypeMasterRequest>(event.body);
  if (body) {
    return await editFeesTypeByIdFunction(body, event);
  } else {
    return keysMissingResponse();
  }
};

export const editAccountsHeadMasterById = async (
  event: APIGatewayProxyEvent
) => {
  const body = parseBody<CreateAccountsHeadMasterRequest>(event.body);
  if (body) {
    return await editAccountsHeadByIdFunction(body, event);
  } else {
    return keysMissingResponse();
  }
};

// Change Status By Id
export const statusChangeOfFeesHeadMaster = async (
  event: APIGatewayProxyEvent
) => {
  const body = parseBody<StatusChangeRequest>(event.body);
  if (body) {
    return await statusChangeofFeesHeadByIdFunction(body, event);
  } else {
    return keysMissingResponse();
  }
};

export const statusChangeOfFeesTypeMaster = async (
  event: APIGatewayProxyEvent
) => {
  const body = parseBody<StatusChangeRequest>(event.body);
  if (body) {
    return await statusChangeofFeesTypeByIdFunction(body, event);
  } else {
    return keysMissingResponse();
  }
};

export const statusChangeOfAccountHeadMaster = async (
  event: APIGatewayProxyEvent
) => {
  const body = parseBody<StatusChangeRequest>(event.body);
  if (body) {
    return await statusChangeofAccountHeadByIdFunction(body, event);
  } else {
    return keysMissingResponse();
  }
};

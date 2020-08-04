import { APIGatewayProxyEvent } from "aws-lambda";
import { parseBody } from "../../shared/helpers/handler-common";
import {
  CreateFeesHeadRequest,
  CreateAccountsHeadMasterRequest,
} from "../../shared/model/request-method.model";
import {
  createAccountHeadFunction,
  createFeesHeadFunction,
  statusChangeofAccountHeadByIdFunction,
  getFeesTypeByIdFunction,
  getAccountsHeadByIdFunction,
} from "../../shared/functions/fees.functions";
import {
  CreateFeesTypeMasterRequest,
  StatusChangeRequest,
} from "../../shared/model/request-method.model";
import {
  createFeesTypeFunction,
  getFeesHeadListFunction,
} from "../../shared/functions/fees.functions";
import { keysMissingResponse } from "../../shared/helpers/response.helper";
import { statusChangeofFeesTypeByIdFunction } from "../../shared/functions/fees.functions";
import {
  editAccountsHeadByIdFunction,
  statusChangeofFeesHeadByIdFunction,
} from "../../shared/functions/fees.functions";
import {
  editFeesTypeByIdFunction,
  editFeesHeadByIdFunction,
} from "../../shared/functions/fees.functions";
import {
  deleteFeesTypeByIdFunction,
  deleteAccountsHeadByIdFunction,
} from "../../shared/functions/fees.functions";
import {
  getFeesHeadByIdFunction,
  deleteFeesHeadByIdFunction,
} from "../../shared/functions/fees.functions";
import {
  getFeesTypeListFunction,
  getAccountsHeadListFunction,
} from "../../shared/functions/fees.functions";

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

export const getFeesTypeMasterById = async (event: APIGatewayProxyEvent) => {
  return await getFeesTypeByIdFunction(event);
};

export const getAccountsHeadMasterById = async (event: APIGatewayProxyEvent) => {
  return await getAccountsHeadByIdFunction(event);
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

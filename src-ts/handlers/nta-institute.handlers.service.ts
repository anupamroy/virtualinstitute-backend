import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { DynamoDBActions } from "../shared/helpers/db-handler";
import { createResponse, parseBody } from "../shared/helpers/handler";
import { cognitoActions } from "../shared/helpers/cognito.helper";
import {
  APIResponse,
  CreateFeesHeadRequest,
} from "../shared/model/request-method.model";
import {
  FeesHeadName,
  FeeType,
} from "../shared/model/DB/imports/masters.model";
import { requestValidator } from "../shared/helpers/request.helper";
import { keysMissingResponse } from "../shared/helpers/response.helper";
import { CreateFeesMasterRequest } from "../shared/model/request-method.model";

// export const getAllItems = async () => {
//   const data = await DynamoDBActions.scan();
//   const items = data.Items;
//   return createResponse(200, items);
// };

// export const getById = async (event: APIGatewayProxyEvent) => {
//   const id = event.pathParameters?.id;
//   const data = await DynamoDBActions.get({ id });
//   const item = data.Item;
//   return createResponse(200, item);
// };

// export const putItem = async (event: APIGatewayProxyEvent) => {
//   const body = parseBody<any>(event.body);
//   const id = body.id;
//   const name = body.name;
//   const result = await DynamoDBActions.putItem({ id, name });
//   return createResponse(200, result);
// };

export const createNTAUser = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.addNTAUser(event);

export const deleteNTAUser = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.deleteNTA(event);

export const createStudent = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.addStudent(event);

export const checkToken = async (event: APIGatewayProxyEvent) => {
  console.log("checkToken");
  console.log(event.requestContext);
  return createResponse(200, new APIResponse(false, "", event));
};

export const newPasswordChallenge = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.setNTAPassword(event);

// Fees Head Master
export const createFeesHead = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateFeesHeadRequest>(event.body);
  if (body && requestValidator(body, CreateFeesHeadRequest)) {
    const userId = event.headers.username;
    const feesHead = new FeesHeadName();
    feesHead.created_by = userId;
    feesHead.updated_by = userId;
    feesHead.name = body.name;
    feesHead.parentId = body.parentId;
    feesHead.instituteTypeId = body.institutionTypeId;
    return await DynamoDBActions.putItem(feesHead)
      .then((data) => createResponse(200, new APIResponse(false, "", data)))
      .catch((error) =>
        createResponse(
          422,
          new APIResponse(false, error.message || "An Error Occured", error)
        )
      );
  } else {
    return keysMissingResponse();
  }
};

export const getFeesHeadList = async (event: APIGatewayProxyEvent) => {
  return await DynamoDBActions.batchGet({})
    .then((data) => createResponse(200, new APIResponse(false, "", data)))
    .catch((error) =>
      createResponse(
        422,
        new APIResponse(false, error.message || "An Error Occured", error)
      )
    );
};

// Fees Type master
export const createFeesMaster = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateFeesMasterRequest>(event.body);
  if (body && requestValidator(body, CreateFeesMasterRequest)) {
    const userId = event.headers.username;
    const feeType = new FeeType();
    feeType.created_by = userId;
    feeType.updated_by = userId;
    feeType.name = body.name;
    return await DynamoDBActions.putItem(feeType)
      .then((data) => createResponse(200, new APIResponse(false, "", data)))
      .catch((error) =>
        createResponse(
          422,
          new APIResponse(false, error.message || "An Error Occured", error)
        )
      );
  } else {
    return keysMissingResponse();
  }
};

export const getFeesMasterList = async (event: APIGatewayProxyEvent) => {
  return await DynamoDBActions.batchGet({})
    .then((data) => createResponse(200, new APIResponse(false, "", data)))
    .catch((error) =>
      createResponse(
        422,
        new APIResponse(false, error.message || "An Error Occured", error)
      )
    );
};

// AccountsHead Master
export const createAccountHeadMaster = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateFeesMasterRequest>(event.body);
  if (body && requestValidator(body, CreateFeesMasterRequest)) {
    const userId = event.headers.username;
    const feeType = new FeeType();
    feeType.created_by = userId;
    feeType.updated_by = userId;
    feeType.name = body.name;
    return await DynamoDBActions.putItem(feeType)
      .then((data) => createResponse(200, new APIResponse(false, "", data)))
      .catch((error) =>
        createResponse(
          422,
          new APIResponse(false, error.message || "An Error Occured", error)
        )
      );
  } else {
    return keysMissingResponse();
  }
};

export const getAccountHeadList = async (event: APIGatewayProxyEvent) => {
  return await DynamoDBActions.batchGet({})
    .then((data) => createResponse(200, new APIResponse(false, "", data)))
    .catch((error) =>
      createResponse(
        422,
        new APIResponse(false, error.message || "An Error Occured", error)
      )
    );
};

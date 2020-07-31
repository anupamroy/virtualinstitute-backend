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
} from "../shared/model/request-method.model";
import {
  FeesHeadName,
  FeeType,
} from "../shared/model/DB/imports/masters.model";
import { requestValidator } from "../shared/helpers/requests/request.helper";
import { keysMissingResponse } from "../shared/helpers/response.helper";
import { CreateFeesMasterRequest as CreateFeesTypeMasterRequest } from "../shared/model/request-method.model";
import {
  TABLE_NAMES,
  NTA_MASTER_SET_ID,
} from "../shared/constants/common-vars";
import { NTAMasters } from "../shared/model/DB/nta.DB.model";
import { AccountHead } from "../shared/model/DB/institute.DB.model";

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

export const checkIFNTAMastersExist = () =>
  DynamoDBActions.get({ id: NTA_MASTER_SET_ID }, TABLE_NAMES.instituteTable);

export const createNTAMasters = async (event: APIGatewayProxyEvent) => {
  const ntaMasters = new NTAMasters();
  ntaMasters.id = NTA_MASTER_SET_ID;
  return await checkIFNTAMastersExist()
    .then((data) =>
      data
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
  DynamoDBActions.get({ id: NTA_MASTER_SET_ID }, TABLE_NAMES.instituteTable);

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
  if (body && requestValidator(body, CreateFeesHeadRequest)) {
    const userId = event.headers.username;
    const feesHead = new FeesHeadName();
    feesHead.created_by = userId;
    feesHead.updated_by = userId;
    feesHead.name = body.name;
    feesHead.parentId = body.parentId;
    feesHead.instituteTypeId = body.institutionTypeId;
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(feesHead, TABLE_NAMES.feesTable)
    );
  } else {
    return keysMissingResponse();
  }
};

export const getFeesHeadList = async (event: APIGatewayProxyEvent) => {
  console.log("ConsistentRead: true");
  return await DynamoDBActions.batchGet({
    [TABLE_NAMES.feesTable]: {
      Keys: [
        {
          id: "456a1546-d33c-42ff-a34b-24ec072cddc5",
        },
      ],
      ConsistentRead: true,
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
  if (body && requestValidator(body, CreateFeesTypeMasterRequest)) {
    const userId = event.headers.username;
    const feeType = new FeeType();
    feeType.created_by = userId;
    feeType.updated_by = userId;
    feeType.name = body.name;
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(feeType, TABLE_NAMES.feesTable)
    );
  } else {
    return keysMissingResponse();
  }
};

export const getFeesMasterList = async (event: APIGatewayProxyEvent) => {
  return await processDynamoDBResponse(DynamoDBActions.batchGet({}));
};

// AccountsHead Master
export const createAccountHeadMaster = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateFeesTypeMasterRequest>(event.body);
  if (body && requestValidator(body, CreateFeesTypeMasterRequest)) {
    const userId = event.headers.username;
    const feeType = new AccountHead();
    feeType.created_by = userId;
    feeType.updated_by = userId;
    feeType.accountHead = body.name;
    return await processDynamoDBResponse(
      DynamoDBActions.putItem(feeType, TABLE_NAMES.feesTable)
    );
  } else {
    return keysMissingResponse();
  }
};

export const getAccountHeadList = async (event: APIGatewayProxyEvent) => {
  return await processDynamoDBResponse(DynamoDBActions.batchGet({}));
};

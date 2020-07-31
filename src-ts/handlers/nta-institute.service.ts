import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import {
  DynamoDBActions,
  processDynamoDBResponse,
} from '../shared/helpers/db-handler';
import { createResponse, parseBody } from '../shared/helpers/handler';
import { cognitoActions } from '../shared/helpers/cognito/cognito.actions';
import {
  APIResponse,
  CreateFeesHeadRequest,
} from '../shared/model/request-method.model';
import { FeeType } from '../shared/model/DB/imports/masters.model';
import { requestValidator } from '../shared/helpers/requests/request.helper';
import { keysMissingResponse } from '../shared/helpers/response.helper';
import { CreateFeesMasterRequest as CreateFeesTypeMasterRequest } from '../shared/model/request-method.model';
import {
  TABLE_NAMES,
  NTA_MASTER_SET_ID,
} from '../shared/constants/common-vars';
import { AccountHead } from '../shared/model/DB/institute.DB.model';
import {
  checkIFNTAMastersExist,
  getNTAMasters,
  addItemToNTAMasters,
  setNTAMasters,
} from '../shared/helpers/general.helpers';
import { NTAMasters } from '../shared/model/DB/nta.DB.model';
import { createNewFeesHead } from '../shared/helpers/requests/requests.transform';

// Handler helpers
export const createNTAUser = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.addNTAUser(event);

export const deleteNTAUser = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.deleteNTA(event);

export const createNTAMasters = async () => {
  const ntaMasters = new NTAMasters();
  ntaMasters.id = NTA_MASTER_SET_ID;
  return await checkIFNTAMastersExist()
    .then((data) =>
      data?.id
        ? createResponse(
            200,
            new APIResponse(true, 'NTA Master Data Already exists', data)
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
  createResponse(200, new APIResponse(false, '', await getNTAMasters()));

export const createStudent = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.addStudent(event);

export const checkToken = async (event: APIGatewayProxyEvent) => {
  return createResponse(200, new APIResponse(false, '', event));
};

export const newPasswordChallenge = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.setNTAPassword(event);

// Fees Head Master
export const createFeesHead = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateFeesHeadRequest>(event.body);
  if (
    body
    // && requestValidator(body, CreateFeesHeadRequest)
  ) {
    const userId = event.headers.username;
    const feesHead = createNewFeesHead(userId, body);
    const NTAMasters = await getNTAMasters();
    console.log('addItemToNTAMasters');
    addItemToNTAMasters(feesHead, 'feesHeadNames', NTAMasters);
    return await processDynamoDBResponse(setNTAMasters(NTAMasters));
  } else {
    return keysMissingResponse();
  }
};

export const getFeesHeadList = async () => {
  console.log('query: true');
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
    FilterExpression: '#type = :type',
    ExpressionAttributeNames: {
      '#type': 'type',
    },
    ExpressionAttributeValues: {
      ':type': TABLE_NAMES.feesTable,
    },
  })
    // return await DynamoDBActions.scan(TABLE_NAMES.feesTable)
    .then((data) => createResponse(200, new APIResponse(false, '', data)))
    .catch((error) =>
      createResponse(
        422,
        new APIResponse(false, error.message || 'An Error Occured', error)
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

export const getFeesMasterList = async () => {
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

export const getAccountHeadList = async () => {
  return await processDynamoDBResponse(DynamoDBActions.batchGet({}));
};

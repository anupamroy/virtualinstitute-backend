// Handler helpers

import { APIGatewayProxyEvent } from 'aws-lambda';
import { cognitoActions } from '../helpers/cognito/cognito.actions';
import { createResponse, parseBody } from '../helpers/handler-common';
import { APIResponse } from '../model/request-method.model';
import { requestValidatorGuard } from '../helpers/requests/guard';
import { CreateInstituteUserRequest } from '../model/request.model';

export const checkToken = async (event: APIGatewayProxyEvent) => {
  return createResponse(200, new APIResponse(false, '', event));
};

export const CreateInstituteUser = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateInstituteUserRequest>(event.body);
  const result = await requestValidatorGuard(
    body,
    new CreateInstituteUserRequest(),
    cognitoActions.addInstituteUserFunction,
    [body]
  );
  return await result();
};
export const DeleteInstituteUser = (event: APIGatewayProxyEvent) => {};


export const createInstituteUser = async(event: APIGatewayProxyEvent) => {};
export const deleteInstituteUser = async(event: APIGatewayProxyEvent) => {};
export const createFeesGroup = async(event: APIGatewayProxyEvent) => {};
export const createFeesMaster = async(event: APIGatewayProxyEvent) => {};
export const createCourseFees = async(event: APIGatewayProxyEvent) => {};
export const listFeesGroup = async(event: APIGatewayProxyEvent) => {};
export const listFeesMaster = async(event: APIGatewayProxyEvent) => {};
export const listCourseFees = async(event: APIGatewayProxyEvent) => {};
export const getFeesGroupById = async(event: APIGatewayProxyEvent) => {};
export const getFeesMasterById = async(event: APIGatewayProxyEvent) => {};
export const getCourseFeesById = async(event: APIGatewayProxyEvent) => {};
export const editFeesGroupById = async(event: APIGatewayProxyEvent) => {};
export const editFeesMasterById = async(event: APIGatewayProxyEvent) => {};
export const editCourseFeesById = async(event: APIGatewayProxyEvent) => {};
export const deleteFeesGroupById = async(event: APIGatewayProxyEvent) => {};
export const deleteFeesMasterById = async(event: APIGatewayProxyEvent) => {};
export const deleteCourseFeesById = async(event: APIGatewayProxyEvent) => {};
export const statusChangeFeesGroupById = async(event: APIGatewayProxyEvent) => {};
export const statusChangeFeesMasterById = async(event: APIGatewayProxyEvent) => {};
export const statusChangeCourseFeesById = async(event: APIGatewayProxyEvent) => {};
export const listConcessionApplications = async(event: APIGatewayProxyEvent) => {};
export const getConcessionApplicationById = async(event: APIGatewayProxyEvent) => {};
export const processConcessionApplicationById = async(event: APIGatewayProxyEvent) => {};
export const listLatefineApplications = async(event: APIGatewayProxyEvent) => {};
export const getLatefineApplicationById = async(event: APIGatewayProxyEvent) => {};
export const processLatefineApplicationById = async(event: APIGatewayProxyEvent) => {};
export const listStudentFees = async(event: APIGatewayProxyEvent) => {};
export const listLedger = async(event: APIGatewayProxyEvent) => {};
export const getLedgerById = async(event: APIGatewayProxyEvent) => {};
export const listSpecialFees = async(event: APIGatewayProxyEvent) => {};
export const listSettingsPayment = async(event: APIGatewayProxyEvent) => {};
export const setSettingsPayment = async(event: APIGatewayProxyEvent) => {};
export const listSettingsApplicationUserLevels = async(event: APIGatewayProxyEvent) => {};
export const setSettingsApplicationUserLevels = async(event: APIGatewayProxyEvent) => {};
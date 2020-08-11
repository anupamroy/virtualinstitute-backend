// Handler helpers

import { APIGatewayProxyEvent } from 'aws-lambda';
import { cognitoActions } from '../helpers/cognito/cognito.actions';
import { createResponse, parseBody } from '../helpers/handler-common';
import { APIResponse } from '../model/request-method.model';
import { requestValidatorGuard } from '../helpers/requests/guard';
import { CreateInstituteUserRequest } from '../model/request.model';
import {
  createFeesGroupFunction,
  createFeesMasterFunction,
  createCourseFeesFunction,
  listFeesGroupFunction,
  listFeesMasterFunction,
  listCourseFeesFunction,
  getFeesGroupByIdFunction,
  getFeesMasterByIdFunction,
  getCourseFeesByIdFunction,
  editFeesGroupByIdFunction,
  editFeesMasterByIdFunction,
  editCourseFeesByIdFunction,
  deleteFeesGroupByIdFunction,
  deleteFeesMasterByIdFunction,
  deleteCourseFeesByIdFunction,
  statusChangeFeesGroupByIdFunction,
  statusChangeFeesMasterByIdFunction,
  statusChangeCourseFeesByIdFunction,
  listConcessionApplicationsFunction,
  getConcessionApplicationByIdFunction,
  processConcessionApplicationByIdFunction,
  listLatefineApplicationsFunction,
  getLatefineApplicationByIdFunction,
  processLatefineApplicationByIdFunction,
  listStudentFeesFunction,
  listLedgerFunction,
  getLedgerByIdFunction,
  listSpecialFeesFunction,
  listSettingsPaymentFunction,
  setSettingsPaymentFunction,
  listSettingsApplicationUserLevelsFunction,
  setSettingsApplicationUserLevelsFunction,
} from '../functions/nta-institute.functionc';

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

export const createFeesGroup = async (event: APIGatewayProxyEvent) => {
  return await createFeesGroupFunction();
};
export const createFeesMaster = async (event: APIGatewayProxyEvent) => {
  return await createFeesMasterFunction();
};
export const createCourseFees = async (event: APIGatewayProxyEvent) => {
  return await createCourseFeesFunction();
};
export const listFeesGroup = async (event: APIGatewayProxyEvent) => {
  return await listFeesGroupFunction();
};
export const listFeesMaster = async (event: APIGatewayProxyEvent) => {
  return await listFeesMasterFunction();
};
export const listCourseFees = async (event: APIGatewayProxyEvent) => {
  return await listCourseFeesFunction();
};
export const getFeesGroupById = async (event: APIGatewayProxyEvent) => {
  return await getFeesGroupByIdFunction();
};
export const getFeesMasterById = async (event: APIGatewayProxyEvent) => {
  return await getFeesMasterByIdFunction();
};
export const getCourseFeesById = async (event: APIGatewayProxyEvent) => {
  return await getCourseFeesByIdFunction();
};
export const editFeesGroupById = async (event: APIGatewayProxyEvent) => {
  return await editFeesGroupByIdFunction();
};
export const editFeesMasterById = async (event: APIGatewayProxyEvent) => {
  return await editFeesMasterByIdFunction();
};
export const editCourseFeesById = async (event: APIGatewayProxyEvent) => {
  return await editCourseFeesByIdFunction();
};
export const deleteFeesGroupById = async (event: APIGatewayProxyEvent) => {
  return await deleteFeesGroupByIdFunction();
};
export const deleteFeesMasterById = async (event: APIGatewayProxyEvent) => {
  return await deleteFeesMasterByIdFunction();
};
export const deleteCourseFeesById = async (event: APIGatewayProxyEvent) => {
  return await deleteCourseFeesByIdFunction();
};
export const statusChangeFeesGroupById = async (
  event: APIGatewayProxyEvent
) => {
  return await statusChangeFeesGroupByIdFunction();
};
export const statusChangeFeesMasterById = async (
  event: APIGatewayProxyEvent
) => {
  return await statusChangeFeesMasterByIdFunction();
};
export const statusChangeCourseFeesById = async (
  event: APIGatewayProxyEvent
) => {
  return await statusChangeCourseFeesByIdFunction();
};
export const listConcessionApplications = async (
  event: APIGatewayProxyEvent
) => {
  return await listConcessionApplicationsFunction();
};
export const getConcessionApplicationById = async (
  event: APIGatewayProxyEvent
) => {
  return await getConcessionApplicationByIdFunction();
};
export const processConcessionApplicationById = async (
  event: APIGatewayProxyEvent
) => {
  return await processConcessionApplicationByIdFunction();
};
export const listLatefineApplications = async (event: APIGatewayProxyEvent) => {
  return await listLatefineApplicationsFunction();
};
export const getLatefineApplicationById = async (
  event: APIGatewayProxyEvent
) => {
  return await getLatefineApplicationByIdFunction();
};
export const processLatefineApplicationById = async (
  event: APIGatewayProxyEvent
) => {
  return await processLatefineApplicationByIdFunction();
};
export const listStudentFees = async (event: APIGatewayProxyEvent) => {
  return await listStudentFeesFunction();
};
export const listLedger = async (event: APIGatewayProxyEvent) => {
  return await listLedgerFunction();
};
export const getLedgerById = async (event: APIGatewayProxyEvent) => {
  return await getLedgerByIdFunction();
};
export const listSpecialFees = async (event: APIGatewayProxyEvent) => {
  return await listSpecialFeesFunction();
};
export const listSettingsPayment = async (event: APIGatewayProxyEvent) => {
  return await listSettingsPaymentFunction();
};
export const setSettingsPayment = async (event: APIGatewayProxyEvent) => {
  return await setSettingsPaymentFunction();
};
export const listSettingsApplicationUserLevels = async (
  event: APIGatewayProxyEvent
) => {
  return await listSettingsApplicationUserLevelsFunction();
};
export const setSettingsApplicationUserLevels = async (
  event: APIGatewayProxyEvent
) => {
  return await setSettingsApplicationUserLevelsFunction();
};

import { APIResponse } from '../model/request-method.model';
import { createResponse } from '../helpers/handler-common';
import {
  FEES_GROUP_LIST_MOCK,
  FEES_MASTER_LIST_MOCK,
  COURSE_FEES_LIST_MOCK,
  FEES_MASTER_MOCK,
  FEES_GROUP_MOCK,
  COURSE_FEES_MOCK,
  CONCESSION_APPLICATION_LIST_MOCK,
  LATEFINE_APPLICATION_LIST_MOCK,
  STUDENT_FEES_LIST_MOCK,
} from '../mocks/institute.mocks';

export const createFeesGroupFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const createFeesMasterFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const createCourseFeesFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const listFeesGroupFunction = async () => {
  return createResponse(200, new APIResponse(false, '', FEES_GROUP_LIST_MOCK));
};
export const listFeesMasterFunction = async () => {
  return createResponse(200, new APIResponse(false, '', FEES_MASTER_LIST_MOCK));
};
export const listCourseFeesFunction = async () => {
  return createResponse(200, new APIResponse(false, '', COURSE_FEES_LIST_MOCK));
};
export const getFeesGroupByIdFunction = async () => {
  return createResponse(200, new APIResponse(false, '', FEES_MASTER_MOCK));
};
export const getFeesMasterByIdFunction = async () => {
  return createResponse(200, new APIResponse(false, '', FEES_GROUP_MOCK));
};
export const getCourseFeesByIdFunction = async () => {
  return createResponse(200, new APIResponse(false, '', COURSE_FEES_MOCK));
};
export const editFeesGroupByIdFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const editFeesMasterByIdFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const editCourseFeesByIdFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const deleteFeesGroupByIdFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const deleteFeesMasterByIdFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const deleteCourseFeesByIdFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const statusChangeFeesGroupByIdFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const statusChangeFeesMasterByIdFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const statusChangeCourseFeesByIdFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const listConcessionApplicationsFunction = async () => {
  return createResponse(
    200,
    new APIResponse(false, '', CONCESSION_APPLICATION_LIST_MOCK)
  );
};
export const getConcessionApplicationByIdFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const processConcessionApplicationByIdFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const listLatefineApplicationsFunction = async () => {
  return createResponse(
    200,
    new APIResponse(false, '', LATEFINE_APPLICATION_LIST_MOCK)
  );
};
export const getLatefineApplicationByIdFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const processLatefineApplicationByIdFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const listStudentFeesFunction = async () => {
  return createResponse(
    200,
    new APIResponse(false, '', STUDENT_FEES_LIST_MOCK)
  );
};
export const listLedgerFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const getLedgerByIdFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const listSpecialFeesFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const listSettingsPaymentFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const setSettingsPaymentFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const listSettingsApplicationUserLevelsFunction = async () => {
  return createResponse(200, new APIResponse(false));
};
export const setSettingsApplicationUserLevelsFunction = async () => {
  return createResponse(200, new APIResponse(false));
};

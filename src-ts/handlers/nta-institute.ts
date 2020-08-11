import { AWSHandler } from '../shared/helpers/handler-common';
import {
  CreateInstituteUser,
  DeleteInstituteUser,
} from '../shared/services/nta-institute.service';

const createInstituteUserHandler = AWSHandler('POST', CreateInstituteUser);
const deleteInstituteUserHandler = AWSHandler('DELETE', DeleteInstituteUser);

const createFeesGroupHandler = AWSHandler('POST', null);
const createFeesMasterHandler = AWSHandler('POST', null);
const createCourseFeesHandler = AWSHandler('POST', null);

const listFeesGroupHandler = AWSHandler('GET', null);
const listFeesMasterHandler = AWSHandler('GET', null);
const listCourseFeesHandler = AWSHandler('GET', null);

const getFeesGroupByIdHandler = AWSHandler('GET', null);
const getFeesMasterByIdHandler = AWSHandler('GET', null);
const getCourseFeesByIdHandler = AWSHandler('GET', null);

const editFeesGroupByIdHandler = AWSHandler('POST', null);
const editFeesMasterByIdHandler = AWSHandler('POST', null);
const editCourseFeesByIdHandler = AWSHandler('POST', null);

const deleteFeesGroupByIdHandler = AWSHandler('DELETE', null);
const deleteFeesMasterByIdHandler = AWSHandler('DELETE', null);
const deleteCourseFeesByIdHandler = AWSHandler('DELETE', null);

const statusChangeFeesGroupByIdHandler = AWSHandler('PATCH', null);
const statusChangeFeesMasterByIdHandler = AWSHandler('PATCH', null);
const statusChangeCourseFeesByIdHandler = AWSHandler('PATCH', null);

const listConcessionApplicationsHandler = AWSHandler('GET', null);
const getConcessionApplicationByIdHandler = AWSHandler('GET', null);
const processConcessionApplicationByIdHandler = AWSHandler('POST', null);

const listLatefineApplicationsHandler = AWSHandler('GET', null);
const getLatefineApplicationByIdHandler = AWSHandler('GET', null);
const processLatefineApplicationByIdHandler = AWSHandler('POST', null);

const listStudentFeesHandler = AWSHandler('GET', null);

const listLedgerHandler = AWSHandler('GET', null);
const getLedgerByIdHandler = AWSHandler('GET', null);

const listSpecialFeesHandler = AWSHandler('GET', null);

const listSettingsPaymentHandler = AWSHandler('GET', null);
const setSettingsPaymentHandler = AWSHandler('POST', null);

const listSettingsApplicationUserLevelsHandler = AWSHandler('GET', null);
const setSettingsApplicationUserLevelsHandler = AWSHandler('POST', null);

export {
  createInstituteUserHandler,
  deleteInstituteUserHandler,
  createFeesGroupHandler,
  createFeesMasterHandler,
  createCourseFeesHandler,
  listFeesGroupHandler,
  listFeesMasterHandler,
  listCourseFeesHandler,
  getFeesGroupByIdHandler,
  getFeesMasterByIdHandler,
  getCourseFeesByIdHandler,
  editFeesGroupByIdHandler,
  editFeesMasterByIdHandler,
  editCourseFeesByIdHandler,
  deleteFeesGroupByIdHandler,
  deleteFeesMasterByIdHandler,
  deleteCourseFeesByIdHandler,
  statusChangeFeesGroupByIdHandler,
  statusChangeFeesMasterByIdHandler,
  statusChangeCourseFeesByIdHandler,
  listConcessionApplicationsHandler,
  getConcessionApplicationByIdHandler,
  processConcessionApplicationByIdHandler,
  listLatefineApplicationsHandler,
  getLatefineApplicationByIdHandler,
  processLatefineApplicationByIdHandler,
  listStudentFeesHandler,
  listLedgerHandler,
  getLedgerByIdHandler,
  listSpecialFeesHandler,
  listSettingsPaymentHandler,
  setSettingsPaymentHandler,
  listSettingsApplicationUserLevelsHandler,
  setSettingsApplicationUserLevelsHandler,
};

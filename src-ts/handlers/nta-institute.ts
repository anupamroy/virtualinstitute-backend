import { AWSHandler } from '../shared/helpers/handler-common';
import {
  CreateInstituteUser,
  DeleteInstituteUser,
  createFeesGroup,
  createFeesMaster,
  createCourseFees,
  editFeesGroupById,
  editFeesMasterById,
  editCourseFeesById,
  processConcessionApplicationById,
  processLatefineApplicationById,
  setSettingsPayment,
  setSettingsApplicationUserLevels,
  listFeesGroup,
  listFeesMaster,
  listCourseFees,
  getFeesGroupById,
  getFeesMasterById,
  getCourseFeesById,
  listConcessionApplications,
  getConcessionApplicationById,
  listLatefineApplications,
  getLatefineApplicationById,
  listStudentFees,
  listLedger,
  getLedgerById,
  listSpecialFees,
  listSettingsPayment,
  listSettingsApplicationUserLevels,
  deleteFeesGroupById,
  deleteFeesMasterById,
  deleteCourseFeesById,
  statusChangeFeesGroupById,
  statusChangeFeesMasterById,
  statusChangeCourseFeesById,
} from '../shared/services/nta-institute.service';

const createInstituteUserHandler = AWSHandler('POST', CreateInstituteUser);
const deleteInstituteUserHandler = AWSHandler('DELETE', DeleteInstituteUser);

const createFeesGroupHandler = AWSHandler('POST', createFeesGroup);
const createFeesMasterHandler = AWSHandler('POST', createFeesMaster);
const createCourseFeesHandler = AWSHandler('POST', createCourseFees);

const listFeesGroupHandler = AWSHandler('GET', listFeesGroup);
const listFeesMasterHandler = AWSHandler('GET', listFeesMaster);
const listCourseFeesHandler = AWSHandler('GET', listCourseFees);

const getFeesGroupByIdHandler = AWSHandler('GET', getFeesGroupById);
const getFeesMasterByIdHandler = AWSHandler('GET', getFeesMasterById);
const getCourseFeesByIdHandler = AWSHandler('GET', getCourseFeesById);

const editFeesGroupByIdHandler = AWSHandler('POST', editFeesGroupById);
const editFeesMasterByIdHandler = AWSHandler('POST', editFeesMasterById);
const editCourseFeesByIdHandler = AWSHandler('POST', editCourseFeesById);

const deleteFeesGroupByIdHandler = AWSHandler('DELETE', deleteFeesGroupById);
const deleteFeesMasterByIdHandler = AWSHandler('DELETE', deleteFeesMasterById);
const deleteCourseFeesByIdHandler = AWSHandler('DELETE', deleteCourseFeesById);

const statusChangeFeesGroupByIdHandler = AWSHandler('PATCH', statusChangeFeesGroupById);
const statusChangeFeesMasterByIdHandler = AWSHandler('PATCH', statusChangeFeesMasterById);
const statusChangeCourseFeesByIdHandler = AWSHandler('PATCH', statusChangeCourseFeesById);

const listConcessionApplicationsHandler = AWSHandler('GET', listConcessionApplications);
const getConcessionApplicationByIdHandler = AWSHandler('GET', getConcessionApplicationById);
const processConcessionApplicationByIdHandler = AWSHandler('POST', processConcessionApplicationById);

const listLatefineApplicationsHandler = AWSHandler('GET', listLatefineApplications);
const getLatefineApplicationByIdHandler = AWSHandler('GET', getLatefineApplicationById);
const processLatefineApplicationByIdHandler = AWSHandler('POST', processLatefineApplicationById);

const listStudentFeesHandler = AWSHandler('GET', listStudentFees);

const listLedgerHandler = AWSHandler('GET', listLedger);
const getLedgerByIdHandler = AWSHandler('GET', getLedgerById);

const listSpecialFeesHandler = AWSHandler('GET', listSpecialFees);

const listSettingsPaymentHandler = AWSHandler('GET', listSettingsPayment);
const setSettingsPaymentHandler = AWSHandler('POST', setSettingsPayment);

const listSettingsApplicationUserLevelsHandler = AWSHandler('GET', listSettingsApplicationUserLevels);
const setSettingsApplicationUserLevelsHandler = AWSHandler('POST', setSettingsApplicationUserLevels);

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

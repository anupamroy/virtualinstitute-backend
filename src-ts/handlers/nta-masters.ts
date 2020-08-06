import { AWSHandler } from '../shared/helpers/handler-common';
import {
  checkIfNtaAccountsHeadExists,
  getInstituteTypeList,
  editAccountsHeadMasterById,
} from '../shared/services/nta-masters.service';
import {
  statusChangeOfAccountHeadMaster,
  checkIfNTAFeesHeadExists,
  checkIfNTAFeesTypeExists,
} from '../shared/services/nta-masters.service';
import {
  statusChangeOfFeesHeadMaster,
  statusChangeOfFeesTypeMaster,
} from '../shared/services/nta-masters.service';
import {
  editFeesTypeMasterById,
  editFeesHeadMasterById,
  deleteFeesHeadMasterById,
  deleteFeesTypeMasterById,
  deleteAccountsHeadMasterById,
} from '../shared/services/nta-masters.service';
import {
  getFeesHeadMastersList,
  getAccountHeadList,
  createFeesHeadMaster,
  createFeesTypeMaster,
  createAccountHeadMaster,
  getFeesTypeMasterList,
} from '../shared/services/nta-masters.service';
import {
  getFeesHeadByIdFunction,
  getFeesTypeByIdFunction,
  getAccountsHeadByIdFunction,
} from '../shared/functions/fees.functions';

const getFeesHeadListHandler = AWSHandler('GET', getFeesHeadMastersList);
const getAccountHeadListHandler = AWSHandler('GET', getAccountHeadList);
const getFeeTypeListHandler = AWSHandler('GET', getFeesTypeMasterList);
const getInstituteTypeListHandler = AWSHandler('GET', getInstituteTypeList);

const checkIfNTAFeesHeadExistsHandler = AWSHandler(
  'POST',
  checkIfNTAFeesHeadExists
);
const checkIfNTAFeesTypeExistsHandler = AWSHandler(
  'POST',
  checkIfNTAFeesTypeExists
);
const checkIfNTAAccountsHeadExistsHandler = AWSHandler(
  'POST',
  checkIfNtaAccountsHeadExists
);

const createFeesHeadHandler = AWSHandler('POST', createFeesHeadMaster);
const createAccountHeadHandler = AWSHandler('POST', createAccountHeadMaster);
const createFeeTypeHandler = AWSHandler('POST', createFeesTypeMaster);

const editFeesHeadHandler = AWSHandler('POST', editFeesHeadMasterById);
const editFeesTypeHandler = AWSHandler('POST', editFeesTypeMasterById);
const editAccountsHeadHandler = AWSHandler('POST', editAccountsHeadMasterById);

const deleteFeesHeadHandler = AWSHandler('DELETE', deleteFeesHeadMasterById);
const deleteFeesTypeHandler = AWSHandler('DELETE', deleteFeesTypeMasterById);
const deleteAccountsHeadHandler = AWSHandler(
  'DELETE',
  deleteAccountsHeadMasterById
);

const statusChangeFeesHeadHandler = AWSHandler(
  'PATCH',
  statusChangeOfFeesHeadMaster
);
const statusChangeFeesTypeHandler = AWSHandler(
  'PATCH',
  statusChangeOfFeesTypeMaster
);
const statusChangeAccountsHeadHandler = AWSHandler(
  'PATCH',
  statusChangeOfAccountHeadMaster
);

const getFeesHeadMasterByIdHandler = AWSHandler('GET', getFeesHeadByIdFunction);
const getFeesTypeByIdHandler = AWSHandler('GET', getFeesTypeByIdFunction);
const getAccountsHeadByIdHandler = AWSHandler(
  'GET',
  getAccountsHeadByIdFunction
);

export {
  getFeesHeadListHandler,
  getAccountHeadListHandler,
  getFeeTypeListHandler,
  getInstituteTypeListHandler,
  getFeesHeadMasterByIdHandler,
  getFeesTypeByIdHandler,
  getAccountsHeadByIdHandler,
  checkIfNTAFeesHeadExistsHandler,
  checkIfNTAFeesTypeExistsHandler,
  checkIfNTAAccountsHeadExistsHandler,
  createFeesHeadHandler,
  createAccountHeadHandler,
  createFeeTypeHandler,
  editFeesHeadHandler,
  editFeesTypeHandler,
  editAccountsHeadHandler,
  deleteFeesHeadHandler,
  deleteFeesTypeHandler,
  deleteAccountsHeadHandler,
  statusChangeFeesHeadHandler,
  statusChangeFeesTypeHandler,
  statusChangeAccountsHeadHandler,
};

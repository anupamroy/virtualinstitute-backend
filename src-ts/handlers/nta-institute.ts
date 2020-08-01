import { AWSHandler } from "../shared/helpers/handler";
import {
  createNTAAuthority,
  listNTAAuthority,
  createNTAUser,
  deleteNTAUser,
} from "./nta-admin.handler";
import {
  createStudent,
  checkToken,
  newPasswordChallenge,
} from "./nta-institute.service";
import { optionsResponse } from "../shared/helpers/response.helper";
import {
  statusChangeOfAccountHeadMaster,
  getFeesTypeMasterById,
  getAccountsHeadMasterById,
} from "./nta-masters";
import {
  statusChangeOfFeesHeadMaster,
  statusChangeOfFeesTypeMaster,
} from "./nta-masters";
import {
  editFeesTypeMasterById,
  editFeesHeadMasterById,
  deleteFeesHeadMasterById,
  deleteFeesTypeMasterById,
  deleteAccountsHeadMasterById,
} from "./nta-masters";
import {
  getFeesHeadMastersList,
  getAccountHeadList,
  createFeesHeadMaster,
  createFeesTypeMaster,
  createAccountHeadMaster,
  getFeesTypeMasterList,
  getFeesHeadMasterById,
} from "./nta-masters";
import {
  getFeesTypeByIdFunction,
  getAccountsHeadByIdFunction,
} from "../shared/functions/fees.functions";

// Actual Functions

const createNTAAuthorityHandler = AWSHandler("POST", createNTAAuthority);
const listNTAAuthorityHandler = AWSHandler("GET", listNTAAuthority);

const createNTAUserHandler = AWSHandler("POST", createNTAUser);
const deleteNTAUserHandler = AWSHandler("DELETE", deleteNTAUser);

const createStudentHandler = AWSHandler("POST", createStudent);

const checkTokenHandler = AWSHandler("GET", checkToken);
const newPasswordChallengeHandler = AWSHandler("POST", newPasswordChallenge);

const optionsHandler = AWSHandler("OPTIONS", optionsResponse);

// NTA Masters
const getFeesHeadListHandler = AWSHandler("GET", getFeesHeadMastersList);
const getAccountHeadListHandler = AWSHandler("GET", getAccountHeadList);
const getFeeTypeListHandler = AWSHandler("GET", getFeesTypeMasterList);

const getFeesHeadMasterByIdHandler = AWSHandler("GET", getFeesHeadMasterById);
const getFeesTypeByIdHandler = AWSHandler("GET", getFeesTypeMasterById);
const getAccountsHeadByIdHandler = AWSHandler("GET", getAccountsHeadMasterById);

const createFeesHeadHandler = AWSHandler("POST", createFeesHeadMaster);
const createAccountHeadHandler = AWSHandler("POST", createAccountHeadMaster);
const createFeeTypeHandler = AWSHandler("POST", createFeesTypeMaster);

const editFeesHeadHandler = AWSHandler("POST", editFeesHeadMasterById);
const editFeesTypeHandler = AWSHandler("POST", editFeesTypeMasterById);
const editAccountsHeadHandler = AWSHandler("POST", createAccountHeadMaster);

const deleteFeesHeadHandler = AWSHandler("DELETE", deleteFeesHeadMasterById);
const deleteFeesTypeHandler = AWSHandler("DELETE", deleteFeesTypeMasterById);
const deleteAccountsHeadHandler = AWSHandler(
  "DELETE",
  deleteAccountsHeadMasterById
);

const statusChangeFeesHeadHandler = AWSHandler(
  "PATCH",
  statusChangeOfFeesHeadMaster
);
const statusChangeFeesTypeHandler = AWSHandler(
  "PATCH",
  statusChangeOfFeesTypeMaster
);
const statusChangeAccountsHeadHandler = AWSHandler(
  "PATCH",
  statusChangeOfAccountHeadMaster
);

// // Get by ID

export {
  listNTAAuthorityHandler,
  createNTAAuthorityHandler,
  createNTAUserHandler,
  deleteNTAUserHandler,
  checkTokenHandler,
  newPasswordChallengeHandler,
  optionsHandler,
  getFeesHeadListHandler,
  getAccountHeadListHandler,
  getFeeTypeListHandler,
  createFeesHeadHandler,
  createAccountHeadHandler,
  createFeeTypeHandler,
  createStudentHandler,
  getFeesHeadMasterByIdHandler,
  getFeesTypeByIdHandler,
  getAccountsHeadByIdHandler,
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

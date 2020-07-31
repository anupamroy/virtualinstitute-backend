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
import { getFeesHeadMastersList, getAccountHeadList, createFeesHeadMaster, createFeesTypeMaster, createAccountHeadMaster, getFeesMasterList } from './nta-masters';


// Actual Functions

const createNTAAuthorityHandler = AWSHandler("POST", createNTAAuthority);
const listNTAAuthorityHandler = AWSHandler("GET", listNTAAuthority);

// const createNTAMastersHandler = AWSHandler("POST", createNTAMasters);
// const listNTAMastersHandler = AWSHandler("GET", listNTAMasters);

const createNTAUserHandler = AWSHandler("POST", createNTAUser);
const deleteNTAUserHandler = AWSHandler("DELETE", deleteNTAUser);

const createStudentHandler = AWSHandler("POST", createStudent);

const checkTokenHandler = AWSHandler("GET", checkToken);
const newPasswordChallengeHandler = AWSHandler("POST", newPasswordChallenge);

const optionsHandler = AWSHandler("OPTIONS", optionsResponse);

// Fees Head

// const createFeesHead = AWSHandler('POST')

const getFeesHeadListHandler = AWSHandler("GET", getFeesHeadMastersList);
const getAccountHeadListHandler = AWSHandler("GET", getAccountHeadList);
const getFeeTypeListHandler = AWSHandler("GET", getFeesMasterList);

const createFeesHeadHandler = AWSHandler("POST", createFeesHeadMaster);
const createAccountHeadHandler = AWSHandler("POST", createAccountHeadMaster);
const createFeeTypeHandler = AWSHandler("POST", createFeesTypeMaster);

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
};

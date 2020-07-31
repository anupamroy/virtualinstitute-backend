import { AWSHandler } from "../shared/helpers/handler";
import {
  createNTAMasters,
  createNTAAuthority,
  listNTAAuthority,
  listNTAMasters,
  createNTAUser,
  deleteNTAUser,
} from "./nta-admin.handler";
import {
  createStudent,
  checkToken,
  newPasswordChallenge,
  getFeesHeadList,
  getAccountHeadList,
} from "./nta-institute.service";
import { optionsResponse } from "../shared/helpers/response.helper";
import {
  getFeeTypeList,
  createFeesHead,
  createAccountHead,
  createFeeType,
} from "./nta-fees.service";

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

const getFeesHeadListHandler = AWSHandler("GET", getFeesHeadList);
const getAccountHeadListHandler = AWSHandler("GET", getAccountHeadList);
const getFeeTypeListHandler = AWSHandler("GET", getFeeTypeList);

const createFeesHeadHandler = AWSHandler("POST", createFeesHead);
const createAccountHeadHandler = AWSHandler("POST", createAccountHead);
const createFeeTypeHandler = AWSHandler("POST", createFeeType);

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
  createStudentHandler
};

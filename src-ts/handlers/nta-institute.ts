import { AWSHandler } from "../shared/helpers/handler";
import {
  newPasswordChallenge,
  getFeesHeadList,
  getAccountHeadList,
} from "./nta-institute.service";
import { optionsResponse } from "../shared/helpers/response.helper";
import { listNTAMasters } from "./nta-institute.service";
import {
  getFeeTypeList,
  createAccountHead,
  createFeeType,
} from "./nta-fees.service";
import {
  createFeesHead,
  createStudent,
  createNTAMasters,
} from "./nta-institute.service";
import {
  createNTAUser,
  deleteNTAUser,
  checkToken,
} from "./nta-institute.service";

// Actual Functions
const createNTAUserHandler = AWSHandler("POST", createNTAUser);
const deleteNTAUserHandler = AWSHandler("DELETE", deleteNTAUser);

const createNTAMastersHandler = AWSHandler("POST", createNTAMasters);
const listNTAMastersHandler = AWSHandler("GET", listNTAMasters);

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
  createNTAMastersHandler,
  listNTAMastersHandler,
};

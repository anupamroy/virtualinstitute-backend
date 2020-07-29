import { AWSHandler } from "../shared/helpers/handler";
import { newPasswordChallenge } from "./nta-institute.handlers.service";
import {
  createNTAUser,
  deleteNTAUser,
  checkToken,
} from "./nta-institute.handlers.service";

// Actual Functions
const createNTAUserHandler = AWSHandler("POST", createNTAUser);
const deleteNTAUserHandler = AWSHandler("DELETE", deleteNTAUser);

const checkTokenHandler = AWSHandler("GET", checkToken);
const newPasswordChallengeHandler = AWSHandler("POST", newPasswordChallenge);

export {
  createNTAUserHandler,
  deleteNTAUserHandler,
  checkTokenHandler,
  newPasswordChallengeHandler,
};

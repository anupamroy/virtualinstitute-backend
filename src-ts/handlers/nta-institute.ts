import { AWSHandler } from "../shared/helpers/handler";
import { createNTAUser, deleteNTAUser } from "./nta-institute.handlers.service";

// Actual Functions
const createNTAUserHandler = AWSHandler("POST", createNTAUser);
const deleteNTAUserHandler = AWSHandler('DELETE', deleteNTAUser);

export { createNTAUserHandler, deleteNTAUserHandler };

import { AWSHandler } from "../shared/helpers/handler";
import { createNTAUser } from "./nta-institute.handlers.service";

// Actual Functions
const createNTAUserHandler = AWSHandler("POST", createNTAUser);

export { createNTAUserHandler };

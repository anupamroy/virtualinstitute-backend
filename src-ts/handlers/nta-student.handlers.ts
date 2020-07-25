import { AWSHandler } from "../shared/helpers/handler";
import { getAllItems, getById, putItem } from "./nta-student_handlers_service";

const getAllItemsHandler = AWSHandler("GET", getAllItems);
const getByIdHandler = AWSHandler("GET", getById);
const putItemHandler = AWSHandler("POST", putItem);
export { getAllItemsHandler, getByIdHandler, putItemHandler };

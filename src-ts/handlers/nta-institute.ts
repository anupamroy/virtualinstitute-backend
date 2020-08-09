import { AWSHandler } from '../shared/helpers/handler-common';
import {
  CreateInstituteUser,
  DeleteInstituteUser,
} from '../shared/services/nta-institute.service';

const createInstituteUserHandler = AWSHandler('POST', CreateInstituteUser);
const deleteInstituteUserHandler = AWSHandler('DELETE', DeleteInstituteUser);

export { createInstituteUserHandler, deleteInstituteUserHandler };

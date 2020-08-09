import { AWSHandler } from '../shared/helpers/handler-common';
import {
  CreateStudentUser,
  DeleteStudentUser,
} from '../shared/services/nta-student.service';

const createStudentHandler = AWSHandler('POST', CreateStudentUser);
const deleteStudentHandler = AWSHandler('DELETE', DeleteStudentUser);

export { createStudentHandler, deleteStudentHandler };

import { CreateInstituteUser } from '../services/nta-institute.service';
export class CreatePersonRequest {
  phone_number: string = '';
  password: string = '';
  email: string = '';
  gender: string = '';
  name: string = '';
  family_name: string = '';
  middle_name: string = '';
}

export class CreateStudentRequest extends CreatePersonRequest {
  registration_number: string = '';
  TYPE: string = 'STUDENT';
}

export class CreateInstituteUserRequest extends CreatePersonRequest {
  TYPE: string = 'INSTITUTE';
}

import { CreateInstituteUser } from '../services/nta-institute.service';
import { FileMetaData } from './request-method.model';
export class CreatePersonRequest {
  phone_number: string = '';
  password: string = '';
  email: string = '';
  gender: string = '';
  name: string = '';
  family_name: string = '';
  middle_name: string = '';
  picture: FileMetaData = new FileMetaData();
}

export class CreateStudentRequest extends CreatePersonRequest {
  registration_number: string = '';
  TYPE: string = 'STUDENT';
}

export class CreateInstituteUserRequest extends CreatePersonRequest {
  TYPE: string = 'INSTITUTE';
}

export interface EventHeaders {
  accessToken: string;
  ntaAuthorityId: string;
  ntaAPIPasskey: string;
}

export class CreatePersonRequest {
  mobile: string = '';
  password: string = '';
  email: string = '';
  gender: string = '';
  name: string = '';
  family_name: string = '';
  middle_name: string = '';
}

export class CreateStudentRequest extends CreatePersonRequest {
  registrationNumber: string = '';
}

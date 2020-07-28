export class CreateNTAUserRequest {
  mobile: string = "";
  password: string = "";
  email: string = "";
  gender: string = "";
  name: string = "";
  family_name: string = "";
  middle_name: string = "";
}

export interface DeleteNTAUserRequest {
  mobile: string;
}

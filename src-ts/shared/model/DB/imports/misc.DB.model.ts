import { GeneralDBItem } from "./DB.model";
import { PersonType } from "./types.DB.model";

export class Person extends GeneralDBItem {
  firstName: string = "";
  middleName: string = "";
  lastName: string = "";
  phone: string = "";
  email: string = "";
}

export class SystemUser extends Person {
  username: string = "";
  type: PersonType = "INSTITUTE_USER";
}

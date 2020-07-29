import { GeneralDBItem } from './DB.model';
import { PersonType, ObjectId } from './types.DB.model';

export class Person extends GeneralDBItem {
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';
}

export class SystemUser extends Person {
  username: string = '';
  userType: PersonType = 'INSTITUTE_USER';
}

export class GeneralMasterItem extends GeneralDBItem {
  name: string = '';
}

export class ChildMasterItem extends GeneralMasterItem {
  parentId?: ObjectId = '';
}


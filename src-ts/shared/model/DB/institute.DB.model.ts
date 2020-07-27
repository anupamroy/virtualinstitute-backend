import { Masters, InstituteMasters } from "./imports/masters.DB.model";
import { SystemUser } from "./imports/misc.DB.model";
import { GeneralDBItem } from "./imports/DB.model";
import { LinkURL, ObjectId } from "./imports/types.DB.model";
import { InstitutionType } from "./imports/masters.model";

export class Institute extends GeneralDBItem {
  instituteName: string = "";
  instituteAddress: string = "";
  primaryPhone: string = "";
  alternatePhones: string[] = [];
  primaryEmail: string = "";
  alternateEmails: string[] = [];

  masters: Masters = new InstituteMasters();

  instituteTypeId: ObjectId = "";
  ledgerIds: ObjectId[] = [];

  logo: LinkURL = "";
  favIcon: LinkURL = "";
}

export class AccountHead extends GeneralDBItem {
  accountHead: string = "";
  balance: number = 0;
}

export class InstituteUser extends SystemUser {}

export class NTA extends SystemUser {
  masters: Masters = new Masters();
}

export class InstituteItem extends GeneralDBItem {
  instituteId: ObjectId = '';
}

// User Types and Permission Model
export class PermissionModel extends GeneralDBItem {}

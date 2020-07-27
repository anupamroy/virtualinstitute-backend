import { Masters, InstituteMasters } from "./imports/masters.DB.model";
import { SystemUser } from "./imports/misc.DB.model";
import { GeneralDBItem } from "./imports/DB.model";
import { InstitutionType, LinkURL, ObjectId } from "./imports/types.DB.model";

export class Institute extends GeneralDBItem {
  instituteName: string = "";
  instituteAddress: string = "";
  primaryPhone: string = "";
  alternatePhones: string[] = [];
  primaryEmail: string = "";
  alternateEmails: string[] = [];
  instituteType: InstitutionType = "COLLEGE";
  logo: LinkURL = "";
  favIcon: LinkURL = "";
  ledgerIds: ObjectId[] = [];
  masters: Masters = new InstituteMasters();
}

export class AccountHead extends GeneralDBItem {
  accountHead: string = "";
  balance: number = 0;
}

export class InstituteUser extends SystemUser {}

export class NTA extends SystemUser {
  masters: Masters = new Masters();
}

// User Types and Permission Model
export class PermissionModel extends GeneralDBItem {}

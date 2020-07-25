import { Masters } from "./imports/masters.DB.model";
import { SystemUser, LinkURL } from "./imports/misc.DB.model";
import { GeneralDBItem, ObjectId } from "./imports/DB.model";

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
  masters: Masters = new Masters();
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

export type SubjectGroup = string; // PCM PCB
export type InstituteAffiliation = string; // AICC CBSE...
export type InstitutionType = string;

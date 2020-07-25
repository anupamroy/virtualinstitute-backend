import { GeneralDBItem, ObjectId } from "./DB.model";
import { Masters } from "./masters.DB.model";
import { SystemUser, LinkURL } from "./misc.DB.model";

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

export type SubjectGroup = string; // PCM PCB

export type InstituteAffiliation = string; // AICC CBSE...

export type InstitutionType = string;

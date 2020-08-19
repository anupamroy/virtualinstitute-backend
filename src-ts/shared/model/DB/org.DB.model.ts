import { GeneralDBItem } from "./imports/DB.model";
import { v4 as uuid } from "uuid";
import { LinkURL, ObjectId } from "./imports/types.DB.model";

export class DBOrganization extends GeneralDBItem {
  tableType = "#ORG" + uuid();
  id = this.tableType + "#META";
  private _name: string = "";
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
    this.orgShortCode = this.name?.match(/\b([A-Z])/g)?.join("") || "";
  }
  orgType: "SELLER" | "INSTITUTE" = "SELLER";
  orgLogo: LinkURL = "";
  parentId: ObjectId = "";
  sellerId: ObjectId = "";
  orgShortCode: string = "";
}

export class DBOrgPhone extends GeneralDBItem {
  phoneText: string = "";
  phone: string = "";
  phoneType: string = "";
  phoneTimings: string = "";
  phoneDays: string = "";
  phoneShift: string = "";
  associatedPost: string = "";
  constructor(orgTableType: string) {
    super();
    this.id = orgTableType + "#PHONE" + uuid();
    this.tableType = orgTableType;
  }
}

export class DBOrgEmail extends GeneralDBItem {
  emailText: string = "";
  emailId: string = "";
  emailType: string = "";
  emailDays: string = "";
  associatedPost: string = "";
  constructor(orgTableType: string) {
    super();
    this.id = orgTableType + "#EMAIL" + uuid();
    this.tableType = orgTableType;
  }
}

export class DBOrgSettings extends GeneralDBItem {
  otp: boolean = false;
  password: boolean = false;
  constructor(orgTableType: string) {
    super();
    this.id = orgTableType + "#SOCIAL";
    this.tableType = orgTableType;
  }
}

export class DBOrgAffiliation extends GeneralDBItem {
  affiliationStartDate: Date = new Date();
  affiliationEndDate: Date = new Date();
  affiliationAuthority: string = '';
  affiliationGrade: string = '';
  certificationDocument: LinkURL = '';
  affiliationStatus: string = '';
  affiliationType: string = '';
  constructor(orgTableType: string) {
    super();
    this.id = orgTableType + "#AFFILIATION";
    this.tableType = orgTableType;
  }
}

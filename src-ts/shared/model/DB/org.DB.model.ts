import { GeneralDBItem } from "./imports/DB.model";
import { v4 as uuid } from "uuid";
import { LinkURL, ObjectId, DBOrgObjectType } from "./imports/types.DB.model";

export class DBOrganization extends GeneralDBItem {
  tableType = "#ORG" + uuid();
  id = this.tableType + "#META";
  name: string = "";

  // TODO: Create completely another table where it has masters. With PK ORGTYPE
  orgType: "SELLER" | "INSTITUTE" = "SELLER";
  orgLogo: LinkURL = "";
  orgInstituteType: ObjectId = "";
  parentId: ObjectId = "";
  sellerId: ObjectId = "";
  orgCode: string = "";
  private _orgShortCode: string = "";
  public get orgShortCode(): string {
    return this._orgShortCode;
  }
  public set orgShortCode(value: string) {
    this._orgShortCode = value;
    this.orgCode =
      "#ORG" +
      this.orgShortCode +
      this.orgType +
      (new Date().getTime() + "").slice(1, 10);
  }
  isDraft: boolean = true;
  getShortCode() {
    return (this.orgShortCode = this.name?.match(/\b([A-Z])/g)?.join("") || "");
  }
}

export class DBOrgItem extends GeneralDBItem {
  constructor(orgTableType: string, objectType: DBOrgObjectType) {
    super();
    this.id = "#" + orgTableType + "#" + objectType;
    this.tableType = "#" + orgTableType;
  }
}

export class DBORGAddress extends DBOrgItem {
  address: string = "";
  addressText: string = "";
  constructor(orgPK: string) {
    super(orgPK, "ADDRESS");
  }
}

export class DBOrgPhone extends DBOrgItem {
  phoneText: string = "";
  phone: string = "";
  phoneType: string = "";
  phoneTimings: string = "";
  phoneDays: string = "";
  phoneShift: string = "";
  associatedPost: string = "";
  constructor(orgPK: string) {
    super(orgPK, "PHONE");
  }
}

export class DBOrgEmail extends DBOrgItem {
  emailText: string = "";
  emailId: string = "";
  emailType: string = "";
  emailDays: string = "";
  associatedPost: string = "";
  constructor(orgPK: string) {
    super(orgPK, "EMAIL");
  }
}

// TODO: ORG Social

export class DBOrgRegistration extends DBOrgItem {
  registrationType: ObjectId = "";
  registrationNumber: string = "";
  registrationCertificateLink: LinkURL = "";
  constructor(orgPK: string) {
    super(orgPK, "REGISTRATION");
  }
}

export class DBOrgDocument extends DBOrgItem {
  documentLink: LinkURL = "";
  documentType: string = "";
  documentNumber: string = "";
  documentValidUpto: Date = new Date();
  constructor(orgPK: string) {
    super(orgPK, "DOCUMENT");
  }
}

export class DBOrgSettings extends DBOrgItem {
  otp: boolean = false;
  password: boolean = false;
  constructor(orgPK: string) {
    super(orgPK, "SETTINGS");
  }
}

export class DBOrgSubscription extends DBOrgItem {
  moduleId: ObjectId = "";
  subscriptionPackageId: ObjectId = "";
  subscriptionFrom: string = new Date().toISOString();
  subscriptionUpto: string = new Date().toISOString();
  subscriptionTypeId: ObjectId = "";
  constructor(orgPK: string) {
    super(orgPK, "SUBSCRIPTION");
  }
}

export class DBOrgAffiliation extends DBOrgItem {
  affiliationStartDate: Date = new Date();
  affiliationEndDate: Date = new Date();
  affiliationAuthority: string = "";
  affiliationGrade: string = "";
  certificationDocumentLink: LinkURL = "";
  affiliationStatus: string = "";
  affiliationType: string = "";
  constructor(orgPK: string) {
    super(orgPK, "AFFILIATION");
  }
}

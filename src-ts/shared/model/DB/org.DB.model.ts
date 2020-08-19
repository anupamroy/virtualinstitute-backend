import { GeneralDBItem } from './imports/DB.model';
import { v4 as uuid } from 'uuid';
import { LinkURL, ObjectId } from './imports/types.DB.model';

export class DBOrganization extends GeneralDBItem {
  tableType = '#ORG' + uuid();
  id = this.tableType + '#META';
  name: string = '';
  // TODO: Create completely another table where it has masters. With PK ORGTYPE
  orgType: 'SELLER' | 'INSTITUTE' = 'SELLER';
  orgLogo: LinkURL = '';
  orgInstituteType: ObjectId = '';
  parentId: ObjectId = '';
  sellerId: ObjectId = '';
  orgShortCode: string = '';

  getShortCode() {
    return (this.orgShortCode = this.name?.match(/\b([A-Z])/g)?.join('') || '');
  }
}

export class DBORGAddress extends GeneralDBItem {
  address: string = '';
  addressText: string = '';
  constructor(orgPK: string) {
    super();
    this.id = orgPK + '#ADDRESS' + uuid();
    this.tableType = orgPK;
  }
}

export class DBOrgPhone extends GeneralDBItem {
  phoneText: string = '';
  phone: string = '';
  phoneType: string = '';
  phoneTimings: string = '';
  phoneDays: string = '';
  phoneShift: string = '';
  associatedPost: string = '';
  constructor(orgPK: string) {
    super();
    this.id = orgPK + '#PHONE' + uuid();
    this.tableType = orgPK;
  }
}

export class DBOrgEmail extends GeneralDBItem {
  emailText: string = '';
  emailId: string = '';
  emailType: string = '';
  emailDays: string = '';
  associatedPost: string = '';
  constructor(orgTableType: string) {
    super();
    this.id = orgTableType + '#EMAIL' + uuid();
    this.tableType = orgTableType;
  }
}

// TODO: ORG Social

export class DBOrgSettings extends GeneralDBItem {
  otp: boolean = false;
  password: boolean = false;
  constructor(orgTableType: string) {
    super();
    this.id = orgTableType + '#SOCIAL';
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
    this.id = orgTableType + '#AFFILIATION';
    this.tableType = orgTableType;
  }
}

export class DBOrganizationDocument extends GeneralDBItem {
  documentLink: LinkURL = '';
  documentType: string = '';
  constructor(orgTableType: string) {
    super();
    this.id = orgTableType + '#DOCUMENT' + uuid();
    this.tableType = orgTableType;
  }
}

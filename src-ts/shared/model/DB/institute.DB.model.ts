import { Masters, InstituteMasters } from './imports/masters.DB.model';
import { SystemUser, ChildMasterItem } from './imports/misc.DB.model';
import { GeneralDBItem } from './imports/DB.model';
import { LinkURL, ObjectId, TableName } from './imports/types.DB.model';
import { NTAItem } from './nta.DB.model';

export class Institute extends NTAItem {
  ntaId: ObjectId = '';

  instituteName: string = '';
  instituteAddress: string = '';
  primaryPhone: string = '';
  alternatePhones: string[] = [];
  primaryEmail: string = '';
  alternateEmails: string[] = [];

  masters: Masters = new InstituteMasters();

  instituteTypeId: ObjectId = '';
  ledgerIds: ObjectId[] = []; // Account Heads

  logo: LinkURL = '';
  favIcon: LinkURL = '';
}

export class AccountHead extends ChildMasterItem {
  tableType: string = '';
  balance: number = 0;
}

export class InstituteUser extends SystemUser {
  instituteId: ObjectId = '';
  picture: LinkURL = '';
}

export class InstituteItem extends GeneralDBItem {
  instituteId: ObjectId = '';
}

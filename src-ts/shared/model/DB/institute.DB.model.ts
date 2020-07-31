import { Masters, InstituteMasters } from './imports/masters.DB.model';
import { SystemUser } from './imports/misc.DB.model';
import { GeneralDBItem } from './imports/DB.model';
import { LinkURL, ObjectId } from './imports/types.DB.model';
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
  ledgerIds: ObjectId[] = [];

  logo: LinkURL = '';
  favIcon: LinkURL = '';
}

export class AccountHead extends GeneralDBItem {
  accountHead: string = '';
  balance: number = 0;
}

export class InstituteUser extends SystemUser {
  instituteId: ObjectId = '';
}

export class InstituteItem extends GeneralDBItem {
  instituteId: ObjectId = '';
}


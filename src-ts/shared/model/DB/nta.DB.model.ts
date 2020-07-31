import { SystemUser } from './imports/misc.DB.model';
import { Masters } from './imports/masters.DB.model';
import { GeneralDBItem } from './imports/DB.model';
import { ObjectId } from 'aws-sdk/clients/codecommit';

export class NTAMasters extends Masters {}

export class NTAOptions {}

export class NTA extends GeneralDBItem {
  ntaName: string = '';
  ntaOptions: NTAOptions = new NTAOptions();
  masters: NTAMasters = new NTAMasters();
}

export class NTAItem extends GeneralDBItem {
  ntaId: ObjectId = '';
}

export class NTAUser extends SystemUser {
  ntaId: ObjectId = '';
}

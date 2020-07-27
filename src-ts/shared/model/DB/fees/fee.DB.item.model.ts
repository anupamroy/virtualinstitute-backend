import { GeneralDBItem } from '../imports/DB.model';
import {
  ObjectId,
  FeesModeOfPayment,
  Value,
  Unit,
  Percent,
} from '../imports/types.DB.model';
import { InstituteItem } from '../institute.DB.model';

export class Fee extends InstituteItem {
  instituteId: ObjectId = '';
  subjectCombinationId: ObjectId = '';
  feeHeadId: ObjectId = '';
  feesTypeId: ObjectId = '';
  academicYear: string = '';
  modeOfpayment: FeesModeOfPayment = 'MONTH';
  // amount: FeeAmount = new FeeAmount();
  concession: FeesConcession = new FeesConcession();
  lateFine: FeesLateFine = new FeesLateFine();
  accountHeads: FeesAccountHead[] = [];
  concessionAccounts: FeesAccountHead[] = [];
}


export class FeesConcession {
  canConcessionBeGiven: boolean = false;
  concessionUnit: Unit = 'PERCENT';
  maxConcession: Value | Percent = 50;
}
export class FeesLateFine {
  isLateFineApplicable: boolean = false;
  lateFineUnit: Unit = 'PERCENT';
  lateFine: Value | Percent = 10;
  isRevocable: boolean = false;
  maxRevocableAmountUnit: Unit = 'PERCENT';
  maxRevocableAmount: Value | Percent = 10;
}

export class FeesAccountHead extends GeneralDBItem {
  accountHeadParentId: ObjectId = '';
  amountPercent: Percent = 0;
}

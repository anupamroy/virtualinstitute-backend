import { GeneralDBItem } from '../imports/DB.model';
import {
  ObjectId,
  FeesModeOfPayment,
  Value,
  Unit,
  Percent,
} from '../imports/types.DB.model';
import { InstituteItem } from '../institute.DB.model';

// Fees Structure
// fees.dt_fees-Structure
export class Fee extends InstituteItem {
  instituteId: ObjectId = '';
  subjectCombinationId: ObjectId = '';
  feeHeadId: ObjectId = '';
  feesTypeId: ObjectId = '';
  academicYear: string = '';
  modeOfpayment: FeesModeOfPayment = 'MONTH';
  amount: number = 0;
  amountForeignNational: number = 0;
  concession: FeesConcession = new FeesConcession();
  lateFine: FeesLateFine = new FeesLateFine();
  accountHeads: FeesAccountHead[] = [];
  concessionAccounts: FeesAccountHead[] = [];
}

// Fees Structure
// fees.dt_fees-Structure
export class FeesConcession {
  canConcessionBeGiven: boolean = false;
  concessionUnit: Unit = 'PERCENT';
  maxConcession: Value | Percent = 50;
}

// Fees Structure
// fees.dt_fees-Structure
export class FeesLateFine {
  isLateFineApplicable: boolean = false;
  lateFineUnit: Unit = 'PERCENT';
  lateFine: Value | Percent = 10;
  isRevocable: boolean = false;
  maxRevocableAmountUnit: Unit = 'PERCENT';
  maxRevocableAmount: Value | Percent = 10;
}

// Account Headwise Distribution
// fees.dt_account_headwise_distribution
// Here we don't need Institute Id as this is nested under fees
export class FeesAccountHead extends GeneralDBItem {
  accountHeadParentId: ObjectId = '';
  amountPercent: Percent = 0;
}

// export class FeeGroup {
//   feeGroupName: FeeGroupName = "";
//   fees: Fee[] = [];
// }

import { GeneralDBItem, ObjectId } from "./imports/DB.model";

export class FeesHead extends GeneralDBItem {
  feesHeadName: string = "";
  parentFeesHeadId: ObjectId = "";
}

export class FeeType {
  feeTypeName: FeeTypeName = "";
}

export class Fee extends GeneralDBItem {
  instituteId: ObjectId = "";
  subjectCombinationId: ObjectId = "";
  feeHeadId: ObjectId = "";
  feeTypeName: FeeTypeName = "";
  academicYear: string = "";
  modeOfpayment: FeesModeOfPayment = "MONTH";
  amount: FeeAmount = new FeeAmount();
  concession: FeesConcession = new FeesConcession();
  lateFine: FeesLateFine = new FeesLateFine();
  accountHeads: FeesAccountHead[] = [];
  concessionAccounts: FeesAccountHead[] = [];
}

export class FeeAmount {
  nationals: FeeStudentCategory[] = [];
  foreign = 0;
}

export class FeeStudentCategory {
  studentCategory: string = "";
  amount = 0;
}

export class FeesConcession {
  canConcessionBeGiven = false;
  concessionUnit: "PERCENT" | "VALUE" = "PERCENT";
  maxConcession = 50;
}
export class FeesLateFine {
  isLateFineApplicable = false;
  lateFineUnit: "PERCENT" | "VALUE" = "PERCENT";
  lateFine = 10;
  isRevocable = false;
  maxRevocableAmountUnit: "PERCENT" | "VALUE" = "PERCENT";
  maxRevocableAmount = 10;
}

export class FeesAccountHead extends GeneralDBItem {
  accountHeadParentId: ObjectId = "";
  amountPercent = 0;
}

export type FeeTypeName = string; // Application Fees Exam Fees
// export type FeesHeadName = string; // Tution Fees etc
export type FeesModeOfPayment = "SEMESTER" | "MONTH" | "YEAR";
export type FeeGroupName = string;

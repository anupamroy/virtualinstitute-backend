import { GeneralDBItem } from "./DB.model";



export class FeeGroup {                       // Fee Tyoes are grouped together for a course.
  feeGroupName = "";
  feeStructures: FeesStructure[] = [];
}

export class FeesStructure extends GeneralDBItem {
  feeTypeName: FeeTypeName = "";
  feeHeads: FeeHead[] = [];
}

// Tuition fees, Development fees, Library caution deposits
export class FeeHead {
  feeHeadName = "";
  modeOfpayment: FeesModeOfPayment = "BANK";
  amount = {
    nationals: 0,
    foreign: 0,
  };
  concession: FeesConcession = new FeesConcession();
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

export type FeeTypeName = string; // Application Fees Exam Fees
export type FeesModeOfPayment = "BANK" | "CHALLAN";
export type FeeGroupName = string; // SC ST

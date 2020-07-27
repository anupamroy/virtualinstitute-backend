import { GeneralDBItem } from "../imports/DB.model";
import { ObjectId } from "../imports/types.DB.model";

export class FeesHead extends GeneralDBItem {
  feesHeadName: string = "";
  parentFeesHeadId: ObjectId = "";
}

export class FeeType extends GeneralDBItem {
  feeTypeName: string = "";
}

export class LedgerTransaction extends GeneralDBItem {
  accountHeadId: ObjectId = "";
  feeId: ObjectId = "";
  transactionId: ObjectId = "";
  feeHeadId: ObjectId = "";
  ledgerDate: Date = new Date();
}

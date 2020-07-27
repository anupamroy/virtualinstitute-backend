import { GeneralDBItem } from "./imports/DB.model";

// Generated only after completion - Reciept
export class Reciept extends GeneralDBItem {
    recieptNumber: string = '';
    transaction: Transation = new Transation();
}


export class Transation extends GeneralDBItem {
  transactionNumber: string = "";
  modeOfPayment: string = "";
  amountPaid: number = 0;
  userId: string = "";        // id of the user/student/institute payer
  forUserId: string = "";       // id of the user/student/institute reciever
  instituteId: string = "";
  userType: string = '';   // STUDENT | APPLICANT | ADMIN ....   // The person who actually commits this trasaction 
  forUserType: string = '';     // STUDENT | APPLICANT | ADMIN ....   // The person who recieves this transaction
  transactionStatus: TransactionStatus = "CLOSED";
}

// Pre Transaction
export class Challan extends GeneralDBItem {
  challanNumber: string = ""; // StudentId + Institute Code + Date
  status: "PROGRESS" | "OPEN" | "CLOSED" = "OPEN";
}

export type TransactionStatus = "IN_PROGRESS" | "CLOSED" | "FAILED";

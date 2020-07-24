import { GeneralDBItem } from "./DB.model";

export class Person extends GeneralDBItem {
  firstName = "";
  middleName = "";
  lastName = "";
  phone = "";
  email = "";
}


// Generated only after completion - Reciept
export class Transation extends GeneralDBItem {
  transactionNumber = '';
  modeOfPayment = "";
  amountPaid = 0;
  studentId = "";
  instituteId = "";
}

export class Challan extends GeneralDBItem {
  challanNumber = ""; // StudentId + Institute Code + Date
  status: 'PROGRESS' | 'OPEN' | 'CLOSED' = 'OPEN';
}

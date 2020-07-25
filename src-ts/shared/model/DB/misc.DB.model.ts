import { GeneralDBItem } from "./DB.model";

export class Person extends GeneralDBItem {
  firstName: string = "";
  middleName: string = "";
  lastName: string = "";
  phone: string = "";
  email: string = "";
}

export class SystemUser extends Person {
  username: string = "";
  type: PersonType = "INSTITUTE_USER";
}

// Generated only after completion - Reciept
export class Transation extends GeneralDBItem {
  transactionNumber: string = "";
  modeOfPayment: string = "";
  amountPaid: number = 0;
  studentId: string = "";
  instituteId: string = "";
}

// Pre Transaction
export class Challan extends GeneralDBItem {
  challanNumber: string = ""; // StudentId + Institute Code + Date
  status: "PROGRESS" | "OPEN" | "CLOSED" = "OPEN";
}

export type PersonType = "INSTITUTE_USER" | "ADMIN" | "STUDENT";
export type LinkURL = string;

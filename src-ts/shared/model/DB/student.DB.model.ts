import { Person, LinkURL } from "./misc.DB.model";
import { GeneralDBItem, ObjectId } from "./DB.model";

export class Student extends Person {
  gender: Gender = "MALE";
  rollNo = "";
  registrationNo = "";
  photo: LinkURL = "";
  signature: LinkURL = "";
  subjectCombinationId: ObjectId[] = []; // Course Id's
  isForeignNational = true;
  studentType: StudentType = "";
  instituteId: ObjectId = "";
}

export class StudentApplication extends GeneralDBItem {
  studentId = "";
  instituteId = "";
  feesTypeId = "";
  feeStructureId = "";
  applicationType: "CONCESSION" | "LATE_FINE" = "CONCESSION";
  isApproved = false;
  amountApplied = 0;
  amountApproved = 0;
  semesterId = "";
  month = "";
  year = "";
}

export type Gender = "MALE" | "FEMALE" | "OTHER";
export type StudentType = string;

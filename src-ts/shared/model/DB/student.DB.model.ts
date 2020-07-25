import { Person, LinkURL } from "./imports/misc.DB.model";
import { ObjectId, GeneralDBItem } from "./imports/DB.model";

export class Student extends Person {
  gender: Gender = "MALE";
  rollNo = "";
  registrationNo = "";
  instituteId: ObjectId = "";
  subjectCombinationId: ObjectId[] = []; // Course Id's photo: LinkURL = "";
  signature: LinkURL = "";
  isForeignNational = true;
  studentType: StudentType = "";
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

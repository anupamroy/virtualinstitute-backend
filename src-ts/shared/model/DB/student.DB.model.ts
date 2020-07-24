import { Person } from "./misc.DB.model";
import { GeneralDBItem } from "./DB.model";

export class Student extends Person {
  gender: Gender = "MALE";

  rollNo = "";
  registrationNo = "";
  // S3 Links
  photo = "";
  signature = "";
  courses: string[] = []; // Course Id's

  isForeignNational = true;

  studentType: StudentType = "";


  // Institute Association
  instituteId = '';
  courseId = '';
  // year = 1; and semester would have to updated for each student

  // Whether the student is an applicant or a student
  applicationStatus: ApplicationStatus = "ACCEPTED";
}

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type ApplicationStatus = "ACCEPTED" | "PENDING" | "REJECTED";

export type StudentType = string;

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

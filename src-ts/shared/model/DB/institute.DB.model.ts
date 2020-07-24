import { GeneralDBItem } from "./DB.model";
import { type } from "os";
import { Masters } from "./masters.DB.model";
import { FeeGroup } from "./fees.DB.model";

export class Institute extends GeneralDBItem {
  instituteName = "";
  instituteAddress = "";
  primaryPhone = "";
  alternatePhones: string[] = [];
  primaryEmail = "";
  alternateEmails: string[] = [];

  instituteAffiliation: InstituteAffiliation = "";
  //   Links
  logo = "";
  favIcon = "";

  ledger: AccountHead[] = [];

  masters: Masters = new Masters();

  departments: Department[] = [];
}

export class AccountHead extends GeneralDBItem {
  accountHead = ""; // Kept as a class here in case we have to add additional items
  balance = 0;
}

export class InstituteMasters {}

export class Department extends GeneralDBItem {
  courses: Course[] = [];
}

export class Course extends GeneralDBItem {
  courseName = "";
  courseCode = "";
  courseType: CourseType = "";
  courselevel: CourseLevel = "";
  courseStream: CourseStream = "";
  semesters: Semester[] = [];

  feeGroup: FeeGroup[] = []; // For faster selection of fee types
}

export class Semester extends GeneralDBItem {
  subjects: Subject[] = [];
}

export class Subject extends GeneralDBItem {
  subjectName = "";
  subjectCode = "";
  subjectGroup: SubjectGroup = "";
  islabBased = true;
  islanguage = true;
}

export class InstituteUser extends GeneralDBItem {
  username = "";
  firstName = "";
  middleName = "";
  lastName = "";
  email = "";
  phone = "";
}

export type CourseType = string; // UG PG Vocational

export type CourseLevel = string; // BSC, MA, BE, ME

export type CourseStream = string; // Science Arts Commerce

export type SubjectGroup = string; // PCM PCB

export type InstituteAffiliation = string; // AICC CBSE...

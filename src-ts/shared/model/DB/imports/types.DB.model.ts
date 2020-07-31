// Base
export type ObjectId = string;

// Institute
// export type SubjectGroup = string; // PCM PCB
export type InstituteAffiliation = string; // AICC CBSE...
// export type InstitutionType = string;

// Students
export type Gender = "MALE" | "FEMALE" | "OTHER";
// export type StudentType = string;
export type ApplicationType = "CONCESSION" | "LATE_FINE";

// Dates
export type Month = string;
export type Year = string;
export type Day = string;
export type DayMonth = string;

// Fees
// export type FeeTypeName = string; // Application Fees Exam Fees
// export type FeesHeadName = string; // Tution Fees etc
export type FeesModeOfPayment = "SEMESTER" | "MONTH" | "YEAR";
export type FeeStatus = "PAID" | "DUE";
// export type FeeGroupName = string;

// Units
export type Percent = number;
export type Value = number;
export type Unit = "PERCENT" | "VALUE";

// Transaction
export type TransactionStatus = "IN_PROGRESS" | "CLOSED" | "FAILED";
export type ChallanStatus = "PROGRESS" | "OPEN" | "CLOSED";

// Course
// export type CourseType = string; // UG PG Vocational
// export type CourseLevel = string; // BSC, MA, BE, ME
// export type CourseStream = string; // Science Arts Commerce

// Person
export type PersonType = "INSTITUTE_USER" | "ADMIN" | "STUDENT";
export type LinkURL = string;

export type TableName =
  | NTATableName
  | StudentTableName
  | InstituteTableName
  | FeeTableName;

export type NTATableName = "NTA_AUTHORITY" | "NTA_USER";
export type InstituteTableName = "INSTITUTE" | "INSTITUTE_USER";
export type StudentTableName = "STUDENT" | "STUDENT_APPLICATION";
export type FeeTableName =
  | "FEE"
  | "FEE_HEAD_MASTER"
  | "FEE_TYPE_MASTER"
  | "ACCOUNTS_HEAD_MASTER";

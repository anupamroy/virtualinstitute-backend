import { GeneralDBItem, ObjectId } from "./DB.model";

export class Course extends GeneralDBItem {
  courseName: string = "";
  courseCode: string = "";
  courseType: CourseType = "";
  courselevel: CourseLevel = "";
  courseStream: CourseStream = "";
  subjectCombinationIds: ObjectId[] = [];
}

export type CourseType = string; // UG PG Vocational
export type CourseLevel = string; // BSC, MA, BE, ME
export type CourseStream = string; // Science Arts Commerce

export class SubjectCombination extends GeneralDBItem {}

// export class Semester extends GeneralDBItem {
//   subjects: Subject[] = [];
// }

// export class Subject extends GeneralDBItem {
//   subjectName: string = "";
//   subjectCode: string = "";
//   subjectGroup: SubjectGroup = "";
//   islabBased: boolean = true;
//   islanguage: boolean = true;
// }

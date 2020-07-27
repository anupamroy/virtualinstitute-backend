import { GeneralDBItem } from "./imports/DB.model";
import {
  CourseType,
  CourseLevel,
  CourseStream,
  ObjectId,
} from "./imports/types.DB.model";

export class Course extends GeneralDBItem {
  courseName: string = "";
  courseCode: string = "";
  courseType: CourseType = "";
  courselevel: CourseLevel = "";
  courseStream: CourseStream = "";
  subjectCombinationIds: ObjectId[] = [];
}

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

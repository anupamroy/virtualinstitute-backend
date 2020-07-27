import { ObjectId, Year } from './imports/types.DB.model';
import { InstituteItem } from './institute.DB.model';

export class Course extends InstituteItem {
  instituteId: ObjectId = '';
  courseTypeId: ObjectId = '';
  courselevel: ObjectId = '';
  courseStream: ObjectId = '';

  courseName: string = '';
  courseCode: string = '';

  subjectCombinationIds: ObjectId[] = [];

  courseCredits: number = 0;
  maxStudentsCanBeTaken: number = 0;
  minStudentsCanBeTaken: number = 0;
}

export class SubjectCombination extends InstituteItem {}

export class CourseCombination extends InstituteItem {
  courseId: ObjectId = '';
  semesterYear: Year = '';
  semesterYearWiseCredit: number = 0;
  semesterYearWiseCourseCredit: number = 0;
  semesterYearWiseMinSubject: number = 0;
  semesterYearWisemaxSubject: number = 0;
}

export class CourseCombinationSubjectGroup extends InstituteItem {
  courseCombinationId: ObjectId = '';
}

// TBD
// export class Semester extends InstituteItem {
//   subjects: Subject[] = [];
// }

export class Subject extends InstituteItem {
  subjectName: string = '';
  subjectCode: string = '';
  islabBased: boolean = true;
  islanguage: boolean = true;
}

export class SubjectGroup extends InstituteItem {
  subjectGroupName: string = '';
  subjectGroupAbbrName: string = '';
  maxSubjectFromGroup: number = 0;
  minSubjectFromGroup: number = 0;
  minSubjectsFromSameStream: number = 0;
  minSubjectsFromDifferentStream: number = 0;
  subJectDetails: string = '';
}

export class CourseSubjectCombination extends InstituteItem {
  studentId: ObjectId = '';
  semester: string = '';
  academic_year: Year = '';

  courseId: ObjectId = '';
  couurseCombinationId: ObjectId = '';
}

import { ObjectId, Year } from './imports/types.DB.model';
import { InstituteItem } from './institute.DB.model';
import { StudentItem } from './student.DB.model';

// students.dt_course
export class Course extends InstituteItem {
  instituteId: ObjectId = '';
  courseTypeId: ObjectId = '';
  courseLevel: ObjectId = '';
  courseStream: ObjectId = '';

  courseName: string = '';
  courseCode: string = '';


  courseCredits: number = 0;
  maxStudentsCanBeTaken: number = 0;
  minStudentsCanBeTaken: number = 0;
}


// students.dt_course_combiation_details
export class CourseCombination extends InstituteItem {
  courseId: ObjectId = '';
  semesterYear: Year = '';
  semesterYearWiseCredit: number = 0;
  semesterYearWiseCourseCredit: number = 0;
  semesterYearWiseMinSubject: number = 0;
  semesterYearWisemaxSubject: number = 0;
}

// students.dt_course_combination_subject_group
export class CourseCombinationSubjectGroup extends InstituteItem {
  courseCombinationId: ObjectId = '';
  subjectGroupId: ObjectId = '';
  maxSubjectFromGroup: number = 0;
  minSubjectFromGroup: number = 0;
  minSubjectsFromSameStream: number = 0;
  minSubjectsFromDifferentStream: number = 0;
  subJectDetails: string = '';
}

// TBD
// export class Semester extends InstituteItem {
//   subjects: Subject[] = [];
// }

// students.dt_subjects
export class Subject extends InstituteItem {
  subjectName: string = '';
  subjectCode: string = '';
  islabBased: boolean = true;
  islanguage: boolean = true;
}

// students.dt_subject_group
export class SubjectGroup extends InstituteItem {
  subjectGroupName: string = '';
  subjectGroupAbbrName: string = '';

  // students.dt_groupwise_subjects
  subjectIds: ObjectId[] = [];
}

// students.dt_course_subject_combination
export class CourseSubjectCombination extends StudentItem {
  semester: string = '';
  academic_year: Year = '';

  courseId: ObjectId = '';
  couurseCombinationId: ObjectId = '';
}

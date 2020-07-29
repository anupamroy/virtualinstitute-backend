"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSubjectCombination = exports.SubjectGroup = exports.Subject = exports.CourseCombinationSubjectGroup = exports.CourseCombination = exports.Course = void 0;
const institute_DB_model_1 = require("./institute.DB.model");
const student_DB_model_1 = require("./student.DB.model");
// students.dt_course
class Course extends institute_DB_model_1.InstituteItem {
    constructor() {
        super(...arguments);
        this.instituteId = '';
        this.courseTypeId = '';
        this.courseLevel = '';
        this.courseStream = '';
        this.courseName = '';
        this.courseCode = '';
        this.courseCredits = 0;
        this.maxStudentsCanBeTaken = 0;
        this.minStudentsCanBeTaken = 0;
    }
}
exports.Course = Course;
// students.dt_course_combiation_details
class CourseCombination extends institute_DB_model_1.InstituteItem {
    constructor() {
        super(...arguments);
        this.courseId = '';
        this.semesterYear = '';
        this.semesterYearWiseCredit = 0;
        this.semesterYearWiseCourseCredit = 0;
        this.semesterYearWiseMinSubject = 0;
        this.semesterYearWisemaxSubject = 0;
    }
}
exports.CourseCombination = CourseCombination;
// students.dt_course_combination_subject_group
class CourseCombinationSubjectGroup extends institute_DB_model_1.InstituteItem {
    constructor() {
        super(...arguments);
        this.courseCombinationId = '';
        this.subjectGroupId = '';
        this.maxSubjectFromGroup = 0;
        this.minSubjectFromGroup = 0;
        this.minSubjectsFromSameStream = 0;
        this.minSubjectsFromDifferentStream = 0;
        this.subJectDetails = '';
    }
}
exports.CourseCombinationSubjectGroup = CourseCombinationSubjectGroup;
// TBD
// export class Semester extends InstituteItem {
//   subjects: Subject[] = [];
// }
// students.dt_subjects
class Subject extends institute_DB_model_1.InstituteItem {
    constructor() {
        super(...arguments);
        this.subjectName = '';
        this.subjectCode = '';
        this.islabBased = true;
        this.islanguage = true;
    }
}
exports.Subject = Subject;
// students.dt_subject_group
class SubjectGroup extends institute_DB_model_1.InstituteItem {
    constructor() {
        super(...arguments);
        this.subjectGroupName = '';
        this.subjectGroupAbbrName = '';
        // students.dt_groupwise_subjects
        this.subjectIds = [];
    }
}
exports.SubjectGroup = SubjectGroup;
// students.dt_course_subject_combination
class CourseSubjectCombination extends student_DB_model_1.StudentItem {
    constructor() {
        super(...arguments);
        this.semester = '';
        this.academic_year = '';
        this.courseId = '';
        this.couurseCombinationId = '';
    }
}
exports.CourseSubjectCombination = CourseSubjectCombination;

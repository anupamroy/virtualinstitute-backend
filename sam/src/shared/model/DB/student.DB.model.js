"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentApplication = exports.StudentItem = exports.Student = void 0;
const misc_DB_model_1 = require("./imports/misc.DB.model");
const institute_DB_model_1 = require("./institute.DB.model");
// students.dt_students
class Student extends misc_DB_model_1.Person {
    constructor() {
        super(...arguments);
        this.gender = 'MALE';
        this.rollNo = '';
        this.registrationNo = '';
        this.photo = '';
        this.signature = '';
        this.isForeignNational = false;
        this.year = '';
        this.session = '';
        this.phase = 0;
        this.status = '';
        this.instituteId = '';
        this.subjectCombinationId = []; // Course Id's
        this.studentTypeId = '';
        this.courseCategoryId = '';
        this.courseLevelId = '';
        this.courseSubjectId = '';
        this.courseTypeId = '';
        this.courseCombinationId = '';
    }
}
exports.Student = Student;
class StudentItem extends institute_DB_model_1.InstituteItem {
    constructor() {
        super(...arguments);
        this.studentId = '';
    }
}
exports.StudentItem = StudentItem;
// Student Concession late Fine Application
// students.dt_student_latefine_application
class StudentApplication extends StudentItem {
    constructor() {
        super(...arguments);
        this.feesTypeId = '';
        this.feeStructureId = '';
        this.semesterId = '';
        this.applicationType = 'CONCESSION';
        this.isApproved = false;
        this.amountApplied = 0;
        this.amountApproved = 0;
        this.month = '';
        this.year = '';
    }
}
exports.StudentApplication = StudentApplication;

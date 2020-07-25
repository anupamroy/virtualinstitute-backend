"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentApplication = exports.Student = void 0;
const misc_DB_model_1 = require("./imports/misc.DB.model");
const DB_model_1 = require("./imports/DB.model");
class Student extends misc_DB_model_1.Person {
    constructor() {
        super(...arguments);
        this.gender = "MALE";
        this.rollNo = "";
        this.registrationNo = "";
        this.instituteId = "";
        this.subjectCombinationId = []; // Course Id's photo: LinkURL = "";
        this.signature = "";
        this.isForeignNational = true;
        this.studentType = "";
    }
}
exports.Student = Student;
class StudentApplication extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.studentId = "";
        this.instituteId = "";
        this.feesTypeId = "";
        this.feeStructureId = "";
        this.applicationType = "CONCESSION";
        this.isApproved = false;
        this.amountApplied = 0;
        this.amountApproved = 0;
        this.semesterId = "";
        this.month = "";
        this.year = "";
    }
}
exports.StudentApplication = StudentApplication;

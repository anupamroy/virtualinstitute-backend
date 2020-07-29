"use strict";
// This file Contains just the model for all the masters
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeesHeadName = exports.FeeType = exports.FeeGroup = exports.UserType = exports.InstitutionType = exports.SubjectGroup = exports.CourseStream = exports.CourseLevel = exports.CourseType = exports.StudentReligion = exports.StudentType = void 0;
const misc_DB_model_1 = require("./misc.DB.model");
// Students
//  SC ST General
// In all Student Types, General would always be default, and would always be mapped as such
class StudentType extends misc_DB_model_1.GeneralMasterItem {
}
exports.StudentType = StudentType;
class StudentReligion extends misc_DB_model_1.GeneralMasterItem {
}
exports.StudentReligion = StudentReligion;
// Courses
// BSC, MA, BE, ME
class CourseType extends misc_DB_model_1.GeneralMasterItem {
}
exports.CourseType = CourseType;
// UG PG Vocational
// students.dt_course_level
class CourseLevel extends misc_DB_model_1.GeneralMasterItem {
}
exports.CourseLevel = CourseLevel;
// Engg Arts Commerce
class CourseStream extends misc_DB_model_1.GeneralMasterItem {
}
exports.CourseStream = CourseStream;
// PCM PCB PCMB Vocational
class SubjectGroup extends misc_DB_model_1.GeneralMasterItem {
}
exports.SubjectGroup = SubjectGroup;
// Institution
class InstitutionType extends misc_DB_model_1.GeneralMasterItem {
}
exports.InstitutionType = InstitutionType;
// Users
class UserType extends misc_DB_model_1.GeneralMasterItem {
}
exports.UserType = UserType;
// Fees
// fees.dt_fees_group
class FeeGroup extends misc_DB_model_1.ChildMasterItem {
}
exports.FeeGroup = FeeGroup;
// fees.dt_fees_type
class FeeType extends misc_DB_model_1.GeneralMasterItem {
    constructor() {
        super(...arguments);
        this.type = "FEE_TYPE_MASTER";
    }
}
exports.FeeType = FeeType;
class FeesHeadName extends misc_DB_model_1.ChildMasterItem {
    constructor() {
        super(...arguments);
        this.type = "FEE_HEAD_MASTER";
        this.instituteTypeId = "";
    }
}
exports.FeesHeadName = FeesHeadName;

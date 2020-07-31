// This file Contains just the model for all the masters

import { GeneralMasterItem, ChildMasterItem } from "./misc.DB.model";
import { TableName, ObjectId } from "./types.DB.model";

// Students

//  SC ST General
// In all Student Types, General would always be default, and would always be mapped as such
export class StudentType extends GeneralMasterItem {}
export class StudentReligion extends GeneralMasterItem {}

// Courses

// BSC, MA, BE, ME
export class CourseType extends GeneralMasterItem {}

// UG PG Vocational
// students.dt_course_level
export class CourseLevel extends GeneralMasterItem {}

// Engg Arts Commerce
export class CourseStream extends GeneralMasterItem {}

// PCM PCB PCMB Vocational
export class SubjectGroup extends GeneralMasterItem {}

// Institution
export class InstitutionType extends GeneralMasterItem {}

// Users
export class UserType extends GeneralMasterItem {}

// Fees
// fees.dt_fees_group
export class FeeGroup extends ChildMasterItem {}
// fees.dt_fees_type
export class FeeType extends GeneralMasterItem {
  tableType: TableName = "FEE_TYPE_MASTER";
}
export class FeesHeadName extends ChildMasterItem {
  tableType: TableName = "FEE_HEAD_MASTER";
  instituteTypeId: ObjectId = "";
}

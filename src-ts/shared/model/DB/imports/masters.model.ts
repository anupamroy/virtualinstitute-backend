// This file Contains just the model for all the masters

import { GeneralMasterItem, ChildMasterItem } from './misc.DB.model';

// Students

//  SC ST General
// In all Student Types, General would always be default, and would always be mapped as such
export class StudentType extends GeneralMasterItem {}
export class StudentReligion extends GeneralMasterItem {}

// Courses

// BSC, MA, BE, ME
export class CourseType extends GeneralMasterItem {}

// UG PG Vocational
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
export class FeeGroup extends ChildMasterItem {}
export class FeeType extends GeneralMasterItem {}
export class FeesHeadName extends GeneralMasterItem {}

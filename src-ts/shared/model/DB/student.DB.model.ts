import { Person, GeneralMasterItem } from './imports/misc.DB.model';
import { GeneralDBItem } from './imports/DB.model';
import {
  Gender,
  Month,
  Year,
  Value,
  LinkURL,
  ObjectId,
  ApplicationType,
} from './imports/types.DB.model';

export class Student extends Person {
  gender: Gender = 'MALE';
  rollNo: string = '';
  registrationNo: string = '';
  photo: LinkURL = '';
  signature: LinkURL = '';
  isForeignNational: boolean = false;
  year: Year = '';
  session: string = '';
  phase: number = 0;
  status: string = '';

  instituteId: ObjectId = '';
  subjectCombinationId: ObjectId[] = []; // Course Id's photo: LinkURL = "";
  studentTypeId: ObjectId = '';
  courseCategoryId: ObjectId = '';
  courseLevelId: ObjectId = '';
  courseSubjectId: ObjectId = '';
  courseTypeId: ObjectId = '';
  courseCombinationId: ObjectId = '';
}

export class StudentApplication extends GeneralDBItem {
  studentId: ObjectId = '';
  instituteId: ObjectId = '';
  feesTypeId: ObjectId = '';
  feeStructureId: ObjectId = '';
  semesterId: ObjectId = '';
  applicationType: ApplicationType = 'CONCESSION';
  isApproved: boolean = false;
  amountApplied: Value = 0;
  amountApproved: Value = 0;
  month: Month = '';
  year: Year = '';
}

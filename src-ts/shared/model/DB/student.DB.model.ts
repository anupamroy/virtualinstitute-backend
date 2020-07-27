import { Person } from "./imports/misc.DB.model";
import {  GeneralDBItem } from "./imports/DB.model";
import {
  Gender,
  StudentType,
  Month,
  Year,
  Value,
  LinkURL,
  ObjectId,
  ApplicationType,
} from "./imports/types.DB.model";

export class Student extends Person {
  gender: Gender = "MALE";
  rollNo: string = "";
  registrationNo: string = "";
  instituteId: ObjectId = "";
  subjectCombinationId: ObjectId[] = []; // Course Id's photo: LinkURL = "";
  signature: LinkURL = "";
  isForeignNational: boolean = false;
  studentType: StudentType = "";
}

export class StudentApplication extends GeneralDBItem {
  studentId: ObjectId = "";
  instituteId: ObjectId = "";
  feesTypeId: ObjectId = "";
  feeStructureId: ObjectId = "";
  semesterId: ObjectId = "";
  applicationType: ApplicationType = "CONCESSION";
  isApproved: boolean = false;
  amountApplied: Value = 0;
  amountApproved: Value = 0;
  month: Month = "";
  year: Year = "";
}

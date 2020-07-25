import { GeneralDBItem } from "./DB.model";
import { CourseType, CourseLevel, CourseStream } from "./course.DB.model";
import {
  SubjectGroup,
  InstitutionType,
  AccountHead,
} from "./institute.DB.model";
import { FeeTypeName, FeesHeadName, FeeGroupName } from "./fees.DB.model";
import { StudentType } from "./student.DB.model";

export class Masters extends GeneralDBItem {
  courseTypes: CourseType[] = []; // UG PG Vocational
  courseLevels: CourseLevel[] = []; // BE ME
  courseStreams: CourseStream[] = []; // Computer Mechanical
  subjectGroups: SubjectGroup[] = []; // PCM PCMB ...
  institutionType: InstitutionType[] = []; // School College...
  accountHeads: AccountHead[] = []; // Sports Development ..
  feeTypeNames: FeeTypeName[] = []; // Application Fee, Exam Fees
  feesHeadNames: FeesHeadName[] = []; // Tution Fees etc
  studentTypeNames: StudentType[] = []; // SC ST ...

  // Institute level
  feeGroupNames: FeeGroupName[] = [];
}

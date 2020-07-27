import { GeneralDBItem } from "./DB.model";
import {
  CourseType,
  CourseLevel,
  CourseStream,
  SubjectGroup,
  InstitutionType,
  StudentType,
  FeeGroupName,
  FeeTypeName,
  FeesHeadName,
} from "./types.DB.model";
import { AccountHead } from "../institute.DB.model";

export class Masters extends GeneralDBItem {
  courseTypes: CourseType[] = []; // UG PG Vocational
  courseLevels: CourseLevel[] = []; // BE ME
  courseStreams: CourseStream[] = []; // Computer Mechanical
  subjectGroups: SubjectGroup[] = []; // PCM PCMB ...
  institutionType: InstitutionType[] = []; // School College...
  accountHeads: AccountHead[] = []; // Sports Development ..
  studentTypeNames: StudentType[] = []; // SC ST ...
}

export class InstituteMasters extends Masters {
  feeGroupNames: FeeGroupName[] = []; // Combine Fees into Groups to search for them faster
  feeTypeNames: FeeTypeName[] = []; // Application Fee, Exam Fees
  feesHeadNames: FeesHeadName[] = []; // Tution Fees etc
}

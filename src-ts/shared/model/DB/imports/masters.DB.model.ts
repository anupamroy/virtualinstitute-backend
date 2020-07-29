import { GeneralDBItem } from './DB.model';
import { AccountHead } from '../institute.DB.model';
import {
  CourseType,
  CourseLevel,
  CourseStream,
  SubjectGroup,
  StudentType,
  InstitutionType,
  FeeGroup,
  FeeType,
  FeesHeadName,
} from './masters.model';

export class Masters extends GeneralDBItem {
  courseTypes: CourseType[] = []; // UG PG Vocational
  courseLevels: CourseLevel[] = []; // BE ME
  courseStreams: CourseStream[] = []; // Computer Mechanical
  subjectGroups: SubjectGroup[] = []; // PCM PCMB ...
  institutionType: InstitutionType[] = []; // School College...
  accountHeads: AccountHead[] = []; // Sports Development ..
  studentTypeNames: StudentType[] = []; // SC ST ...
  feesHeadNames: FeesHeadName[] = []; // Tution Fees etc
}
// When we create a new Institute, it refers the masters already in the NTA Masters
// Masters in the Institute level are not Hard Deleted since they have other references to them.
// These are all names, since actual data is added later per structure
export class InstituteMasters extends Masters {
  feeGroupNames: FeeGroup[] = []; // Combine Fees into Groups to search for them faster
  feeTypeNames: FeeType[] = []; // Application Fee, Exam Fees
}

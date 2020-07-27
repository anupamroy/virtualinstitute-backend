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
}
// We can Hard Delete Masters from the NTA Level, but not from the Institute Level

// When a new institute is created, the above masters are copied into the institute masters (Those that are active and not soft deleted).
// Later when the NTA adds/edits/activates another entry, they are copied here if the name does not exist. If they are inactivated from the NTA, no effect is observed here
// Masters in the Institute level are not Hard Deleted since they have other references to them.
// These are all names, since actual data is added later per structure
export class InstituteMasters extends Masters {
  feeGroupNames: FeeGroup[] = []; // Combine Fees into Groups to search for them faster
  feeTypeNames: FeeType[] = []; // Application Fee, Exam Fees
  feesHeadNames: FeesHeadName[] = []; // Tution Fees etc
}

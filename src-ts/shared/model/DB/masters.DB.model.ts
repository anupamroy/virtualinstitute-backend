import { GeneralDBItem } from "./DB.model";
import {
  CourseType,
  CourseLevel,
  CourseStream,
  SubjectGroup,
  InstituteAffiliation,
  AccountHead,
} from "./institute.DB.model";
import { FeeTypeName, FeeHead, FeeGroupName } from "./fees.DB.model";
import { StudentType } from "./student.DB.model";

export class Masters extends GeneralDBItem {
  courseTypes: CourseType[] = [];     // UG PG Vocational
  courseLevels: CourseLevel[] = [];   // BE ME
  courseStreams: CourseStream[] = []; // Computer Mechanical
  subjectGroups: SubjectGroup[] = []; // PCM PCMB ...
  instituteAffiliations: InstituteAffiliation[] = [];   // Affilitations by official groups like CBSE
  accountHeads: AccountHead[] = [];  // Sports Development ...
  feeTypes: FeeTypeName[] = [];  // Application Fee, Exam Fees
  setudentTypes: StudentType[] = []; // SC ST ...
}

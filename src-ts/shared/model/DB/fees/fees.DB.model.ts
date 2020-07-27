import { GeneralDBItem } from '../imports/DB.model';
import { ObjectId } from '../imports/types.DB.model';
import { InstituteItem } from '../institute.DB.model';

export class LedgerTransaction extends InstituteItem {
  accountHeadId: ObjectId = '';
  feeId: ObjectId = '';
  transactionId: ObjectId = '';
  feeHeadId: ObjectId = '';
  ledgerDate: Date = new Date();
}

export class CourseWiseFeeStructutre extends InstituteItem {
  courseCombinationId: ObjectId = '';

  isSemesteryear: boolean = false;

  semesesterOrYear: 'YEAR' | 'SEMESTER' = 'SEMESTER';

  studentCategoryId: ObjectId = '';
  studentReligionId: ObjectId = '';
  feeId: ObjectId = '';
  mandatoryPayment = 0;
  monthToMonthPayment = 0;
}

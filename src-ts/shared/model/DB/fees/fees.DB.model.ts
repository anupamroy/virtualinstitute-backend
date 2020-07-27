import { ObjectId, Month, FeeStatus } from '../imports/types.DB.model';
import { InstituteItem } from '../institute.DB.model';
import { GeneralDBItem } from '../imports/DB.model';
import { StudentItem } from '../student.DB.model';

// fees.dt_ledger
export class LedgerTransaction extends InstituteItem {
  accountHeadId: ObjectId = '';
  feeId: ObjectId = '';
  transactionId: ObjectId = '';
  feeHeadId: ObjectId = '';
  ledgerDate: Date = new Date();
}

// fees.dt-course_wise_fee_structure
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

// fees.dt_fees_monthly_breakup
export class FeesMonthlyBreakup extends StudentItem {
  courseCombinationId: ObjectId = '';
  feeId: ObjectId = '';

  month: Month = '';

  amountToBePaid: number = 0;

  isConcessionLatefine: boolean = false;
  concessionAmount: number = 0;
  lateFineAmount: number = 0;

  status: FeeStatus = 'PAID';
  paymentDate: Date = new Date();
}

// fees.dt_student_fees_details
export class StudentFeeDetails extends InstituteItem {
  subjectCombinationId: ObjectId = '';
  feeId: ObjectId = '';
  feeHeadId: ObjectId = '';
  transactionId: ObjectId = '';

  semester: number = 1;
  finalYear: number = 4;

  amountPaid: number = 0;
  paidOnMonth: Month = '';
  paymentDate: Date = new Date();
  status: FeeStatus = 'PAID';
}

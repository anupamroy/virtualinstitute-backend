"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentFeeDetails = exports.FeesMonthlyBreakup = exports.CourseWiseFeeStructutre = exports.LedgerTransaction = void 0;
const institute_DB_model_1 = require("../institute.DB.model");
const student_DB_model_1 = require("../student.DB.model");
// fees.dt_ledger
class LedgerTransaction extends institute_DB_model_1.InstituteItem {
    constructor() {
        super(...arguments);
        this.accountHeadId = '';
        this.feeId = '';
        this.transactionId = '';
        this.feeHeadId = '';
        this.ledgerDate = new Date();
    }
}
exports.LedgerTransaction = LedgerTransaction;
// fees.dt-course_wise_fee_structure
class CourseWiseFeeStructutre extends institute_DB_model_1.InstituteItem {
    constructor() {
        super(...arguments);
        this.courseCombinationId = '';
        this.isSemesteryear = false;
        this.semesesterOrYear = 'SEMESTER';
        this.studentCategoryId = '';
        this.studentReligionId = '';
        this.feeId = '';
        this.mandatoryPayment = 0;
        this.monthToMonthPayment = 0;
    }
}
exports.CourseWiseFeeStructutre = CourseWiseFeeStructutre;
// fees.dt_fees_monthly_breakup
class FeesMonthlyBreakup extends student_DB_model_1.StudentItem {
    constructor() {
        super(...arguments);
        this.courseCombinationId = '';
        this.feeId = '';
        this.month = '';
        this.amountToBePaid = 0;
        this.isConcessionLatefine = false;
        this.concessionAmount = 0;
        this.lateFineAmount = 0;
        this.status = 'PAID';
        this.paymentDate = new Date();
    }
}
exports.FeesMonthlyBreakup = FeesMonthlyBreakup;
// fees.dt_student_fees_details
class StudentFeeDetails extends institute_DB_model_1.InstituteItem {
    constructor() {
        super(...arguments);
        this.subjectCombinationId = '';
        this.feeId = '';
        this.feeHeadId = '';
        this.transactionId = '';
        this.semester = 1;
        this.finalYear = 4;
        this.amountPaid = 0;
        this.paidOnMonth = '';
        this.paymentDate = new Date();
        this.status = 'PAID';
    }
}
exports.StudentFeeDetails = StudentFeeDetails;

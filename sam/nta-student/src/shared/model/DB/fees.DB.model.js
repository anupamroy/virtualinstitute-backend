"use strict";
// export class FeeGroup {
//   feeGroupName: FeeGroupName = "";
//   fees: Fee[] = [];
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeesAccountHead = exports.FeesLateFine = exports.FeesConcession = exports.FeeStudentCategory = exports.CourseAmount = exports.Fee = exports.FeeType = void 0;
const DB_model_1 = require("./imports/DB.model");
class FeeType {
    constructor() {
        this.feeTypeName = "";
    }
}
exports.FeeType = FeeType;
class Fee extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.instituteId = "";
        this.subjectCombinationId = "";
        this.feeHeadName = "";
        this.feeTypeName = "";
        this.academicYear = "";
        this.modeOfpayment = "MONTH";
        this.amount = new CourseAmount();
        this.concession = new FeesConcession();
        this.lateFine = new FeesLateFine();
        this.accountHeads = [];
        this.concessionAccounts = [];
    }
}
exports.Fee = Fee;
class CourseAmount {
    constructor() {
        this.nationals = [];
        this.foreign = 0;
    }
}
exports.CourseAmount = CourseAmount;
class FeeStudentCategory {
    constructor() {
        this.studentCategory = "";
        this.amount = 0;
    }
}
exports.FeeStudentCategory = FeeStudentCategory;
class FeesConcession {
    constructor() {
        this.canConcessionBeGiven = false;
        this.concessionUnit = "PERCENT";
        this.maxConcession = 50;
    }
}
exports.FeesConcession = FeesConcession;
class FeesLateFine {
    constructor() {
        this.isLateFineApplicable = false;
        this.lateFineUnit = "PERCENT";
        this.lateFine = 10;
        this.isRevocable = false;
        this.maxRevocableAmountUnit = "PERCENT";
        this.maxRevocableAmount = 10;
    }
}
exports.FeesLateFine = FeesLateFine;
class FeesAccountHead {
    constructor() {
        this.accountHeadId = "";
        this.amountPercent = 0;
    }
}
exports.FeesAccountHead = FeesAccountHead;

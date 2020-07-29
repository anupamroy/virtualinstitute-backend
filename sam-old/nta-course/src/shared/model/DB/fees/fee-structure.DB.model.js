"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeesAccountHead = exports.FeesLateFine = exports.FeesConcession = exports.Fee = void 0;
const DB_model_1 = require("../imports/DB.model");
const institute_DB_model_1 = require("../institute.DB.model");
// Fees Structure
// fees.dt_fees-Structure
class Fee extends institute_DB_model_1.InstituteItem {
    constructor() {
        super(...arguments);
        this.instituteId = '';
        this.subjectCombinationId = '';
        this.feeHeadId = '';
        this.feesTypeId = '';
        this.academicYear = '';
        this.modeOfpayment = 'MONTH';
        this.amount = 0;
        this.amountForeignNational = 0;
        this.concession = new FeesConcession();
        this.lateFine = new FeesLateFine();
        this.accountHeads = [];
        this.concessionAccounts = [];
    }
}
exports.Fee = Fee;
// Fees Structure
// fees.dt_fees-Structure
class FeesConcession {
    constructor() {
        this.canConcessionBeGiven = false;
        this.concessionUnit = 'PERCENT';
        this.maxConcession = 50;
    }
}
exports.FeesConcession = FeesConcession;
// Fees Structure
// fees.dt_fees-Structure
class FeesLateFine {
    constructor() {
        this.isLateFineApplicable = false;
        this.lateFineUnit = 'PERCENT';
        this.lateFine = 10;
        this.isRevocable = false;
        this.maxRevocableAmountUnit = 'PERCENT';
        this.maxRevocableAmount = 10;
    }
}
exports.FeesLateFine = FeesLateFine;
// Account Headwise Distribution
// fees.dt_account_headwise_distribution
// Here we don't need Institute Id as this is nested under fees
class FeesAccountHead extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.accountHeadParentId = '';
        this.amountPercent = 0;
    }
}
exports.FeesAccountHead = FeesAccountHead;

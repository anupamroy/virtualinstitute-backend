"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Masters = void 0;
const DB_model_1 = require("./DB.model");
class Masters extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.courseTypes = []; // UG PG Vocational
        this.courseLevels = []; // BE ME
        this.courseStreams = []; // Computer Mechanical
        this.subjectGroups = []; // PCM PCMB ...
        this.institutionType = []; // School College...
        this.accountHeads = []; // Sports Development ..
        this.feeTypeNames = []; // Application Fee, Exam Fees
        this.feesHeadNames = []; // Tution Fees etc
        this.studentTypeNames = []; // SC ST ...
        // Institute level
        this.feeGroupNames = [];
    }
}
exports.Masters = Masters;

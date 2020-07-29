"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituteMasters = exports.Masters = void 0;
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
        this.studentTypeNames = []; // SC ST ...
        this.feesHeadNames = []; // Tution Fees etc
    }
}
exports.Masters = Masters;
// When we create a new Institute, it refers the masters already in the NTA Masters
// Masters in the Institute level are not Hard Deleted since they have other references to them.
// These are all names, since actual data is added later per structure
class InstituteMasters extends Masters {
    constructor() {
        super(...arguments);
        this.feeGroupNames = []; // Combine Fees into Groups to search for them faster
        this.feeTypeNames = []; // Application Fee, Exam Fees
    }
}
exports.InstituteMasters = InstituteMasters;

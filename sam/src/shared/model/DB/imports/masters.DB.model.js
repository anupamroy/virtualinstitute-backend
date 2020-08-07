"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituteMasters = exports.Masters = void 0;
class Masters {
    constructor() {
        this.courseTypes = []; // UG PG Vocational
        this.courseLevels = []; // BE ME
        this.courseStreams = []; // Computer Mechanical
        this.subjectGroups = []; // PCM PCMB ...
        this.institutionType = []; // School College...
        this.accountHeads = []; // Sports Development ..
        this.studentTypeNames = []; // SC ST ...
        this.feesHeadNames = []; // Tution Fees etc
        this.feeTypeNames = []; // Application Fee, Exam Fees
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
    }
}
exports.InstituteMasters = InstituteMasters;

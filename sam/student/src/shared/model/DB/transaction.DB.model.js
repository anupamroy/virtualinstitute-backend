"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Challan = exports.Transation = exports.Reciept = void 0;
const DB_model_1 = require("./imports/DB.model");
// Generated only after completion - Reciept
class Reciept extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.recieptNumber = '';
        this.transaction = new Transation();
    }
}
exports.Reciept = Reciept;
class Transation extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.transactionNumber = "";
        this.modeOfPayment = "";
        this.amountPaid = 0;
        this.studentId = "";
        this.instituteId = "";
        this.fromAcc = "";
        this.toAcc = "";
        this.transactionStatus = "CLOSED";
    }
}
exports.Transation = Transation;
// Pre Transaction
class Challan extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.challanNumber = ""; // StudentId + Institute Code + Date
        this.status = "OPEN";
    }
}
exports.Challan = Challan;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Challan = exports.Transation = exports.Reciept = void 0;
const DB_model_1 = require("./imports/DB.model");
const student_DB_model_1 = require("./student.DB.model");
// Generated only after completion - Reciept
class Reciept extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.recieptNumber = '';
        this.transactionId = '';
    }
}
exports.Reciept = Reciept;
// fees.dt_transaction
class Transation extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.transactionNumber = '';
        this.modeOfPayment = ''; // Online Offline
        this.amountPaid = 0;
        this.transactionStatus = 'CLOSED';
        this.paymentGatewayTransactionId = '';
        this.paymentGatewayMode = '';
        this.userId = ''; // id of the user/student/institute payer
        this.forUserId = ''; // id of the user/student/institute reciever
        this.instituteId = '';
        this.userTypeId = ''; // STUDENT | APPLICANT | ADMIN ....   // The person who actually commits this trasaction
        this.forUserType = ''; // STUDENT | APPLICANT | ADMIN ....   // The person who recieves this transaction
        this.feesId = '';
        this.feesHeadId = '';
    }
}
exports.Transation = Transation;
// Pre Transaction
class Challan extends student_DB_model_1.StudentItem {
    constructor() {
        super(...arguments);
        this.challanNumber = ''; // StudentId + Institute Code + Date
        this.trasactionId = '';
        this.status = 'OPEN';
    }
}
exports.Challan = Challan;

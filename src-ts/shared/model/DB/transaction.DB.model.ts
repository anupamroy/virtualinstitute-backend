import { GeneralDBItem } from './imports/DB.model';
import {
  TransactionStatus,
  ChallanStatus,
  ObjectId,
} from './imports/types.DB.model';
import { StudentItem } from './student.DB.model';

// Generated only after completion - Reciept
export class Reciept extends GeneralDBItem {
  recieptNumber: string = '';
  transactionId: ObjectId = '';
}

// fees.dt_transaction
export class Transation extends GeneralDBItem {
  transactionNumber: string = '';
  modeOfPayment: string = ''; // Online Offline
  amountPaid: number = 0;
  transactionStatus: TransactionStatus = 'CLOSED';

  paymentGatewayTransactionId: string = '';
  paymentGatewayMode: string = '';

  userId: ObjectId = ''; // id of the user/student/institute payer
  forUserId: ObjectId = ''; // id of the user/student/institute reciever
  instituteId: ObjectId = '';
  userTypeId: ObjectId = ''; // STUDENT | APPLICANT | ADMIN ....   // The person who actually commits this trasaction
  forUserType: ObjectId = ''; // STUDENT | APPLICANT | ADMIN ....   // The person who recieves this transaction

  feesId: Object = '';
  feesHeadId: Object = '';
}

// Pre Transaction
export class Challan extends StudentItem {
  challanNumber: string = ''; // StudentId + Institute Code + Date
  trasactionId: ObjectId = '';
  status: ChallanStatus = 'OPEN';
}

import { GeneralDBItem } from './imports/DB.model';
import {
  TransactionStatus,
  ChallanStatus,
  ObjectId,
  Month,
} from './imports/types.DB.model';

// Generated only after completion - Reciept
export class Reciept extends GeneralDBItem {
  recieptNumber: string = '';
  transactionId: ObjectId = '';
}

export class Transation extends GeneralDBItem {
  transactionNumber: string = '';
  modeOfPayment: string = '';
  amountPaid: number = 0;
  transactionStatus: TransactionStatus = 'CLOSED';

  paymentGatewayTransactionId: string = '';
  paymentGatewayMode: string = '';

  userId: ObjectId = ''; // id of the user/student/institute payer
  forUserId: ObjectId = ''; // id of the user/student/institute reciever
  instituteId: ObjectId = '';
  userTypeId: ObjectId = ''; // STUDENT | APPLICANT | ADMIN ....   // The person who actually commits this trasaction
  forUserType: ObjectId = ''; // STUDENT | APPLICANT | ADMIN ....   // The person who recieves this transaction

  month: Month = '';
}

// Pre Transaction
export class Challan extends GeneralDBItem {
  challanNumber: string = ''; // StudentId + Institute Code + Date
  trasactionId: ObjectId = '';
  status: ChallanStatus = 'OPEN';
}

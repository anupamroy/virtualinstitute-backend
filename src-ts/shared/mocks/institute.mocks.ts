import { GeneralMasterItem } from '../model/DB/imports/misc.DB.model';
import {
  FeesMasterObject,
  Payable,
  CourseFeesObject,
} from '../model/request-method.model';
import { AccountHead } from '../model/DB/institute.DB.model';

// Objects By Id:
export const FEES_MASTER_MOCK: FeesMasterObject = {
  feesTypeId: '1d22f3b0-dcc6-11ea-9102-3b6b7e80223b',
  feesGroupId: '1d22f3b0-dcc6-11ea-9102-3b6b7e80223b',
  feesHeadId: '1d22f3b0-dcc6-11ea-9102-3b6b7e80223b',
  accountsHeadId: '1d22f3b0-dcc6-11ea-9102-3b6b7e80223b',
  feesTypeName: 'Fee Type 1',
  feesGroupName: 'Fee Type 1',
  feesHeadName: 'Fee Type 1',
  accountsHeadName: 'Fee Type 1',
  payable: Payable.monthly,
  payableBy: new Date(),
  isConcession: true,
  concessionUnit: 'PERCENT',
  concessionAmount: 10,
  maxConcession: 10000,
  isLatefine: true,
  latefineUnit: 'VALUE',
  latefineAmount: 10000,
  maxLateFine: 100000,
  isLatefineRevocalble: true,
  maximumLateFineRevocable: 10000,
  amount: 10000,
};

export const FEES_GROUP_MOCK: GeneralMasterItem = {
  ...new GeneralMasterItem(),
  name: 'Fees Group 1',
};

export const CONCESSION_APPLICATION_MOCK = {
  applicantName: 'Student 1',
  courseId: '60AD73D3-C8D4-4AC0-A457-F9DE9A63E539',
  courseName: 'Course 1',
  semester: 1,
  concessionAmount: 1000,
  date: new Date(),
  status: 'Accepted',
  feesTypeId: '60AD73D3-C8D4-4AC0-A457-F9DE9A63E539',
  feesTypeName: 'Fees Type 1',
  feeAmount: 100000,
  maxConcession: 20,
  maxConcessionUnit: '%',
  reason: 'Reason 1',
};

export const LATEFINE_APPLICATION_MOCK = {
  applicantName: 'Student 1',
  courseId: '60AD73D3-C8D4-4AC0-A457-F9DE9A63E539',
  courseName: 'Course 1',
  semester: 1,
  latefineAmount: 1000,
  date: new Date(),
  status: 'Accepted',
  feesTypeId: '60AD73D3-C8D4-4AC0-A457-F9DE9A63E539',
  feesTypeName: 'Fees Type 1',
  feeAmount: 100000,
  maxLatefine: 20,
  maxLatefineUnit: '%',
  reason: 'Reason 1',
};

export const COURSE_FEES_MOCK: CourseFeesObject = {
  courseTypeId: '60AD73D3-C8D4-4AC0-A457-F9DE9A63E539',
  courseName: 'Course Name 1',
  courseCombinationIds: [
    '9CB4B8E8-7232-4057-88F4-21ED07E907EF',
    '6F54F8E7-213F-4016-BF66-0BBFFDA5248F',
  ],
  courseCombinationNames: ['Course Combination 1', 'Course Combination 2'],
  semester: [1, 2, 3],
  quotas: [
    'F8A1B41C-0894-445F-9EF6-C71EEA17ACE3',
    '15ADAEDE-50C9-4554-94B3-C51371476001',
  ],
  admissionYear: '2020',
  feesId: [
    '7F313750-ECD9-46CD-85B4-E5F93FD1155B',
    '21634F3D-F65F-4D28-A4C3-DD35EA937C4E',
  ],
  courseTypeName: 'Course Type 1',
  feesList: [
    {
      id: '7F313750-ECD9-46CD-85B4-E5F93FD1155B',
      feeStructureName: 'Saraswati pujua',
      amount: 1000
    },
    {
      id: '7F313750-ECD9-46CD-85B4-E5F93FD1155B',
      feeStructureName: 'Library Fee',
      amount: 1000
    },
    {
      id: '7F313750-ECD9-46CD-85B4-E5F93FD1155B',
      feeStructureName: 'Tution Fee',
      amount: 10000
    }
  ],
  quotaNames: ['GEN', 'ST', 'SC'],
  amount: 12000,
};

export const STUDENT_FEES_MOCK = {
  id: '2A2670F5-2B47-4462-8005-247C19265B2A',
  studentId: '2A2670F5-2B47-4462-8005-247C19265B2A',
  studentName: 'Student 1',
  amount: 10000,
  transactionId: '2A2670F5-2B47-4462-8005-247C19265B2A',
  transactionNumber: '23899742984',
  challanId: '83CA6CC5-249F-4B8B-B2F2-C7734923DA97',
  challanNumber: '2890381293',
};

export const FEES_GROUP_LIST_MOCK: GeneralMasterItem[] = [
  { ...FEES_GROUP_MOCK },
  { ...FEES_GROUP_MOCK },
  { ...FEES_GROUP_MOCK },
  { ...FEES_GROUP_MOCK },
  { ...FEES_GROUP_MOCK },
];
export const FEES_MASTER_LIST_MOCK: FeesMasterObject[] = [
  { ...FEES_MASTER_MOCK },
  { ...FEES_MASTER_MOCK },
  { ...FEES_MASTER_MOCK },
  { ...FEES_MASTER_MOCK },
  { ...FEES_MASTER_MOCK },
];
export const COURSE_FEES_LIST_MOCK = [
  { ...COURSE_FEES_MOCK },
  { ...COURSE_FEES_MOCK },
  { ...COURSE_FEES_MOCK },
  { ...COURSE_FEES_MOCK },
  { ...COURSE_FEES_MOCK },
];

export const CONCESSION_APPLICATION_LIST_MOCK = [
  { ...CONCESSION_APPLICATION_MOCK },
  { ...CONCESSION_APPLICATION_MOCK },
  { ...CONCESSION_APPLICATION_MOCK },
  { ...CONCESSION_APPLICATION_MOCK },
  { ...CONCESSION_APPLICATION_MOCK },
];
export const LATEFINE_APPLICATION_LIST_MOCK = [
  { ...LATEFINE_APPLICATION_MOCK },
  { ...LATEFINE_APPLICATION_MOCK },
  { ...LATEFINE_APPLICATION_MOCK },
  { ...LATEFINE_APPLICATION_MOCK },
  { ...LATEFINE_APPLICATION_MOCK },
];
export const STUDENT_FEES_LIST_MOCK = [
  { ...STUDENT_FEES_MOCK },
  { ...STUDENT_FEES_MOCK },
  { ...STUDENT_FEES_MOCK },
  { ...STUDENT_FEES_MOCK },
  { ...STUDENT_FEES_MOCK },
];
export const LEDGER_ITEM_MOCK: AccountHead = {
  ...new AccountHead(),
  name: 'Account Head 1',
  balance: 100000,
};
export const LEDGER_LIST_MOCK = [
  { ...LEDGER_ITEM_MOCK, name: 'Account Head 1' },
  { ...LEDGER_ITEM_MOCK, name: 'Account Head 2' },
  { ...LEDGER_ITEM_MOCK, name: 'Account Head 3' },
  { ...LEDGER_ITEM_MOCK, name: 'Account Head 4' },
  { ...LEDGER_ITEM_MOCK, name: 'Account Head 5' },
  { ...LEDGER_ITEM_MOCK, name: 'Account Head 6' },
];

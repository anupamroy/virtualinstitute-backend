import { GeneralMasterItem } from '../model/DB/imports/misc.DB.model';
import {
  FeesMasterObject,
  Payable,
  CourseFeesObject,
} from '../model/request-method.model';
import { AccountHead } from '../model/DB/institute.DB.model';

// Objects By Id:
export const feesmasterObject: FeesMasterObject = {
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

export const feesGroupItem: GeneralMasterItem = {
  ...new GeneralMasterItem(),
  name: 'Fees Group 1',
};

export const courseFeesObject: CourseFeesObject = {
  courseTypeId: '60AD73D3-C8D4-4AC0-A457-F9DE9A63E539',
  courseName: '',
  courseCombinationIds: [
    '9CB4B8E8-7232-4057-88F4-21ED07E907EF',
    '6F54F8E7-213F-4016-BF66-0BBFFDA5248F',
  ],
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
  courseTypeName: '',
  feesName: '',
  quotaNames: ['GEN', 'ST', 'SC'],
};

export const FeesGroupList: GeneralMasterItem[] = [
  { ...feesGroupItem },
  { ...feesGroupItem },
  { ...feesGroupItem },
  { ...feesGroupItem },
  { ...feesGroupItem },
];
export const FeesMasterList: FeesMasterObject[] = [
  { ...feesmasterObject },
  { ...feesmasterObject },
  { ...feesmasterObject },
  { ...feesmasterObject },
  { ...feesmasterObject },
];
export const CourseFeesList = [
  { ...courseFeesObject },
  { ...courseFeesObject },
  { ...courseFeesObject },
  { ...courseFeesObject },
  { ...courseFeesObject },
];
export const ConcessionApplicationList = [];
export const lateFineApplicationList = [];
export const studentFeesList = [];
export const ledgerItem: AccountHead = {
  ...new AccountHead(),
  name: 'Account Head 1',
};
export const LedgerList = [
  { ...ledgerItem, name: 'Account Head 1' },
  { ...ledgerItem, name: 'Account Head 2' },
  { ...ledgerItem, name: 'Account Head 3' },
  { ...ledgerItem, name: 'Account Head 4' },
  { ...ledgerItem, name: 'Account Head 5' },
  { ...ledgerItem, name: 'Account Head 6' },
];

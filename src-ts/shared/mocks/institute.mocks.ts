import { GeneralMasterItem } from "../model/DB/imports/misc.DB.model";
import { FeesMasterObject, Payable } from "../model/request-method.model";

// Objects By Id:
export const feesmasterObject: FeesMasterObject = {
  feesTypeId: "1d22f3b0-dcc6-11ea-9102-3b6b7e80223b",
  feesGroupId: "1d22f3b0-dcc6-11ea-9102-3b6b7e80223b",
  feesHeadId: "1d22f3b0-dcc6-11ea-9102-3b6b7e80223b",
  accountsHeadId: "1d22f3b0-dcc6-11ea-9102-3b6b7e80223b",
  feesTypeName: "Fee Type 1",
  feesGroupName: "Fee Type 1",
  feesHeadName: "Fee Type 1",
  accountsHeadName: "Fee Type 1",
  payable: Payable.monthly,
  payableBy: new Date(),
  isConcession: true,
  concessionUnit: "PERCENT",
  concessionAmount: 10,
  maxConcession: 10000,
  isLatefine: true,
  latefineUnit: "VALUE",
  latefineAmount: 10000,
  maxLateFine: 100000,
  isLatefineRevocalble: true,
  maximumLateFineRevocable: 10000,
  amount: 10000,
  parentId: "",
  name: "",
};

export const feesGroupItem: GeneralMasterItem = {
  ...new GeneralMasterItem(),
  name: 'Fees Group 1',
};

export const FeesGroupList: GeneralMasterItem[] = [];
export const FeesMasterList: FeesMasterObject[] = [
  { ...feesmasterObject },
  { ...feesmasterObject },
  { ...feesmasterObject },
  { ...feesmasterObject },
  { ...feesmasterObject },
];
export const CourseFeesList = [];
export const ConcessionApplicationList = [];
export const lateFineApplicationList = [];
export const studentFeesList = [];
export const LedgerList = [];

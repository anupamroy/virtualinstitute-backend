import { ObjectId, Unit, Year, Value } from './DB/imports/types.DB.model';
export type RequestMethod =
  | 'GET'
  | 'PATCH'
  | 'PUT'
  | 'POST'
  | 'DELETE'
  | 'OPTIONS';

export class APIResponse {
  hasError = false;
  error = '';
  data: any;
  constructor(hasError = false, error = '', data: any = null) {
    this.hasError = hasError;
    this.error = error;
    this.data = data;
  }
}

export class GeneralMasterItemRequest {
  name: string = '';
}

export class ChildMasterItemRequest extends GeneralMasterItemRequest {
  parentId: ObjectId = '';
}

export class CreateFeesHeadRequest extends ChildMasterItemRequest {
  instituteTypeId: ObjectId = '';
}

export class CreateFeesTypeMasterRequest extends GeneralMasterItemRequest {}

export class CreateAccountsHeadMasterRequest extends ChildMasterItemRequest {}

export interface StatusChangeRequest {
  isActive: boolean;
}

// NTA Authority
export class CreateNTAAuthorityRequest {
  organizationName: string = '';
  organizationType: string = '';
  organizationIcon: File = {} as any;
  organizationShortCode: string = '';
}

export class CreateNTAPhoneNumberRequest {
  phone: string = '';
  phoneText: string = '';
  phoneType: string = '';
  phoneTimings: string = '';
  phoneDays: string = '';
  phoneShift: string = '';
  associatedPost: string = '';
}

export class CreateNTAEmailRequest {
  emailId: string = '';
  emailText: string = '';
  emailType: string = '';
  emailDays: string = '';
  associatedPost: string = '';
}

export interface StatusChangeRequest {
  isActive: boolean;
}

// export interface CreateFeesGroupRequest extends GeneralMasterItemRequest {}

export interface CreateFeesMasterRequest {
  feesTypeId: ObjectId;
  feesGroupId: ObjectId;
  feesHeadId: ObjectId;
  accountsHeadId: ObjectId;
  payable: Payable;
  payableBy: Date;
  isConcession: boolean;
  concessionUnit: Unit;
  concessionAmount: number;
  maxConcession: Value;
  isLatefine: boolean;
  latefineUnit: Unit;
  latefineAmount: number;
  maxLateFine: number;
  isLatefineRevocalble: boolean;
  maximumLateFineRevocable: Value;
  amount: number;
}

export interface FeesMasterObject extends CreateFeesMasterRequest {
  feesTypeName: string;
  feesGroupName: string;
  feesHeadName: string;
  accountsHeadName: string;
}
export interface CreateCourseFeesRequest {
  courseTypeId: ObjectId;
  courseName: string;
  courseCombinationIds: ObjectId[];
  semester: number[];
  quotas: ObjectId[];
  admissionYear: Year;
  feesId: ObjectId[];
}

export interface CourseFeesObject extends CreateCourseFeesRequest {
  courseTypeName: string;
  courseCombinationNames: string[];
  feesList: any[];
  quotaNames: string[];
  amount: number;
}

export interface EditFeesGroupRequest {}
export interface EditFeesMasterRequest {}
export interface EditCourseFeesRequest {}

export enum Payable {
  'monthly',
  'yearly',
  'semester wise',
}

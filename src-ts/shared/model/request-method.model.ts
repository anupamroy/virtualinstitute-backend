import { ObjectId } from './DB/imports/types.DB.model';
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

export class CreateFeesMasterRequest extends ChildMasterItemRequest {}

export class CreateAccountsHeadMasterRequest extends ChildMasterItemRequest {}

export interface StatusChangeRequest {
  isActive: boolean;
}

export class CreateNTAAuthorityRequest {
  ntaName: string = '';
}

export interface StatusChangeRequest {
  isActive: boolean;
}

export interface CreateFeesGroupRequest {}
export interface CreateFeesMasterRequest {}
export interface CreateCourseFeesRequest {}

export interface EditFeesGroupRequest {}
export interface EditFeesMasterRequest {}
export interface EditCourseFeesRequest {}

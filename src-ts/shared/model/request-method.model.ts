import { ObjectId } from "./DB/imports/types.DB.model";
export type RequestMethod = "GET" | "PUT" | "POST" | "DELETE" | "OPTIONS";

export class APIResponse {
  hasError = false;
  error = "";
  data: any;
  constructor(hasError = false, error = "", data: any = null) {
    this.hasError = hasError;
    this.error = error;
    this.data = data;
  }
}

export class GeneralMasterItemRequest {
  name: string = "";
}

export class ChildMasterItemRequest extends GeneralMasterItemRequest {
  parentId: ObjectId = "";
}

export class CreateFeesHeadRequest extends ChildMasterItemRequest {
  institutionTypeId: ObjectId = "";
}

export class CreateFeesTypeMasterRequest extends GeneralMasterItemRequest {}

export class CreateFeesMasterRequest extends ChildMasterItemRequest {}

export class CreateAccountsHeadMasterRequest extends ChildMasterItemRequest {}

export class CreateNTAAuthorityRequest {
  ntaName: string = "";
}

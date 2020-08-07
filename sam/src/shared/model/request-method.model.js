"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNTAAuthorityRequest = exports.CreateAccountsHeadMasterRequest = exports.CreateFeesMasterRequest = exports.CreateFeesTypeMasterRequest = exports.CreateFeesHeadRequest = exports.ChildMasterItemRequest = exports.GeneralMasterItemRequest = exports.APIResponse = void 0;
class APIResponse {
    constructor(hasError = false, error = "", data = null) {
        this.hasError = false;
        this.error = "";
        this.hasError = hasError;
        this.error = error;
        this.data = data;
    }
}
exports.APIResponse = APIResponse;
class GeneralMasterItemRequest {
    constructor() {
        this.name = "";
    }
}
exports.GeneralMasterItemRequest = GeneralMasterItemRequest;
class ChildMasterItemRequest extends GeneralMasterItemRequest {
    constructor() {
        super(...arguments);
        this.parentId = "";
    }
}
exports.ChildMasterItemRequest = ChildMasterItemRequest;
class CreateFeesHeadRequest extends ChildMasterItemRequest {
    constructor() {
        super(...arguments);
        this.instituteTypeId = "";
    }
}
exports.CreateFeesHeadRequest = CreateFeesHeadRequest;
class CreateFeesTypeMasterRequest extends GeneralMasterItemRequest {
}
exports.CreateFeesTypeMasterRequest = CreateFeesTypeMasterRequest;
class CreateFeesMasterRequest extends ChildMasterItemRequest {
}
exports.CreateFeesMasterRequest = CreateFeesMasterRequest;
class CreateAccountsHeadMasterRequest extends ChildMasterItemRequest {
}
exports.CreateAccountsHeadMasterRequest = CreateAccountsHeadMasterRequest;
class CreateNTAAuthorityRequest {
    constructor() {
        this.ntaName = "";
    }
}
exports.CreateNTAAuthorityRequest = CreateNTAAuthorityRequest;

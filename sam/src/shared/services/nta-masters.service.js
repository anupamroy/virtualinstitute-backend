"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusChangeOfAccountHeadMaster = exports.statusChangeOfFeesTypeMaster = exports.statusChangeOfFeesHeadMaster = exports.editAccountsHeadMasterById = exports.editFeesTypeMasterById = exports.editFeesHeadMasterById = exports.deleteAccountsHeadMasterById = exports.deleteFeesTypeMasterById = exports.deleteFeesHeadMasterById = exports.getAccountsHeadMasterById = exports.getFeesTypeMasterById = exports.getFeesHeadMasterById = exports.checkIfNtaAccountsHeadExists = exports.checkIfNTAFeesTypeExists = exports.checkIfNTAFeesHeadExists = exports.getInstituteTypeList = exports.getAccountHeadList = exports.getFeesTypeMasterList = exports.getFeesHeadMastersList = exports.createAccountHeadMaster = exports.createFeesTypeMaster = exports.createFeesHeadMaster = void 0;
const handler_common_1 = require("../helpers/handler-common");
const fees_functions_1 = require("../functions/fees.functions");
const fees_functions_2 = require("../functions/fees.functions");
const response_helper_1 = require("../helpers/response.helper");
const fees_functions_3 = require("../functions/fees.functions");
const fees_functions_4 = require("../functions/fees.functions");
const fees_functions_5 = require("../functions/fees.functions");
const fees_functions_6 = require("../functions/fees.functions");
const fees_functions_7 = require("../functions/fees.functions");
const fees_functions_8 = require("../functions/fees.functions");
const general_helpers_1 = require("../helpers/general.helpers");
// Create
exports.createFeesHeadMaster = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const body = handler_common_1.parseBody(event.body);
    if (body && general_helpers_1.sanitizeString(body.name) && body.instituteTypeId) {
        return fees_functions_1.createFeesHeadFunction(body, event);
    }
    else {
        return response_helper_1.keysMissingResponse();
    }
});
exports.createFeesTypeMaster = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const body = handler_common_1.parseBody(event.body);
    if (body && general_helpers_1.sanitizeString(body.name)) {
        return fees_functions_2.createFeesTypeFunction(body, event);
    }
    else {
        return response_helper_1.keysMissingResponse();
    }
});
exports.createAccountHeadMaster = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const body = handler_common_1.parseBody(event.body);
    if (body && general_helpers_1.sanitizeString(body.name)) {
        return fees_functions_1.createAccountHeadFunction(body, event);
    }
    else {
        return response_helper_1.keysMissingResponse();
    }
});
// Get List
exports.getFeesHeadMastersList = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fees_functions_2.getFeesHeadListFunction(event);
});
exports.getFeesTypeMasterList = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fees_functions_8.getFeesTypeListFunction(event);
});
exports.getAccountHeadList = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fees_functions_8.getAccountsHeadListFunction(event);
});
exports.getInstituteTypeList = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fees_functions_1.getInstituteTypeListFunction(event);
});
// Check If Master Exists
exports.checkIfNTAFeesHeadExists = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fees_functions_1.checkIfFeesHeadExistsFunction(event);
});
exports.checkIfNTAFeesTypeExists = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fees_functions_1.checkIfNTAFeesTypeExistsFunction(event);
});
exports.checkIfNtaAccountsHeadExists = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fees_functions_1.checkIfNtaAccountsHeadExistsFunction(event);
});
// Get By Id
exports.getFeesHeadMasterById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fees_functions_1.getFeesHeadByIdFunction(event);
});
exports.getFeesTypeMasterById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fees_functions_1.getFeesTypeByIdFunction(event);
});
exports.getAccountsHeadMasterById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fees_functions_1.getAccountsHeadByIdFunction(event);
});
// Delete By Id
exports.deleteFeesHeadMasterById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fees_functions_7.deleteFeesHeadByIdFunction(event);
});
exports.deleteFeesTypeMasterById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fees_functions_6.deleteFeesTypeByIdFunction(event);
});
exports.deleteAccountsHeadMasterById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fees_functions_6.deleteAccountsHeadByIdFunction(event);
});
// Edit By Id
exports.editFeesHeadMasterById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const body = handler_common_1.parseBody(event.body);
    if (body) {
        return yield fees_functions_5.editFeesHeadByIdFunction(body, event);
    }
    else {
        return response_helper_1.keysMissingResponse();
    }
});
exports.editFeesTypeMasterById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const body = handler_common_1.parseBody(event.body);
    if (body) {
        return yield fees_functions_5.editFeesTypeByIdFunction(body, event);
    }
    else {
        return response_helper_1.keysMissingResponse();
    }
});
exports.editAccountsHeadMasterById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const body = handler_common_1.parseBody(event.body);
    if (body) {
        return yield fees_functions_4.editAccountsHeadByIdFunction(body, event);
    }
    else {
        return response_helper_1.keysMissingResponse();
    }
});
// Change Status By Id
exports.statusChangeOfFeesHeadMaster = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const body = handler_common_1.parseBody(event.body);
    if (body) {
        return yield fees_functions_4.statusChangeofFeesHeadByIdFunction(body, event);
    }
    else {
        return response_helper_1.keysMissingResponse();
    }
});
exports.statusChangeOfFeesTypeMaster = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const body = handler_common_1.parseBody(event.body);
    if (body) {
        return yield fees_functions_3.statusChangeofFeesTypeByIdFunction(body, event);
    }
    else {
        return response_helper_1.keysMissingResponse();
    }
});
exports.statusChangeOfAccountHeadMaster = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const body = handler_common_1.parseBody(event.body);
    if (body) {
        return yield fees_functions_1.statusChangeofAccountHeadByIdFunction(body, event);
    }
    else {
        return response_helper_1.keysMissingResponse();
    }
});

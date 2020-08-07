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
exports.checkIfInstituteTypeExists = exports.deleteNTAObjectFromEvent = exports.getInstituteById = exports.getParentItemById = exports.setInstituteNameInMaster = exports.setParentNameInMaster = exports.getNTAObjectFromEvent = exports.statusChangeofAccountHeadByIdFunction = exports.statusChangeofFeesTypeByIdFunction = exports.statusChangeofFeesHeadByIdFunction = exports.editAccountsHeadByIdFunction = exports.editFeesTypeByIdFunction = exports.editFeesHeadByIdFunction = exports.deleteAccountsHeadByIdFunction = exports.deleteFeesTypeByIdFunction = exports.deleteFeesHeadByIdFunction = exports.getAccountsHeadByIdFunction = exports.getFeesTypeByIdFunction = exports.getFeesHeadByIdFunction = exports.checkIfNtaAccountsHeadExistsFunction = exports.checkIfNTAFeesTypeExistsFunction = exports.checkIfFeesHeadExistsFunction = exports.getInstituteTypeListFunction = exports.getAccountsHeadListFunction = exports.getFeesTypeListFunction = exports.getFeesHeadListFunction = exports.createAccountHeadFunction = exports.createFeesTypeFunction = exports.createFeesHeadFunction = void 0;
const request_method_model_1 = require("../model/request-method.model");
const fees_transform_1 = require("../transforms/fees.transform");
const db_handler_1 = require("../helpers/db-handler");
const common_vars_1 = require("../constants/common-vars");
const handler_common_1 = require("../helpers/handler-common");
const general_helpers_1 = require("../helpers/general.helpers");
const fees_transform_2 = require("../transforms/fees.transform");
const general_helpers_2 = require("../helpers/general.helpers");
const general_helpers_3 = require("../helpers/general.helpers");
exports.createFeesHeadFunction = (body, event) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = event.headers.username;
    const ntaId = general_helpers_1.getNTAIdFromEvent(event);
    const institutionType = body.instituteTypeId &&
        (yield general_helpers_1.checkIfMasterListitemExistsById(ntaId, `#MASTER#MASTER_TYPE#INSTITUTE_TYPE_MASTER#MASTER_ID#${body.instituteTypeId}`));
    const parentMaster = body.parentId &&
        (yield general_helpers_1.checkIfMasterListitemExistsById(ntaId, body.parentId));
    if (body.instituteTypeId && !institutionType) {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Institution Type Does not exist'));
    }
    else if (body.parentId && !parentMaster) {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Parent Fees head Does not exist'));
    }
    else if (general_helpers_1.sanitizeString(body.name) !== body.name) {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Fees head name should not contain any special characters.'));
    }
    else if (yield general_helpers_1.checkIfMasterListItemExistsByName(ntaId, 'FEE_HEAD_MASTER', general_helpers_1.sanitizeString(body.name), body.instituteTypeId || '')) {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Fees head name already exists'));
    }
    else {
        const feesHead = fees_transform_1.createNewFeesHead(userId, body);
        feesHead.id = fees_transform_2.getFeesHeadRangeKey(feesHead);
        feesHead.tableType = `#NTA#${ntaId}`;
        return yield db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(feesHead, common_vars_1.TABLE_NAMES.instituteTable));
    }
});
exports.createFeesTypeFunction = (body, event) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = event.headers.username;
    const feeType = fees_transform_1.createNewFeesType(userId, body);
    const ntaId = general_helpers_1.getNTAIdFromEvent(event);
    if (general_helpers_1.sanitizeString(body.name) !== body.name) {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Fees Type name should not contain any special characters.'));
    }
    else {
        feeType.id = fees_transform_1.getFeesTypeRangeKey(feeType);
        feeType.tableType = `#NTA#${ntaId}`;
        return yield db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(feeType, common_vars_1.TABLE_NAMES.instituteTable));
    }
});
exports.createAccountHeadFunction = (body, event) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = event.headers.username;
    const ntaId = general_helpers_1.getNTAIdFromEvent(event);
    const parentMaster = body.parentId &&
        (yield general_helpers_1.checkIfMasterListitemExistsById(ntaId, body.parentId));
    if (body.parentId && !parentMaster) {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Parent Accounts head Does not exist'));
    }
    else if (general_helpers_1.sanitizeString(body.name) !== body.name) {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Accounts head name should not contain any special characters.'));
    }
    else {
        const accountHead = fees_transform_1.createNewAccountHead(userId, body);
        accountHead.id = fees_transform_2.getAccountsHeadRangeKey(accountHead);
        accountHead.tableType = `#NTA#${ntaId}`;
        return yield db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(accountHead, common_vars_1.TABLE_NAMES.instituteTable));
    }
});
// Get list
exports.getFeesHeadListFunction = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const ntaId = general_helpers_1.getNTAIdFromEvent(event);
    const feesHeadList = yield general_helpers_1.getNTAMasterList(ntaId, 'FEE_HEAD_MASTER');
    for (let feesHead of feesHeadList) {
        yield exports.setParentNameInMaster(feesHead, ntaId);
        yield exports.setInstituteNameInMaster(feesHead, ntaId);
    }
    return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(false, '', feesHeadList.filter((feesHead) => !feesHead.isDeleted)));
});
exports.getFeesTypeListFunction = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const ntaId = general_helpers_1.getNTAIdFromEvent(event);
    return yield db_handler_1.processDynamoDBResponse(general_helpers_1.getNTAMasterList(ntaId, 'FEE_TYPE_MASTER').then((feesTypeList) => feesTypeList.filter((feesType) => !feesType.isDeleted)));
});
exports.getAccountsHeadListFunction = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const ntaId = general_helpers_1.getNTAIdFromEvent(event);
    return yield db_handler_1.processDynamoDBResponse(general_helpers_1.getNTAMasterList(ntaId, 'ACCOUNTS_HEAD_MASTER').then((accountsHeadList) => accountsHeadList.filter((accountsHead) => !accountsHead.isDeleted)));
});
exports.getInstituteTypeListFunction = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const ntaId = general_helpers_1.getNTAIdFromEvent(event);
    return yield db_handler_1.processDynamoDBResponse(general_helpers_1.getNTAMasterList(ntaId, 'INSTITUTE_TYPE_MASTER'));
});
// Check If Master Exists
exports.checkIfFeesHeadExistsFunction = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const ntaId = general_helpers_1.getNTAIdFromEvent(event);
    const body = handler_common_1.parseBody(event.body);
    return yield db_handler_1.processDynamoDBResponse(general_helpers_1.checkIfMasterListItemExistsByName(ntaId, 'FEE_HEAD_MASTER', general_helpers_1.sanitizeString((body === null || body === void 0 ? void 0 : body.name) || ''), (body === null || body === void 0 ? void 0 : body.institutionTypeId) || ''));
});
exports.checkIfNTAFeesTypeExistsFunction = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const ntaId = general_helpers_1.getNTAIdFromEvent(event);
    const body = handler_common_1.parseBody(event.body);
    return yield db_handler_1.processDynamoDBResponse(general_helpers_1.checkIfMasterListItemExistsByName(ntaId, 'FEE_TYPE_MASTER', (body === null || body === void 0 ? void 0 : body.name) || ''));
});
exports.checkIfNtaAccountsHeadExistsFunction = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const ntaId = general_helpers_1.getNTAIdFromEvent(event);
    const body = handler_common_1.parseBody(event.body);
    return yield db_handler_1.processDynamoDBResponse(general_helpers_1.checkIfMasterListItemExistsByName(ntaId, 'ACCOUNTS_HEAD_MASTER', (body === null || body === void 0 ? void 0 : body.name) || ''));
});
// Get By Id
exports.getFeesHeadByIdFunction = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const object = yield exports.getNTAObjectFromEvent(event);
    if (object) {
        const ntaId = general_helpers_1.getNTAIdFromEvent(event);
        yield exports.setParentNameInMaster(object, ntaId);
        yield exports.setInstituteNameInMaster(object, ntaId);
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(false, '', object));
    }
    else {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Fees head does not Exist'));
    }
});
exports.getFeesTypeByIdFunction = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const object = yield exports.getNTAObjectFromEvent(event);
    if (object) {
        const ntaId = general_helpers_1.getNTAIdFromEvent(event);
        yield exports.setParentNameInMaster(object, ntaId);
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(false, '', object));
    }
    else {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Fees head does not Exist'));
    }
});
exports.getAccountsHeadByIdFunction = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const object = yield exports.getNTAObjectFromEvent(event);
    if (object) {
        const ntaId = general_helpers_1.getNTAIdFromEvent(event);
        yield exports.setParentNameInMaster(object, ntaId);
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(false, '', object));
    }
    else {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Fees head does not Exist'));
    }
});
// Delete By Id Functions
exports.deleteFeesHeadByIdFunction = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const feesHead = yield exports.getNTAObjectFromEvent(event);
    if (feesHead) {
        feesHead.isDeleted = true;
        general_helpers_3.setUpdationDetailsOfObject(feesHead, event);
        return yield db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(feesHead, common_vars_1.TABLE_NAMES.instituteTable));
    }
    else {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Fees Head does not exist'));
    }
});
exports.deleteFeesTypeByIdFunction = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const feesType = yield exports.getNTAObjectFromEvent(event);
    if (feesType) {
        feesType.isDeleted = true;
        general_helpers_3.setUpdationDetailsOfObject(feesType, event);
        return yield db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(feesType, common_vars_1.TABLE_NAMES.instituteTable));
    }
    else {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Fees Type Does not exist'));
    }
});
exports.deleteAccountsHeadByIdFunction = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const accountsHead = yield exports.getNTAObjectFromEvent(event);
    if (accountsHead) {
        accountsHead.isDeleted = true;
        general_helpers_3.setUpdationDetailsOfObject(accountsHead, event);
        return yield db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(accountsHead, common_vars_1.TABLE_NAMES.instituteTable));
    }
    else {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Accounts Head does not exist'));
    }
});
// Edit by Id
exports.editFeesHeadByIdFunction = (body, event) => __awaiter(void 0, void 0, void 0, function* () {
    const feesHead = yield exports.getNTAObjectFromEvent(event);
    if (feesHead) {
        feesHead.name = body.name;
        feesHead.instituteTypeId = body.instituteTypeId;
        feesHead.parentId = body.parentId;
        general_helpers_3.setUpdationDetailsOfObject(feesHead, event);
        return yield db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(feesHead, common_vars_1.TABLE_NAMES.instituteTable));
    }
    else {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Fees Head does not exist'));
    }
});
exports.editFeesTypeByIdFunction = (body, event) => __awaiter(void 0, void 0, void 0, function* () {
    const feesType = yield exports.getNTAObjectFromEvent(event);
    if (feesType) {
        feesType.name = body.name;
        general_helpers_3.setUpdationDetailsOfObject(feesType, event);
        return yield db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(feesType, common_vars_1.TABLE_NAMES.instituteTable));
    }
    else {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Fees Type Does not exist'));
    }
});
exports.editAccountsHeadByIdFunction = (body, event) => __awaiter(void 0, void 0, void 0, function* () {
    const accountsHead = yield exports.getNTAObjectFromEvent(event);
    if (accountsHead) {
        accountsHead.name = body.name;
        accountsHead.parentId = body.parentId;
        general_helpers_3.setUpdationDetailsOfObject(accountsHead, event);
        return yield db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(accountsHead, common_vars_1.TABLE_NAMES.instituteTable));
    }
    else {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Accounts Head does not exist'));
    }
});
// Status Change By id
exports.statusChangeofFeesHeadByIdFunction = (body, event) => __awaiter(void 0, void 0, void 0, function* () {
    const feesHead = yield exports.getNTAObjectFromEvent(event);
    if (feesHead) {
        feesHead.isActive = body.isActive;
        general_helpers_3.setUpdationDetailsOfObject(feesHead, event);
        return yield db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(feesHead, common_vars_1.TABLE_NAMES.instituteTable));
    }
    else {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Fees Head does not exist'));
    }
});
exports.statusChangeofFeesTypeByIdFunction = (body, event) => __awaiter(void 0, void 0, void 0, function* () {
    const feesType = yield exports.getNTAObjectFromEvent(event);
    if (feesType) {
        feesType.isActive = body.isActive;
        general_helpers_3.setUpdationDetailsOfObject(feesType, event);
        return yield db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(feesType, common_vars_1.TABLE_NAMES.instituteTable));
    }
    else {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Fees Type Does not exist'));
    }
});
exports.statusChangeofAccountHeadByIdFunction = (body, event) => __awaiter(void 0, void 0, void 0, function* () {
    const accountsHead = yield exports.getNTAObjectFromEvent(event);
    if (accountsHead) {
        accountsHead.isActive = body.isActive;
        general_helpers_3.setUpdationDetailsOfObject(accountsHead, event);
        return yield db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(accountsHead, common_vars_1.TABLE_NAMES.instituteTable));
    }
    else {
        return handler_common_1.createResponse(200, new request_method_model_1.APIResponse(true, 'Accounts Head does not exist'));
    }
});
// Helpers
exports.getNTAObjectFromEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const ntaId = general_helpers_1.getNTAIdFromEvent(event);
    const objectId = general_helpers_2.getIdFromURLEvent(event);
    return yield general_helpers_3.getNTAObjectById(objectId, ntaId);
});
exports.setParentNameInMaster = (master, ntaId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    master.parentName = master.parentId
        ? ((_a = (yield exports.getParentItemById(master.parentId + '', ntaId))) === null || _a === void 0 ? void 0 : _a.name) || ''
        : '';
    master.parentId = master.parentId ? decodeURI(master.parentId) : '';
    return master;
});
exports.setInstituteNameInMaster = (master, ntaId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    master.instituteTypeName = master.instituteTypeId
        ? ((_b = (yield exports.getInstituteById(master.instituteTypeId + '', ntaId))) === null || _b === void 0 ? void 0 : _b.name) || ''
        : '';
    master.parentId = master.parentId ? decodeURI(master.parentId) : '';
    return master;
});
exports.getParentItemById = (parentIdURI, ntaId) => __awaiter(void 0, void 0, void 0, function* () {
    const parentId = decodeURI(parentIdURI);
    return yield db_handler_1.DynamoDBActions.query({
        TableName: common_vars_1.TABLE_NAMES.instituteTable,
        KeyConditionExpression: 'tableType = :ntaItem and id = :id',
        ExpressionAttributeValues: {
            ':ntaItem': `#NTA#${ntaId}`,
            ':id': parentId,
        },
    }).then((result) => result.Items[0]);
});
exports.getInstituteById = (instituteIdURI, ntaId) => __awaiter(void 0, void 0, void 0, function* () {
    const instituteId = decodeURI(instituteIdURI);
    return yield db_handler_1.DynamoDBActions.query({
        TableName: common_vars_1.TABLE_NAMES.instituteTable,
        KeyConditionExpression: 'tableType = :ntaItem and id = :id',
        ExpressionAttributeValues: {
            ':ntaItem': `#NTA#${ntaId}`,
            ':id': instituteId,
        },
    }).then((result) => result.Items[0]);
});
// TODO Delete Child Items After Deleting a Parent
exports.deleteNTAObjectFromEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const ntaId = general_helpers_1.getNTAIdFromEvent(event);
    const objectId = general_helpers_2.getIdFromURLEvent(event);
    const params = {
        Key: { id: objectId, tableType: `#NTA#${ntaId}` },
    };
    return yield db_handler_1.DynamoDBActions.delete(params, common_vars_1.TABLE_NAMES.instituteTable);
});
exports.checkIfInstituteTypeExists = (instituteId) => __awaiter(void 0, void 0, void 0, function* () { });
// TODO Write this function
// export const getChildMasters = async (parentId: ObjectId, masterType: TableName) => {
//   return DynamoDBActions.query()
// }

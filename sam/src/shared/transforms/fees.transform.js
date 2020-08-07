"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountsHeadRangeKey = exports.getFeesTypeRangeKey = exports.getFeesHeadRangeKey = exports.createEditAccountHead = exports.createEditFeesType = exports.createEditFeesHead = exports.createNewAccountHead = exports.createNewFeesType = exports.createNewFeesHead = void 0;
const masters_model_1 = require("../model/DB/imports/masters.model");
const institute_DB_model_1 = require("../model/DB/institute.DB.model");
const general_helpers_1 = require("../helpers/general.helpers");
exports.createNewFeesHead = (userId, body) => {
    const feesHead = new masters_model_1.FeesHeadName();
    feesHead.created_by = userId;
    feesHead.updated_by = userId;
    feesHead.name = general_helpers_1.sanitizeString(body.name);
    feesHead.parentId = encodeURI(body.parentId);
    feesHead.instituteTypeId = body.instituteTypeId;
    return feesHead;
};
exports.createNewFeesType = (userId, body) => {
    const feeType = new masters_model_1.FeeType();
    feeType.created_by = userId;
    feeType.updated_by = userId;
    feeType.name = general_helpers_1.sanitizeString(body.name);
    return feeType;
};
exports.createNewAccountHead = (userId, body) => {
    const accountHead = new institute_DB_model_1.AccountHead();
    accountHead.created_by = userId;
    accountHead.updated_by = userId;
    accountHead.name = general_helpers_1.sanitizeString(body.name);
    accountHead.parentId = body.parentId;
    return accountHead;
};
exports.createEditFeesHead = (userId, body) => {
    const feesHead = {
        updated_by: userId,
        name: general_helpers_1.sanitizeString(body.name),
        parentId: body.parentId,
        instituteTypeId: body.institutionTypeId,
        updated_at: new Date().toISOString(),
    };
    return feesHead;
};
exports.createEditFeesType = (userId, body) => {
    const feeType = {
        updated_by: userId,
        name: general_helpers_1.sanitizeString(body.name),
        updated_at: new Date().toISOString(),
    };
    return feeType;
};
exports.createEditAccountHead = (userId, body) => {
    const accountHead = {
        updated_by: userId,
        name: general_helpers_1.sanitizeString(body.name),
        parentId: body.parentId,
        updated_at: new Date().toISOString(),
    };
    return accountHead;
};
exports.getFeesHeadRangeKey = (feeHead) => {
    return general_helpers_1.getNTAMasterRangeKey('FEE_HEAD_MASTER', feeHead.id, feeHead.parentId, feeHead.instituteTypeId);
};
exports.getFeesTypeRangeKey = (feesType) => {
    return general_helpers_1.getNTAMasterRangeKey('FEE_TYPE_MASTER', feesType.id);
};
exports.getAccountsHeadRangeKey = (accountsHead) => {
    return general_helpers_1.getNTAMasterRangeKey('ACCOUNTS_HEAD_MASTER', accountsHead.id, accountsHead.parentId);
};

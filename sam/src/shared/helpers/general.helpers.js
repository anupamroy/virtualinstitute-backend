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
exports.setUpdationDetailsOfObject = exports.getNTAObjectById = exports.getIdFromURLEvent = exports.checkIfMasterListItemExistsByName = exports.checkIfMasterExistsByIdQuery = exports.checkIfMasterListitemExistsById = exports.getNTAMasterList = exports.getNTAMasterRangeKey = exports.sanitizeString = exports.getNTAIdFromEvent = exports.getNTAFromEvent = exports.getCognitoUserFromToken = exports.getContentsByType = exports.checkIFNTAMastersExist = void 0;
const db_handler_1 = require("./db-handler");
const common_vars_1 = require("../constants/common-vars");
const nta_functions_1 = require("../functions/nta.functions");
const common_vars_2 = require("../constants/common-vars");
exports.checkIFNTAMastersExist = () => db_handler_1.DynamoDBActions.get({ id: common_vars_1.NTA_MASTER_SET_ID }, common_vars_1.TABLE_NAMES.instituteTable);
exports.getContentsByType = (tablename, tableType) => {
    const params = {
        FilterExpression: 'tableType = :tableType',
        ExpressionAttributeValues: {
            ':tableType': tableType,
        },
    };
    return db_handler_1.DynamoDBActions.scan(tablename, params);
};
exports.getCognitoUserFromToken = (event) => {
    return common_vars_1.cognito
        .getUser({
        AccessToken: event.headers['Access-Token'],
    })
        .promise();
};
exports.getNTAFromEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const ntaId = exports.getNTAIdFromEvent(event);
    const nta = yield nta_functions_1.getNTAById(ntaId);
    return nta;
});
exports.getNTAIdFromEvent = (event) => {
    const ntaId = event.headers[common_vars_1.EVENT_HEADERS.ntaAuthorityId] ||
        event.headers[common_vars_2.EVENT_HEADERS_LOCAL.ntaAuthorityId];
    return ntaId;
};
exports.sanitizeString = (inputString) => (inputString || '').trim().replace(/[^\w\s]/gi, '');
exports.getNTAMasterRangeKey = (tableType, masterId, parentId, institutionTypeId) => {
    return (`#MASTER` +
        `#MASTER_TYPE#${tableType}` +
        (institutionTypeId ? `#INSTITUTION_TYPE#${institutionTypeId}` : ``) +
        (parentId ? `#PARENT_ID#${parentId}` : ``) +
        `#MASTER_ID#${masterId}`);
};
exports.getNTAMasterList = (ntaId, tableType) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_handler_1.DynamoDBActions.query({
        TableName: common_vars_1.TABLE_NAMES.instituteTable,
        KeyConditionExpression: 'tableType = :ntaItem and  begins_with(id, :master) ',
        ExpressionAttributeValues: {
            ':ntaItem': `#NTA#${ntaId}`,
            ':master': `#MASTER#MASTER_TYPE#${tableType}`,
        },
    }).then((result) => result.Items);
});
exports.checkIfMasterListitemExistsById = (ntaId, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_handler_1.DynamoDBActions.get({
        tableType: `#NTA#${ntaId}`,
        id,
    }, common_vars_1.TABLE_NAMES.instituteTable).then((result) => !!result.Item);
});
exports.checkIfMasterExistsByIdQuery = (ntaId, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_handler_1.DynamoDBActions.query({
        KeyConditionExpression: 'tableType = :ntaItem and  id = :master',
        ExpressionAttributeValues: {
            ':ntaItem': `#NTA#${ntaId}`,
            ':master': id,
        },
        TableName: common_vars_1.TABLE_NAMES.instituteTable,
    });
});
exports.checkIfMasterListItemExistsByName = (ntaId, tableType, masterName, institutionTypeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_handler_1.DynamoDBActions.query({
        TableName: common_vars_1.TABLE_NAMES.instituteTable,
        KeyConditionExpression: 'tableType = :ntaItem and begins_with(id, :id)',
        FilterExpression: '#name = :masterName',
        ExpressionAttributeValues: {
            ':ntaItem': `#NTA#${ntaId}`,
            ':id': `#MASTER#MASTER_TYPE#${tableType}` +
                (!!institutionTypeId ? `#INSTITUTION_TYPE#${institutionTypeId}` : ``),
            ':masterName': masterName,
        },
        ExpressionAttributeNames: {
            '#name': 'name',
        },
    }).then((result) => !!result.Items.length);
});
exports.getIdFromURLEvent = (event) => {
    var _a;
    return decodeURIComponent(((_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id) || '');
};
exports.getNTAObjectById = (masterId, ntaId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_handler_1.DynamoDBActions.get({
        tableType: `#NTA#${ntaId}`,
        id: masterId,
    }, common_vars_1.TABLE_NAMES.instituteTable).then((result) => result.Item);
});
exports.setUpdationDetailsOfObject = (object, event) => {
    const userId = event.headers.username;
    object.updated_by = userId;
    object.updated_at = new Date().toISOString();
};

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
exports.getNTAById = exports.getNTAofUser = exports.getNTAIdofUser = exports.insertCognitoUserInNTAFunction = exports.getNTAByIDFunction = exports.saveNTAAuthority = exports.listAllNTAAuthoritiesFunction = exports.listNTAAuthorityFunction = exports.createNTAAuthorityFunction = void 0;
const nta_DB_model_1 = require("../model/DB/nta.DB.model");
const db_handler_1 = require("../helpers/db-handler");
const common_vars_1 = require("../constants/common-vars");
const general_helpers_1 = require("../helpers/general.helpers");
exports.createNTAAuthorityFunction = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const ntaAuthority = new nta_DB_model_1.NTA();
    ntaAuthority.ntaName = body.ntaName;
    return db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(ntaAuthority, common_vars_1.TABLE_NAMES.instituteTable));
});
exports.listNTAAuthorityFunction = (ntaId) => __awaiter(void 0, void 0, void 0, function* () {
    return db_handler_1.processDynamoDBResponse(exports.getNTAByIDFunction(ntaId));
});
exports.listAllNTAAuthoritiesFunction = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_handler_1.processDynamoDBResponse(general_helpers_1.getContentsByType(common_vars_1.TABLE_NAMES.instituteTable, 'NTA_AUTHORITY'));
});
exports.saveNTAAuthority = (ntaAuthority) => db_handler_1.DynamoDBActions.putItem(ntaAuthority, common_vars_1.TABLE_NAMES.instituteTable);
exports.getNTAByIDFunction = (ntaId) => {
    return db_handler_1.DynamoDBActions.getItemById(ntaId, 'NTA_AUTHORITY', common_vars_1.TABLE_NAMES.instituteTable);
};
exports.insertCognitoUserInNTAFunction = (ntaId, username) => __awaiter(void 0, void 0, void 0, function* () {
    const ntaUser = new nta_DB_model_1.NTAUser();
    ntaUser.username = username;
    ntaUser.ntaId = ntaId;
    ntaUser.tableType = `#NTA#${ntaId}`;
    ntaUser.id = `#USER#ADMIN#${username}`;
    return db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(ntaUser, common_vars_1.TABLE_NAMES.instituteTable));
});
exports.getNTAIdofUser = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cognitoUser = yield general_helpers_1.getCognitoUserFromToken(event);
    const userId = ((_a = cognitoUser.UserAttributes.find((attr) => attr.Name === 'sub')) === null || _a === void 0 ? void 0 : _a.Value) + '';
    const user = yield db_handler_1.DynamoDBActions.get({ id: userId }, common_vars_1.TABLE_NAMES.instituteTable);
    return user.ntaId;
});
exports.getNTAofUser = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const ntaId = exports.getNTAIdofUser(event);
    const nta = yield db_handler_1.DynamoDBActions.get({ id: ntaId }, common_vars_1.TABLE_NAMES.instituteTable);
    return nta;
});
exports.getNTAById = (ntaId) => db_handler_1.DynamoDBActions.get({ id: ntaId }, common_vars_1.TABLE_NAMES.instituteTable).then((nta) => nta.Item);

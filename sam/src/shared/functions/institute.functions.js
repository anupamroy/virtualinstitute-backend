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
exports.getInstituteFromEvent = exports.getInstituteById = exports.getInstituteIdByUser = exports.createInstituteUser = exports.createInstitute = void 0;
const institute_DB_model_1 = require("../model/DB/institute.DB.model");
const db_handler_1 = require("../helpers/db-handler");
const common_vars_1 = require("../constants/common-vars");
const general_helpers_1 = require("../helpers/general.helpers");
exports.createInstitute = (ntaId) => {
    const institute = new institute_DB_model_1.Institute();
    return db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(institute, common_vars_1.TABLE_NAMES.instituteTable), institute);
};
exports.createInstituteUser = (instututeId, cognitoUserId) => {
    const user = new institute_DB_model_1.InstituteUser();
    user.instituteId = instututeId;
    user.cognitoUserId = cognitoUserId;
};
exports.getInstituteIdByUser = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const instituteUsers = yield general_helpers_1.getContentsByType(common_vars_1.TABLE_NAMES.instituteTable, "INSTITUTE_USER");
    const currentUser = instituteUsers.find((user) => { var _a, _b; return user.cognitoUserId === ((_b = (_a = event.requestContext.authorizer) === null || _a === void 0 ? void 0 : _a.claims) === null || _b === void 0 ? void 0 : _b.sub); });
    return (_a = currentUser) === null || _a === void 0 ? void 0 : _a.instituteId;
});
exports.getInstituteById = (instituteId) => __awaiter(void 0, void 0, void 0, function* () {
    const institutes = yield general_helpers_1.getContentsByType(common_vars_1.TABLE_NAMES.instituteTable, "INSTITUTE");
    return institutes.find((institute) => institute.id === instituteId);
});
exports.getInstituteFromEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const instituteId = yield exports.getInstituteIdByUser(event);
    return yield (instituteId && exports.getInstituteById(instituteId));
});

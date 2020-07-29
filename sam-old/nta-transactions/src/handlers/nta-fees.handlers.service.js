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
exports.deleteFeesHead = exports.deleteAccountHead = exports.deleteFeeType = exports.editFeesHead = exports.editAccountHead = exports.editFeeType = exports.createFeesHead = exports.createAccountHead = exports.createFeeType = exports.getFeeHeadList = exports.getAccountTypeList = exports.getFeeTypeList = exports.getFeesHeadById = exports.getAccountHeadById = exports.getFeeTypeById = exports.putItem = exports.getById = exports.getAllItems = void 0;
const db_handler_1 = require("../shared/helpers/db-handler");
const handler_1 = require("../shared/helpers/handler");
exports.getAllItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_handler_1.DynamoDBActions.scan();
    const items = data.Items;
    return handler_1.createResponse(200, items);
});
exports.getById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id;
    const data = yield db_handler_1.DynamoDBActions.get({ id });
    const item = data.Item;
    return handler_1.createResponse(200, item);
});
exports.putItem = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const body = handler_1.parseBody(event.body);
    const id = body.id;
    const name = body.name;
    const result = yield db_handler_1.DynamoDBActions.putItem({ id, name });
    return handler_1.createResponse(200, result);
});
// Actual Functions
exports.getFeeTypeById = (event) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getAccountHeadById = (event) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getFeesHeadById = (event) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getFeeTypeList = (event) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getAccountTypeList = (event) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getFeeHeadList = (event) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createFeeType = (event) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createAccountHead = (event) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createFeesHead = (event) => __awaiter(void 0, void 0, void 0, function* () { });
exports.editFeeType = (event) => __awaiter(void 0, void 0, void 0, function* () { });
exports.editAccountHead = (event) => __awaiter(void 0, void 0, void 0, function* () { });
exports.editFeesHead = (event) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteFeeType = (event) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteAccountHead = (event) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteFeesHead = (event) => __awaiter(void 0, void 0, void 0, function* () { });

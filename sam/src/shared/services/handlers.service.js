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
exports.putItem = exports.getById = exports.getAllItems = void 0;
const db_handler_1 = require("../helpers/db-handler");
const handler_1 = require("../helpers/handler");
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

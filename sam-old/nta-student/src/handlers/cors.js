"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsResponse = void 0;
const handler_1 = require("../shared/helpers/handler");
exports.corsResponse = () => handler_1.createResponse(200, null);

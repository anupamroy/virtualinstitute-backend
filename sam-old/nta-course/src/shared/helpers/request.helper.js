"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestValidator = void 0;
exports.requestValidator = (object, classInstance) => object && Object.keys(classInstance).every((key) => object[key]);

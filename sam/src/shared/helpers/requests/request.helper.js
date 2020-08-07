"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfNTATokenValid = exports.requestValidator = void 0;
const common_vars_1 = require("../../constants/common-vars");
exports.requestValidator = (object, classInstance) => object && Object.keys(classInstance).every((key) => object[key]);
exports.checkIfNTATokenValid = (event) => {
    return (event.headers[common_vars_1.REQUEST_HEADERS.ntaAPIPasskey] === common_vars_1.CognitoConfig.ntaAPIPasskey);
};

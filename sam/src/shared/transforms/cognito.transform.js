"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCognitoNTAUserObject = exports.createCognitoStudentObject = exports.generateStudentRegistrationNumber = exports.createCognitoUserObject = void 0;
const common_vars_1 = require("../constants/common-vars");
exports.createCognitoUserObject = (UserPoolId, Username, TemporaryPassword, UserAttributes, body) => {
    return {
        UserPoolId,
        Username,
        TemporaryPassword,
        UserAttributes: UserAttributes.map((attribute) => ({
            Name: attribute,
            Value: body[attribute],
        })),
    };
};
// Student
exports.generateStudentRegistrationNumber = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
exports.createCognitoStudentObject = (registrationNumber, body) => exports.createCognitoUserObject(common_vars_1.CognitoConfig.studentInstituteUserPoolId, registrationNumber, body.password, ['email', 'gender', 'name', 'family_name', 'middle_name'], body);
exports.createCognitoNTAUserObject = (body) => exports.createCognitoUserObject(common_vars_1.CognitoConfig.ntaUserPoolId, body.mobile, body.password, ['email', 'gender', 'name', 'family_name', 'middle_name'], body);

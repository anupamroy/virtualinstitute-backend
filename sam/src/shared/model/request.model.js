"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStudentRequest = exports.CreatePersonRequest = void 0;
class CreatePersonRequest {
    constructor() {
        this.mobile = '';
        this.password = '';
        this.email = '';
        this.gender = '';
        this.name = '';
        this.family_name = '';
        this.middle_name = '';
    }
}
exports.CreatePersonRequest = CreatePersonRequest;
class CreateStudentRequest extends CreatePersonRequest {
    constructor() {
        super(...arguments);
        this.registrationNumber = '';
    }
}
exports.CreateStudentRequest = CreateStudentRequest;

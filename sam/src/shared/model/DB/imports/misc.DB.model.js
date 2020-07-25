"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemUser = exports.Person = void 0;
const DB_model_1 = require("./DB.model");
class Person extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.phone = "";
        this.email = "";
    }
}
exports.Person = Person;
class SystemUser extends Person {
    constructor() {
        super(...arguments);
        this.username = "";
        this.type = "INSTITUTE_USER";
    }
}
exports.SystemUser = SystemUser;

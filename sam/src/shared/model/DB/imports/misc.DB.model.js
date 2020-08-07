"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildMasterItem = exports.GeneralMasterItem = exports.SystemUser = exports.Person = void 0;
const DB_model_1 = require("./DB.model");
class Person extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.phone = "";
        this.email = "";
        this.cognitoUserId = "";
    }
}
exports.Person = Person;
class SystemUser extends Person {
    constructor() {
        super(...arguments);
        this.username = "";
        this.userType = "INSTITUTE_USER";
    }
}
exports.SystemUser = SystemUser;
class GeneralMasterItem extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.name = "";
    }
}
exports.GeneralMasterItem = GeneralMasterItem;
class ChildMasterItem extends GeneralMasterItem {
    constructor() {
        super(...arguments);
        this.parentId = "";
        this.parentName = "";
    }
}
exports.ChildMasterItem = ChildMasterItem;

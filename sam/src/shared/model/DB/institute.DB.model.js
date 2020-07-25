"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModel = exports.NTA = exports.InstituteUser = exports.AccountHead = exports.Institute = void 0;
const masters_DB_model_1 = require("./imports/masters.DB.model");
const misc_DB_model_1 = require("./imports/misc.DB.model");
const DB_model_1 = require("./imports/DB.model");
class Institute extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.instituteName = "";
        this.instituteAddress = "";
        this.primaryPhone = "";
        this.alternatePhones = [];
        this.primaryEmail = "";
        this.alternateEmails = [];
        this.instituteType = "COLLEGE";
        this.logo = "";
        this.favIcon = "";
        this.ledgerIds = [];
        this.masters = new masters_DB_model_1.Masters();
    }
}
exports.Institute = Institute;
class AccountHead extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.accountHead = "";
        this.balance = 0;
    }
}
exports.AccountHead = AccountHead;
class InstituteUser extends misc_DB_model_1.SystemUser {
}
exports.InstituteUser = InstituteUser;
class NTA extends misc_DB_model_1.SystemUser {
    constructor() {
        super(...arguments);
        this.masters = new masters_DB_model_1.Masters();
    }
}
exports.NTA = NTA;
// User Types and Permission Model
class PermissionModel extends DB_model_1.GeneralDBItem {
}
exports.PermissionModel = PermissionModel;

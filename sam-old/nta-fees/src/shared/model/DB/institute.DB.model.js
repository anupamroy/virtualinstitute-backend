"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModel = exports.InstituteItem = exports.NTAMasters = exports.NTAUser = exports.InstituteUser = exports.AccountHead = exports.Institute = void 0;
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
        this.masters = new masters_DB_model_1.InstituteMasters();
        this.instituteTypeId = "";
        this.ledgerIds = [];
        this.logo = "";
        this.favIcon = "";
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
class NTAUser extends misc_DB_model_1.SystemUser {
}
exports.NTAUser = NTAUser;
class NTAMasters extends masters_DB_model_1.Masters {
}
exports.NTAMasters = NTAMasters;
class InstituteItem extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.instituteId = "";
    }
}
exports.InstituteItem = InstituteItem;
// User Types and Permission Model
class PermissionModel extends DB_model_1.GeneralDBItem {
}
exports.PermissionModel = PermissionModel;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituteItem = exports.InstituteUser = exports.AccountHead = exports.Institute = void 0;
const masters_DB_model_1 = require("./imports/masters.DB.model");
const misc_DB_model_1 = require("./imports/misc.DB.model");
const DB_model_1 = require("./imports/DB.model");
const nta_DB_model_1 = require("./nta.DB.model");
class Institute extends nta_DB_model_1.NTAItem {
    constructor() {
        super(...arguments);
        this.ntaId = "";
        this.instituteName = "";
        this.instituteAddress = "";
        this.primaryPhone = "";
        this.alternatePhones = [];
        this.primaryEmail = "";
        this.alternateEmails = [];
        this.masters = new masters_DB_model_1.InstituteMasters();
        this.instituteTypeId = "";
        this.ledgerIds = []; // Account Heads
        this.logo = "";
        this.favIcon = "";
    }
}
exports.Institute = Institute;
class AccountHead extends misc_DB_model_1.ChildMasterItem {
    constructor() {
        super(...arguments);
        this.tableType = "";
        this.balance = 0;
    }
}
exports.AccountHead = AccountHead;
class InstituteUser extends misc_DB_model_1.SystemUser {
    constructor() {
        super(...arguments);
        this.instituteId = "";
    }
}
exports.InstituteUser = InstituteUser;
class InstituteItem extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.instituteId = "";
    }
}
exports.InstituteItem = InstituteItem;

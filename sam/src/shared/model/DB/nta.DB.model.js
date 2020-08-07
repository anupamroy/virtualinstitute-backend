"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NTAUser = exports.NTAItem = exports.NTA = exports.NTAOptions = exports.NTAMasters = void 0;
const misc_DB_model_1 = require("./imports/misc.DB.model");
const masters_DB_model_1 = require("./imports/masters.DB.model");
const DB_model_1 = require("./imports/DB.model");
class NTAMasters extends masters_DB_model_1.Masters {
}
exports.NTAMasters = NTAMasters;
class NTAOptions {
}
exports.NTAOptions = NTAOptions;
class NTA extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.ntaName = "";
        this.tableType = "NTA_AUTHORITY";
        this.ntaOptions = new NTAOptions();
        this.masters = new NTAMasters();
    }
}
exports.NTA = NTA;
class NTAItem extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.ntaId = "";
    }
}
exports.NTAItem = NTAItem;
class NTAUser extends misc_DB_model_1.SystemUser {
    constructor() {
        super(...arguments);
        this.ntaId = "";
        this.userType = "ADMIN";
    }
}
exports.NTAUser = NTAUser;

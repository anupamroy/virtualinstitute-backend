"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralDBItem = void 0;
const uuid_1 = require("uuid");
class GeneralDBItem {
    constructor() {
        this.id = uuid_1.v4();
        // No data is deleted. This key decides whether or not to fetch this item.
        this.isActive = true;
        this.isDeleted = false;
        this.created_by = "";
        this.created_at = new Date();
        this.updated_by = "";
        this.updated_at = new Date();
    }
}
exports.GeneralDBItem = GeneralDBItem;

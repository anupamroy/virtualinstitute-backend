"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralDBItem = void 0;
const uuid_1 = require("uuid");
class GeneralDBItem {
    constructor() {
        this.id = uuid_1.v4();
        // tableType: TableName = "FEE"; // The table name of this object(For easier fetching)
        // No data is deleted. This key decides whether or not to fetch this item.
        this.isActive = true;
        this.isDeleted = false;
        this.tableType = '';
        this.created_by = '';
        this.created_at = new Date().toISOString();
        this.updated_by = '';
        this.updated_at = new Date().toISOString();
    }
}
exports.GeneralDBItem = GeneralDBItem;

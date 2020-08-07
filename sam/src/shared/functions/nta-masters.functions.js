"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNTAMasterArray = exports.addItemToNTAMasters = void 0;
exports.addItemToNTAMasters = (item, masterArrayName, nta) => {
    const masterArray = exports.getNTAMasterArray(masterArrayName, nta);
    const matchedItem = masterArray.find((arrayItem) => arrayItem.id === item.id);
    if (matchedItem) {
        Object.keys(matchedItem).forEach((key) => {
            matchedItem[key] = item[key];
        });
    }
    else {
        masterArray.push(item);
    }
};
exports.getNTAMasterArray = (masterArrayName, nta) => {
    let masterArray = nta.masters[masterArrayName];
    if (!masterArray) {
        masterArray = nta.masters[masterArrayName] = [];
    }
    return masterArray;
};

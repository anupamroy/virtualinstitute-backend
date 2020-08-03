import { NTAMasters, NTA } from "../model/DB/nta.DB.model";
import { GeneralMasterItem } from "../model/DB/imports/misc.DB.model";

export const addItemToNTAMasters = <T>(
  item: T,
  masterArrayName: keyof NTAMasters,
  nta: NTA
) => {
  const masterArray = getNTAMasterArray(masterArrayName, nta);
  const matchedItem = masterArray.find(
    (arrayItem: T) => (arrayItem as any).id === (item as any).id
  );
  if (matchedItem) {
    Object.keys(matchedItem).forEach((key) => {
      (matchedItem as any)[key] = (item as any)[key];
    });
  } else {
    masterArray.push(item);
  }
};

export const deleteItemFromNTAMasters = (
  itemId: string,
  masterArrayName: keyof NTAMasters,
  nta: NTA
) => {
  const masterArray = getNTAMasterArray(masterArrayName, nta);
  const itemIndex = masterArray.findIndex(
    (masterItem) => masterItem.id === itemId
  );
  if (itemIndex > -1) {
    nta.masters[masterArrayName] = masterArray.filter(
      (masterItem: any) => masterItem.id !== itemId
    );
    const children = nta.masters[masterArrayName].filter(
      (masterItem: any) => masterItem.parentId === itemId
    );
    children.forEach((childMasterItem) =>
      deleteItemFromNTAMasters(childMasterItem.id, masterArrayName, nta)
    );
    return true;
  } else {
    return false;
  }
};

export const editNTAMasterItem = (
  itemId: string,
  item: any,
  masterArrayName: keyof NTAMasters,
  nta: NTA
) => {
  const masterArray = getNTAMasterArray(masterArrayName, nta);
  const matchedItem = masterArray.find(
    (masterItem) => masterItem.id === itemId
  );
  if (matchedItem) {
    Object.keys(matchedItem)
      .filter((matchedItemKey) => matchedItemKey !== "id")
      .filter(
        (matchedKey) =>
          item[matchedKey] !== undefined || typeof item[matchedKey] === "string"
      )
      .forEach(
        (matchedItemKey) => (matchedItem[matchedItemKey] = item[matchedItemKey])
      );
    return true;
  } else {
    return false;
  }
};

export const changeStatusOfNTAMaster = (
  itemId: string,
  masterArrayName: keyof NTAMasters,
  nta: NTA,
  isActive: boolean
) => {
  const masterArray = getNTAMasterArray(masterArrayName, nta);
  const matchedItem: GeneralMasterItem = masterArray.find(
    (arrayItem: any) => (arrayItem as any).id === itemId
  );
  if (matchedItem) {
    matchedItem.isActive = isActive;
  }
};

export const getNTAMasterArray = (
  masterArrayName: keyof NTAMasters,
  nta: NTA
) => {
  let masterArray = nta.masters[masterArrayName] as any[];
  if (!masterArray) {
    masterArray = nta.masters[masterArrayName] = [];
  }
  return masterArray;
};

export const setParentNameInMasterArray = (
  masterArrayName: keyof NTAMasters,
  nta: NTA
) => {
  const masterArray = getNTAMasterArray(masterArrayName, nta);
  const processMasterArrayItem = (childItem: any) => {
    if (childItem.parentId) {
      childItem.parentName = masterArray.find(
        (masterArrayItem) => masterArrayItem.id === childItem.parentId
      )?.name;
    }
  };
  masterArray.forEach((masterArrayItem) =>
    processMasterArrayItem(masterArrayItem)
  );
  return masterArray;
};

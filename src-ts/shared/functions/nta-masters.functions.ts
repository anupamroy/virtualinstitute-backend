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

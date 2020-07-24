import { v4 as uuidv4 } from "uuid";

export class GeneralDBItem {
  id = uuidv4();
  // No data is deleted. This key decides whether or not to fetch this item.
  isActive = true;
  created_by = "";
  created_at = new Date();
  updated_by = "";
  updated_at = new Date();
}



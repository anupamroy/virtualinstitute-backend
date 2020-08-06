import { v4 as uuidv4 } from 'uuid';
import { ObjectId, TableName } from './types.DB.model';

export class GeneralDBItem {
  id: ObjectId = uuidv4();

  // tableType: TableName = "FEE"; // The table name of this object(For easier fetching)
  // No data is deleted. This key decides whether or not to fetch this item.
  isActive: boolean = true;
  isDeleted: boolean = false;
  tableType: string = '';
  created_by: ObjectId = '';
  created_at = new Date().toISOString();
  updated_by: ObjectId = '';
  updated_at = new Date().toISOString();
}

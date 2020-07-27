import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from './types.DB.model';

export class GeneralDBItem {
  id: ObjectId = uuidv4();

  // No data is deleted. This key decides whether or not to fetch this item.
  isActive: boolean = true;
  isDeleted: boolean = false;

  created_by: ObjectId = '';
  created_at = new Date();
  updated_by: ObjectId = '';
  updated_at = new Date();
}

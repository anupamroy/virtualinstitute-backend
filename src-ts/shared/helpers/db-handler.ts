import { CommonItems } from "../constants/common-vars";

// import { documentClient } from "../constants/common-vars";
const TableName = CommonItems.tableName;
export const DynamoDBActions = {
  putItem: (Item: any) =>
    CommonItems.documentClient.put({ TableName, Item }).promise(),
  get: (Key: any) =>
    CommonItems.documentClient.get({ TableName, Key }).promise(),
  scan: () => CommonItems.documentClient.scan({ TableName }).promise(),
};

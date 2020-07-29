import { CommonItems } from "../constants/common-vars";

// import { documentClient } from "../constants/common-vars";
export const DynamoDBActions = {
  putItem: (Item: any, TableName: string): Promise<any> =>
    CommonItems.documentClient.put({ TableName, Item }).promise(),
  get: (Key: any, TableName: string): Promise<any> =>
    CommonItems.documentClient.get({ TableName, Key }).promise(),
  scan: (TableName: string): Promise<any> =>
    CommonItems.documentClient.scan({ TableName }).promise(),
  batchGet: (params: any): Promise<any> =>
    CommonItems.documentClient.batchGet({ RequestItems: params }).promise(),
};

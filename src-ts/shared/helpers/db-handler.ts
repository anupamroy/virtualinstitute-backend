import { CommonItems } from "../constants/common-vars";

// import { documentClient } from "../constants/common-vars";
const TableName = CommonItems.studentTable;
export const DynamoDBActions = {
  putItem: (Item: any): Promise<any> =>
    CommonItems.documentClient.put({ TableName, Item }).promise(),
  get: (Key: any): Promise<any> =>
    CommonItems.documentClient.get({ TableName, Key }).promise(),
  scan: (): Promise<any> =>
    CommonItems.documentClient.scan({ TableName }).promise(),
  batchGet: (params: any): Promise<any> =>
    CommonItems.documentClient.batchGet(params).promise(),
};

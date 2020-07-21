// import { documentClient } from "../constants/common-vars";
const TableName = CommonItems.tableName;
namespace DynamoDBActions {
  export const putItem = (Item: any) =>
    CommonItems.documentClient.put({ TableName, Item }).promise();

  export const get = (Key: any) =>
    CommonItems.documentClient.get({ TableName, Key }).promise();

  export const scan = () =>
    CommonItems.documentClient.scan({ TableName }).promise();
}

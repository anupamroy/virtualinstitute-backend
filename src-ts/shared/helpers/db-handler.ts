import { CommonItems } from "../constants/common-vars";
import { createResponse } from "./handler-common";
import { APIResponse } from "../model/request-method.model";

// import { documentClient } from "../constants/common-vars";
import { TableName } from "../model/DB/imports/types.DB.model";
export const DynamoDBActions = {
  putItem: (Item: any, TableName: string): Promise<any> =>
    CommonItems.documentClient.put({ TableName, Item }).promise(),
  get: (Key: any, TableName: string): Promise<any> =>
    CommonItems.documentClient.get({ TableName, Key }).promise(),
  getItemById: (id: string, tableType: TableName, TableName: string) =>
    CommonItems.documentClient
      .query({
        TableName,
        KeyConditionExpression: "id = :id and tableType = :tableType",
        ExpressionAttributeValues: {
          ":id": id,
          ":tableType": tableType,
        },
      })
      .promise()
      .then((result: { Items: any[] }) => result.Items[0]),
  scan: (TableName: string, params?: any): Promise<any> =>
    CommonItems.documentClient.scan({ TableName, ...params }).promise(),
  batchGet: (params: any): Promise<any> =>
    CommonItems.documentClient.batchGet({ RequestItems: params }).promise(),
  query: (params: any): Promise<any> =>
    CommonItems.documentClient.query(params).promise(),
};

export const processDynamoDBResponse = (event: Promise<any>, data?: any) =>
  event
    .then((response) =>
      createResponse(200, new APIResponse(false, "", data || response))
    )
    .catch((error) =>
      createResponse(
        422,
        new APIResponse(false, error.message || "An Error Occured", error)
      )
    );

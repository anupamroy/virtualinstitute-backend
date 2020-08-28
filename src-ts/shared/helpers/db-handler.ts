import { TABLE_NAMES } from '../constants/common-vars';
import { createResponse } from './handler-common';
import { APIResponse } from '../model/request-method.model';
import { TableName } from '../model/DB/imports/types.DB.model';

const dynamodb = require('aws-sdk/clients/dynamodb');

// import { documentClient } from "../constants/common-vars";
const documentClient = new dynamodb.DocumentClient();

export const DynamoDBActions = {
  putItem: (Item: any, TableName = TABLE_NAMES.instituteTable): Promise<any> =>
    documentClient.put({ TableName, Item }).promise(),
  get: (Key: any, TableName = TABLE_NAMES.instituteTable): Promise<any> =>
    documentClient.get({ TableName, Key }).promise(),
  getItemById: (
    id: string,
    tableType: TableName,
    TableName = TABLE_NAMES.instituteTable
  ) =>
    documentClient
      .query({
        TableName,
        KeyConditionExpression: 'id = :id and tableType = :tableType',
        ExpressionAttributeValues: {
          ':id': id,
          ':tableType': tableType,
        },
      })
      .promise()
      .then((result: { Items: any[] }) => result.Items[0]),
  scan: (TableName: string, params?: any): Promise<any> =>
    documentClient.scan({ TableName, ...params }).promise(),
  batchGet: (params: any): Promise<any> =>
    documentClient.batchGet({ RequestItems: params }).promise(),
  query: (params: any): Promise<any> => documentClient.query(params).promise(),
  delete: (params: any, TableName: string) =>
    documentClient.delete({ TableName, ...params }).promise(),
};

export const processDynamoDBResponse = (event: Promise<any>, data?: any) =>
  event
    .then((response) =>
      createResponse(200, new APIResponse(false, '', data || response))
    )
    .catch((error) =>
      createResponse(
        422,
        new APIResponse(false, error.message || 'An Error Occured', error)
      )
    );

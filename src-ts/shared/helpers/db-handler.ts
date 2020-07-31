import { CommonItems } from '../constants/common-vars';
import { createResponse } from './handler';
import { APIResponse } from '../model/request-method.model';

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

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda/trigger/api-gateway-proxy';
import { RequestMethod, APIResponse } from '../model/request-method.model';
import { CORS_HEADERS } from '../constants/common.const';

export const AWSHandler = (requestMethod: RequestMethod, callback: any) => {
  return async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    checkRequestMethod(requestMethod, event);
    return await callback(event);
  };
};

export const checkRequestMethod = (
  requestMethod: RequestMethod,
  event: APIGatewayProxyEvent
) => {
  if (event.httpMethod !== requestMethod) {
    throw new Error(
      `This API only accepts ${requestMethod} method, you tried: ${event.httpMethod}`
    );
  }
};

export const parseBody = <T>(body: string | null): T | null => {
  return body ? (JSON.parse(body) as T) : null;
};

export const createResponse = (
  statusCode: number,
  body: any | null | undefined,
  headers?: any,
  multiValueHeaders?: any,
  isBase64Encoded?: any
): APIGatewayProxyResult => ({
  statusCode,
  body: JSON.stringify(body),
  headers: { ...CORS_HEADERS, ...headers },
  multiValueHeaders,
  isBase64Encoded,
});

export const createErrorResponse = (error: string, data?: any) => {
  return createResponse(200, new APIResponse(true, error, data));
};

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { RequestMethod } from "../model/request-method.model";
import { CORS_HEADERS } from "../constants/common-vars";

export const AWSHandler = (requestMethod: RequestMethod, callback: any) => {
  return async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    // All log statements are written to CloudWatch
    console.info("received:", event);
    if (event.httpMethod !== requestMethod) {
      throw new Error(
        `This API only accepts ${requestMethod} method, you tried: ${event.httpMethod}`
      );
    }

    const response = callback(event);
    // All log statements are written to CloudWatch
    console.info(
      `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
    );
    console.info(response);
    return response;
  };
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

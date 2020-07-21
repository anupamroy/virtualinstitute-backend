import { APIGatewayProxyResult } from "aws-lambda";

export const createResponse = (
  statusCode: number,
  body: any | null | undefined,
  headers?: any,
  multiValueHeaders?: any,
  isBase64Encoded?: any
): APIGatewayProxyResult => ({
  statusCode,
  body: JSON.stringify(body),
  headers,
  multiValueHeaders,
  isBase64Encoded
});

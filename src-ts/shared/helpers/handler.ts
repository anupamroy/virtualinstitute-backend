import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { RequestMethod } from "../model/request-method.model";

export const AWSHandler = (requestMethod: RequestMethod, callback: any) => {
  return async (event: APIGatewayProxyEvent) => {
    if (event.httpMethod !== requestMethod) {
      throw new Error(
        `This API only accepts ${requestMethod} method, you tried: ${event.httpMethod}`
      );
    }
    // All log statements are written to CloudWatch
    console.info("received:", event);
    const response = callback(event);
    // All log statements are written to CloudWatch
    console.info(
      `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
    );
    return response;
  };
};

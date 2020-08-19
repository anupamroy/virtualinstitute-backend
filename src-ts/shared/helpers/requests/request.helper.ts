import { APIGatewayProxyEvent } from 'aws-lambda';
import { REQUEST_HEADERS, CognitoConfig } from '../../constants/common-vars';
import { base64Decode } from '../general.helpers';
const multipart = require('aws-lambda-multipart-parser');

export const requestValidator = (object: any, classInstance: any) =>
  object && Object.keys(classInstance).every((key) => object[key]);

export const checkIfNTATokenValid = (event: APIGatewayProxyEvent) => {
  return (
    event.headers[REQUEST_HEADERS.ntaAPIPasskey] === CognitoConfig.ntaAPIPasskey
  );
};

export const parseMultiPart = <T>(event: APIGatewayProxyEvent) => {
  // We need to decode the even body which comes as base64 encoded
  const eventClone = { ...event, body: base64Decode(event.body || '') };
  return multipart.parse(eventClone, false) as T;
};

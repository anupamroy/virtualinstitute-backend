import { APIGatewayProxyEvent } from 'aws-lambda';
import { EVENT_HEADERS } from '../../constants/common-vars';
import { CONFIG } from '../../constants/config';
const parser = require('lambda-multipart-parser');

export const requestValidator = (object: any, classInstance: any) =>
  object &&
  Object.keys(classInstance).every((key) => object[key] !== undefined);

export const checkIfNTATokenValid = (event: APIGatewayProxyEvent) => {
  return (
    event.headers[EVENT_HEADERS.ntaAPIPasskey] ===
    CONFIG.CognitoConfig.ntaAPIPasskey
  );
};

export const parseMultiPart = async <T>(event: APIGatewayProxyEvent) => {
  const result = await parser.parse(event);
  result.files.forEach((file: any) => (result[file.fieldname] = file));
  delete result.files;
  return result as T;
};

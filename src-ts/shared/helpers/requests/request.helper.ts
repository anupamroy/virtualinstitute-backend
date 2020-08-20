import { APIGatewayProxyEvent } from 'aws-lambda';
import { REQUEST_HEADERS, CognitoConfig } from '../../constants/common-vars';
const parser = require('lambda-multipart-parser');

export const requestValidator = (object: any, classInstance: any) =>
  object &&
  Object.keys(classInstance).every((key) => object[key] !== undefined);

export const checkIfNTATokenValid = (event: APIGatewayProxyEvent) => {
  return (
    event.headers[REQUEST_HEADERS.ntaAPIPasskey] === CognitoConfig.ntaAPIPasskey
  );
};

export const parseMultiPart = async <T>(event: APIGatewayProxyEvent) => {
  const result = await parser.parse(event);
  result.files.forEach((file: any) => (result[file.fieldname] = file));
  delete result.files;
  return result as T;
};

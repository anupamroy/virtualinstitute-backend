import { APIGatewayProxyEvent } from 'aws-lambda';
import { REQUEST_HEADERS, CognitoConfig } from '../../constants/common-vars';
const multipart = require('aws-lambda-multipart-parser');

export const requestValidator = (object: any, classInstance: any) =>
  object && Object.keys(classInstance).every((key) => object[key]);

export const checkIfNTATokenValid = (event: APIGatewayProxyEvent) => {
  return (
    event.headers[REQUEST_HEADERS.ntaAPIPasskey] === CognitoConfig.ntaAPIPasskey
  );
};

export const parseMultiPart = (event: APIGatewayProxyEvent) => {
  const retval = multipart.parse(event, true);
  console.log('------------parsed----------------');
  return retval;
};

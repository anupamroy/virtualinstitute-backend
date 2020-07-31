import { APIGatewayProxyEvent } from 'aws-lambda';
import { REQUEST_HEADERS, CognitoConfig } from '../../constants/common-vars';
import {
  unauthorisedAccessResponse,
  keysMissingResponse,
} from '../response.helper';

export const requestValidator = (object: any, classInstance: any) =>
  object && Object.keys(classInstance).every((key) => object[key]);

export const checkIfNTATokenValid = (event: APIGatewayProxyEvent) =>
  event.headers[REQUEST_HEADERS.ntaAPIPasskey] === CognitoConfig.ntaAPIPasskey;

export const NTATokenGuard = (
  event: APIGatewayProxyEvent,
  callback: Function
) =>
  checkIfNTATokenValid(event) ? callback(event) : unauthorisedAccessResponse();

export const requestValidatorGuard = (
  body: any,
  classInstance: any,
  callback: Function,
  callbackParams: any
) =>
  body && requestValidator(body, classInstance)
    ? callback(callbackParams)
    : keysMissingResponse();

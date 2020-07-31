import { APIGatewayProxyEvent } from "aws-lambda";
import { checkIfNTATokenValid, requestValidator } from "./request.helper";
import { unauthorisedAccessResponse, keysMissingResponse } from "../response.helper";

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

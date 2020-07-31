import { APIGatewayProxyEvent } from "aws-lambda";
import { checkIfNTATokenValid, requestValidator } from "./request.helper";
import {
  unauthorisedAccessResponse,
  keysMissingResponse,
} from "../response.helper";

export const NTATokenGuard = async (
  event: APIGatewayProxyEvent,
  callback: Function
) => {
  return checkIfNTATokenValid(event)
    ? await callback(event)
    : unauthorisedAccessResponse();
};

export const requestValidatorGuard = async (
  body: any,
  classInstance: any,
  callback: Function,
  callbackParams: any[]
) =>
  body && requestValidator(body, classInstance)
    ? async () => await callback(...callbackParams)
    : () => keysMissingResponse();

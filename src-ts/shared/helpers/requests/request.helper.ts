import { APIGatewayProxyEvent } from "aws-lambda";
import { REQUEST_HEADERS, CognitoConfig } from "../../constants/common-vars";

export const requestValidator = (object: any, classInstance: any) =>
  object && Object.keys(classInstance).every((key) => object[key]);

export const checkIfNTATokenValid = (event: APIGatewayProxyEvent) => {
  console.log(
    "event.headers[REQUEST_HEADERS.ntaAPIPasskey]",
    event.headers[REQUEST_HEADERS.ntaAPIPasskey]
  );
  return (
    event.headers[REQUEST_HEADERS.ntaAPIPasskey] === CognitoConfig.ntaAPIPasskey
  );
};

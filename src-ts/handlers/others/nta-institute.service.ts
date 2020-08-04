// Handler helpers

import { APIGatewayProxyEvent } from "aws-lambda";
import { cognitoActions } from "../../shared/helpers/cognito/cognito.actions";
import { createResponse } from "../../shared/helpers/handler";
import {
  APIResponse,
} from "../../shared/model/request-method.model";

export const createStudent = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.addStudent(event);

export const checkToken = async (event: APIGatewayProxyEvent) => {
  return createResponse(200, new APIResponse(false, "", event));
};

export const newPasswordChallenge = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.setNTAPassword(event);

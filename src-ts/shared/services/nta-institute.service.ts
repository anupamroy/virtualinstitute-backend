// Handler helpers

import { APIGatewayProxyEvent } from 'aws-lambda';
import { cognitoActions } from '../helpers/cognito/cognito.actions';
import { createResponse, parseBody } from '../helpers/handler-common';
import { APIResponse } from '../model/request-method.model';
import { requestValidatorGuard } from '../helpers/requests/guard';
import { CreateInstituteUserRequest } from '../model/request.model';

export const checkToken = async (event: APIGatewayProxyEvent) => {
  return createResponse(200, new APIResponse(false, '', event));
};

export const CreateInstituteUser = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateInstituteUserRequest>(event.body);
  const result = await requestValidatorGuard(
    body,
    new CreateInstituteUserRequest(),
    cognitoActions.addInstituteUserFunction,
    [body]
  );
  return await result();
};
export const DeleteInstituteUser = (event: APIGatewayProxyEvent) => {};

import {
  requestValidatorGuard,
  NTATokenGuard,
} from '../../shared/helpers/requests/guard';
import {
  createNTAAuthorityFunction,
  listNTAAuthorityFunction,
  listAllNTAAuthoritiesFunction,
} from '../functions/nta-authority.functions';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { parseBody } from '../../shared/helpers/handler-common';
import { CreateNTAAuthorityRequest } from '../../shared/model/request-method.model';
import { cognitoActions } from '../../shared/helpers/cognito/cognito.actions';
import { parseMultiPart } from '../helpers/requests/request.helper';

export const createNTAAuthority = async (event: APIGatewayProxyEvent) => {
  const body = await parseBody<CreateNTAAuthorityRequest>(event.body);
  console.log(body);
  console.log(typeof body);
  const result = await requestValidatorGuard(
    body,
    new CreateNTAAuthorityRequest(),
    createNTAAuthorityFunction,
    [body]
  );
  return await result();
};

export const listNTAAuthority = async (event: APIGatewayProxyEvent) => {
  return await NTATokenGuard(
    event,
    async () => await listNTAAuthorityFunction(event.pathParameters?.id + '')
  );
};

export const listAllNTAAuthorities = async (event: APIGatewayProxyEvent) => {
  return await NTATokenGuard(
    event,
    async () => await listAllNTAAuthoritiesFunction()
  );
};

export const createNTAUser = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.addNTAUser(event);

export const deleteNTAUser = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.deleteNTAUser(event);

// This is no longer required
export const newPasswordChallenge = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.setNTAPassword(event);

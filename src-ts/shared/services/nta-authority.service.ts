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
  // console.log(event.body);
  // const body = event.body as any;
  // console.log(body);
  // console.log(event);
  console.log(parseMultiPart(event));
  // const body = parseBody<CreateNTAAuthorityRequest>(event.body);
  // return await NTATokenGuard(
  //   event,
  //   await requestValidatorGuard(
  //     body,
  //     new CreateNTAAuthorityRequest(),
  //     createNTAAuthorityFunction,
  //     [body]
  //   )
  // );
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

import {
  requestValidatorGuard,
  NTATokenGuard,
} from "../shared/helpers/requests/guard";
import {
  createNTAAuthorityFunction,
  listNTAAuthorityFunction,
} from "../shared/functions/nta.functions";
import { APIGatewayProxyEvent } from "aws-lambda";
import { parseBody } from "../shared/helpers/handler";
import {
  CreateNTAAuthorityRequest,
} from "../shared/model/request-method.model";
import { cognitoActions } from "../shared/helpers/cognito/cognito.actions";

export const createNTAAuthority = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateNTAAuthorityRequest>(event.body);
  return await NTATokenGuard(
    event,
    await requestValidatorGuard(
      body,
      new CreateNTAAuthorityRequest(),
      createNTAAuthorityFunction,
      [body]
    )
  );
};

export const listNTAAuthority = async (event: APIGatewayProxyEvent) => {
  return await NTATokenGuard(
    event,
    async () => await listNTAAuthorityFunction()
  );
};

export const createNTAUser = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.addNTAUser(event);

export const deleteNTAUser = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.deleteNTA(event);


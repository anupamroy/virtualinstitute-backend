import {
  requestValidatorGuard,
  NTATokenGuard,
} from "../../shared/helpers/requests/guard";
import {
  createOrganizationFunction,
  listNTAAuthorityFunction,
  listAllNTAAuthoritiesFunction,
  createOrgAddressFunction,
  createOrgPhoneNumberFunction,
  createOrgEmailFunction,
  createOrgRegistrationFunction,
  createOrgDocumentFunction,
  createOrgSettingsFunction,
  createOrgAffiliationFunction,
} from "../functions/nta-authority.functions";
import { APIGatewayProxyEvent } from "aws-lambda";
import { parseBody } from "../../shared/helpers/handler-common";
import {
  CreateOrganizationRequest,
  CreateOrgAddressRequest,
  CreateOrgPhoneNumberRequest,
  CreateOrgEmailRequest,
  CreateOrgRegistrationRequest,
  CreateOrgDocumentRequest,
  CreateOrgSettingsRequest,
  CreateOrgAffiliationRequest,
} from "../../shared/model/request-method.model";
import { cognitoActions } from "../../shared/helpers/cognito/cognito.actions";

export const createOrganization = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateOrganizationRequest>(event.body);
  const result = await requestValidatorGuard(
    body,
    new CreateOrganizationRequest(),
    createOrganizationFunction,
    [body]
  );
  return await result();
};

export const CreateOrgAddress = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateOrgAddressRequest>(event.body);
  const result = await requestValidatorGuard(
    body,
    new CreateOrgAddressRequest(),
    createOrgAddressFunction,
    [body]
  );
  return await result();
};
export const CreateOrgPhoneNumber = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateOrgPhoneNumberRequest>(event.body);
  const result = await requestValidatorGuard(
    body,
    new CreateOrgPhoneNumberRequest(),
    createOrgPhoneNumberFunction,
    [body]
  );
  return await result();
};
export const CreateOrgEmailId = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateOrgEmailRequest>(event.body);
  const result = await requestValidatorGuard(
    body,
    new CreateOrgEmailRequest(),
    createOrgEmailFunction,
    [body]
  );
  return await result();
};
export const CreateOrgRegistration = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateOrgRegistrationRequest>(event.body);
  const result = await requestValidatorGuard(
    body,
    new CreateOrgRegistrationRequest(),
    createOrgRegistrationFunction,
    [body]
  );
  return await result();
};
export const CreateOrgDocument = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateOrgDocumentRequest>(event.body);
  const result = await requestValidatorGuard(
    body,
    new CreateOrgDocumentRequest(),
    createOrgDocumentFunction,
    [body]
  );
  return await result();
};
export const CreateOrgSettings = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateOrgSettingsRequest>(event.body);
  const result = await requestValidatorGuard(
    body,
    new CreateOrgSettingsRequest(),
    createOrgSettingsFunction,
    [body]
  );
  return await result();
};
export const CreateOrgAffiliation = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateOrgAffiliationRequest>(event.body);
  const result = await requestValidatorGuard(
    body,
    new CreateOrgAffiliationRequest(),
    createOrgAffiliationFunction,
    [body]
  );
  return await result();
};

export const listNTAAuthority = async (event: APIGatewayProxyEvent) => {
  return await NTATokenGuard(
    event,
    async () => await listNTAAuthorityFunction(event.pathParameters?.id + "")
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

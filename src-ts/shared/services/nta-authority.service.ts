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
  createInstituteMasterUserFunction,
  createOrganizationMasterUserFunction,
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
import {
  CreateInstituteUserRequest,
  CreatePersonRequest,
} from "../model/request.model";

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
  const orgId = event.pathParameters?.orgId;
  const result = await requestValidatorGuard(
    body,
    new CreateOrgAddressRequest(),
    createOrgAddressFunction,
    [body, orgId]
  );
  return await result();
};
export const CreateOrgPhoneNumber = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateOrgPhoneNumberRequest>(event.body);
  const orgId = event.pathParameters?.orgId;
  const result = await requestValidatorGuard(
    body,
    new CreateOrgPhoneNumberRequest(),
    createOrgPhoneNumberFunction,
    [body, orgId]
  );
  return await result();
};
export const CreateOrgEmailId = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateOrgEmailRequest>(event.body);
  const orgId = event.pathParameters?.orgId;
  const result = await requestValidatorGuard(
    body,
    new CreateOrgEmailRequest(),
    createOrgEmailFunction,
    [body, orgId]
  );
  return await result();
};
export const CreateOrgRegistration = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateOrgRegistrationRequest>(event.body);
  const orgId = event.pathParameters?.orgId;
  const result = await requestValidatorGuard(
    body,
    new CreateOrgRegistrationRequest(),
    createOrgRegistrationFunction,
    [body, orgId]
  );
  return await result();
};
export const CreateOrgDocument = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateOrgDocumentRequest>(event.body);
  const orgId = event.pathParameters?.orgId;
  const result = await requestValidatorGuard(
    body,
    new CreateOrgDocumentRequest(),
    createOrgDocumentFunction,
    [body, orgId]
  );
  return await result();
};
export const CreateOrgSettings = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateOrgSettingsRequest>(event.body);
  const orgId = event.pathParameters?.orgId;
  const result = await requestValidatorGuard(
    body,
    new CreateOrgSettingsRequest(),
    createOrgSettingsFunction,
    [body, orgId]
  );
  return await result();
};
export const CreateOrgAffiliation = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateOrgAffiliationRequest>(event.body);
  const orgId = event.pathParameters?.orgId;
  const result = await requestValidatorGuard(
    body,
    new CreateOrgAffiliationRequest(),
    createOrgAffiliationFunction,
    [body, orgId]
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

// export const createNTAUser = async (event: APIGatewayProxyEvent) =>
//   await cognitoActions.addNTAUser(event);

export const createOrganizationMasterUser = async (
  event: APIGatewayProxyEvent
) => {
  const body = parseBody<CreatePersonRequest>(event.body);
  const orgId = event.pathParameters?.orgId;
  const result = await requestValidatorGuard(
    body,
    new CreatePersonRequest(),
    createOrganizationMasterUserFunction,
    [body, orgId]
  );
  return await result();
};

export const deleteNTAUser = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.deleteNTAUser(event);

export const createInstituteMasterUser = async (
  event: APIGatewayProxyEvent
) => {
  const body = parseBody<CreateInstituteUserRequest>(event.body);
  const orgId = event.pathParameters?.orgId;
  const result = await requestValidatorGuard(
    body,
    new CreateOrganizationRequest(),
    createInstituteMasterUserFunction,
    [body, orgId]
  );
  return await result();
};

// This is no longer required
export const newPasswordChallenge = async (event: APIGatewayProxyEvent) =>
  await cognitoActions.setNTAPassword(event);

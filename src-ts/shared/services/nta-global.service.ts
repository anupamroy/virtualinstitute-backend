import { APIGatewayEvent } from 'aws-lambda';
import {
  NTATokenGuard,
  requestValidatorGuard,
} from '../helpers/requests/guard';
import {
  createInstituteTypeFunction,
  createAddressTextFunction,
  createPhoneTextFunction,
  createPhoneAssociatedPostFunction,
  createPhoneTypeFunction,
  createEmailTextFunction,
  createEmailAssociatedPostFunction,
  createEmailTypeFunction,
  createSocialMediaFunction,
  createRegistrationTypeFunction,
  createRegistrationDocumentTypeFunction,
  createInstitutionAffiliationGradeFunction,
  createInstitutionAffiliationStatusFunction,
  createInstitutionAffiliationTypeFunction,
  createInstitutionAffiliationAuthorityFunction,
} from '../functions/nta-global.functions';
import {
  GlobalMasterCreateRequest,
  SocialMediaMasterCreateRequest,
} from '../model/request.model';
import { parseBody } from '../helpers/handler-common';

export const createInstituteType = (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createInstituteTypeFunction,
        [body]
      )
  );
};
export const createAddressText = (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createAddressTextFunction,
        [body]
      )
  );
};
export const createPhoneText = (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createPhoneTextFunction,
        [body]
      )
  );
};
export const createPhoneAssociatedPost = (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createPhoneAssociatedPostFunction,
        [body]
      )
  );
};
export const createPhoneType = (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createPhoneTypeFunction,
        [body]
      )
  );
};
export const createEmailText = (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createEmailTextFunction,
        [body]
      )
  );
};
export const createEmailAssociatedPost = (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createEmailAssociatedPostFunction,
        [body]
      )
  );
};
export const createEmailType = (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createEmailTypeFunction,
        [body]
      )
  );
};
export const createSocialMedia = (event: APIGatewayEvent) => {
  const body = parseBody<SocialMediaMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new SocialMediaMasterCreateRequest(),
        createSocialMediaFunction,
        [body]
      )
  );
};
export const createRegistrationType = (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createRegistrationTypeFunction,
        [body]
      )
  );
};
export const createRegistrationDocumentType = (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createRegistrationDocumentTypeFunction,
        [body]
      )
  );
};
export const createInstitutionAffiliationGrade = (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createInstitutionAffiliationGradeFunction,
        [body]
      )
  );
};
export const createInstitutionAffiliationStatus = (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createInstitutionAffiliationStatusFunction,
        [body]
      )
  );
};
export const createInstitutionAffiliationType = (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createInstitutionAffiliationTypeFunction,
        [body]
      )
  );
};
export const createInstitutionAffiliationAuthority = (
  event: APIGatewayEvent
) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
    async () =>
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createInstitutionAffiliationAuthorityFunction,
        [body]
      )
  );
};
export const listInstituteType = (event: APIGatewayEvent) => {};
export const listAddressText = (event: APIGatewayEvent) => {};
export const listPhoneText = (event: APIGatewayEvent) => {};
export const listPhoneAssociatedPost = (event: APIGatewayEvent) => {};
export const listPhoneType = (event: APIGatewayEvent) => {};
export const listEmailText = (event: APIGatewayEvent) => {};
export const listEmailAssociatedPost = (event: APIGatewayEvent) => {};
export const listEmailType = (event: APIGatewayEvent) => {};
export const listSocialMedia = (event: APIGatewayEvent) => {};
export const listRegistrationType = (event: APIGatewayEvent) => {};
export const listRegistrationDocumentType = (event: APIGatewayEvent) => {};
export const listInstitutionAffiliationGrade = (event: APIGatewayEvent) => {};
export const listInstitutionAffiliationStatus = (event: APIGatewayEvent) => {};
export const listInstitutionAffiliationType = (event: APIGatewayEvent) => {};
export const listInstitutionAffiliationAuthority = (
  event: APIGatewayEvent
) => {};

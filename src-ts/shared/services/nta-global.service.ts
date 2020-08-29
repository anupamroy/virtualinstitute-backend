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

export const createInstituteType = async (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return await NTATokenGuard(
    event,
    await requestValidatorGuard(
      body,
      new GlobalMasterCreateRequest(),
      createInstituteTypeFunction,
      [body]
    )
  );
};
export const createAddressText = async (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createAddressTextFunction,
        [body]
      )
  );
};
export const createPhoneText = async (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createPhoneTextFunction,
        [body]
      )
  );
};
export const createPhoneAssociatedPost = async (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createPhoneAssociatedPostFunction,
        [body]
      )
  );
};
export const createPhoneType = async (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createPhoneTypeFunction,
        [body]
      )
  );
};
export const createEmailText = async (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createEmailTextFunction,
        [body]
      )
  );
};
export const createEmailAssociatedPost = async (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createEmailAssociatedPostFunction,
        [body]
      )
  );
};
export const createEmailType = async (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createEmailTypeFunction,
        [body]
      )
  );
};
export const createSocialMedia = async (event: APIGatewayEvent) => {
  const body = parseBody<SocialMediaMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
      await requestValidatorGuard(
        body,
        new SocialMediaMasterCreateRequest(),
        createSocialMediaFunction,
        [body]
      )
  );
};
export const createRegistrationType = async (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createRegistrationTypeFunction,
        [body]
      )
  );
};
export const createRegistrationDocumentType = async (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createRegistrationDocumentTypeFunction,
        [body]
      )
  );
};
export const createInstitutionAffiliationGrade = async (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createInstitutionAffiliationGradeFunction,
        [body]
      )
  );
};
export const createInstitutionAffiliationStatus = async (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createInstitutionAffiliationStatusFunction,
        [body]
      )
  );
};
export const createInstitutionAffiliationType = async (event: APIGatewayEvent) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createInstitutionAffiliationTypeFunction,
        [body]
      )
  );
};
export const createInstitutionAffiliationAuthority = async (
  event: APIGatewayEvent
) => {
  const body = parseBody<GlobalMasterCreateRequest>(event.body);
  return NTATokenGuard(
    event,
      await requestValidatorGuard(
        body,
        new GlobalMasterCreateRequest(),
        createInstitutionAffiliationAuthorityFunction,
        [body]
      )
  );
};
export const listInstituteType = async (event: APIGatewayEvent) => {};
export const listAddressText = async (event: APIGatewayEvent) => {};
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

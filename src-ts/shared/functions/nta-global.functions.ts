import {
  GlobalMasterCreateRequest,
  SocialMediaMasterCreateRequest,
} from '../model/request.model';
import {
  DBInstititutionTypeMaster,
  DBAddressTextMaster,
  DBPhoneTextMaster,
  DBPhoneAssociatedPostMaster,
  DBPhoneTypeMaster,
  DBEmailTextMaster,
  DBEmailAssociatedPostMaster,
  DBEmailTypeMaster,
  DBSocialMediaMaster,
  DBRegistrationTypeMaster,
  DBRegistrationDocumentTypeMaster,
  DBInstitutionAffiliationGradeMaster,
  DBInstitutionAffiliationStatusMaster,
  DBInstitutionAffiliationTypeMaster,
  DBInstitutionAffiliationAuthorityMaster,
} from '../model/DB/global-masters.DB.model';
import {
  processDynamoDBResponse,
  DynamoDBActions,
} from '../helpers/db-handler';
import { CONFIG } from '../constants/config';

export const createInstituteTypeFunction = (
  body: GlobalMasterCreateRequest
) => {
  const instituteType = new DBInstititutionTypeMaster();
  instituteType.name = body.name;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(
      instituteType,
      CONFIG.TABLE_NAMES.globalMastersTable
    )
  );
};

export const createAddressTextFunction = (body: GlobalMasterCreateRequest) => {
  const addressText = new DBAddressTextMaster();
  addressText.name = body.name;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(addressText, CONFIG.TABLE_NAMES.globalMastersTable)
  );
};

export const createPhoneTextFunction = (body: GlobalMasterCreateRequest) => {
  const phoneText = new DBPhoneTextMaster();
  phoneText.name = body.name;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(phoneText, CONFIG.TABLE_NAMES.globalMastersTable)
  );
};

export const createPhoneAssociatedPostFunction = (
  body: GlobalMasterCreateRequest
) => {
  const phoneAssociatedPost = new DBPhoneAssociatedPostMaster();
  phoneAssociatedPost.name = body.name;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(
      phoneAssociatedPost,
      CONFIG.TABLE_NAMES.globalMastersTable
    )
  );
};

export const createPhoneTypeFunction = (body: GlobalMasterCreateRequest) => {
  const phoneType = new DBPhoneTypeMaster();
  phoneType.name = body.name;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(phoneType, CONFIG.TABLE_NAMES.globalMastersTable)
  );
};

export const createEmailTextFunction = (body: GlobalMasterCreateRequest) => {
  const emailText = new DBEmailTextMaster();
  emailText.name = body.name;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(emailText, CONFIG.TABLE_NAMES.globalMastersTable)
  );
};

export const createEmailAssociatedPostFunction = (
  body: GlobalMasterCreateRequest
) => {
  const emailAssociatedPost = new DBEmailAssociatedPostMaster();
  emailAssociatedPost.name = body.name;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(
      emailAssociatedPost,
      CONFIG.TABLE_NAMES.globalMastersTable
    )
  );
};

export const createEmailTypeFunction = (body: GlobalMasterCreateRequest) => {
  const emailType = new DBEmailTypeMaster();
  emailType.name = body.name;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(emailType, CONFIG.TABLE_NAMES.globalMastersTable)
  );
};

export const createSocialMediaFunction = (
  body: SocialMediaMasterCreateRequest
) => {
  const socialMediaType = new DBSocialMediaMaster();
  socialMediaType.name = body.name;
  socialMediaType.icon = body.icon;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(
      socialMediaType,
      CONFIG.TABLE_NAMES.globalMastersTable
    )
  );
};

export const createRegistrationTypeFunction = (
  body: GlobalMasterCreateRequest
) => {
  const registrationType = new DBRegistrationTypeMaster();
  registrationType.name = body.name;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(
      registrationType,
      CONFIG.TABLE_NAMES.globalMastersTable
    )
  );
};

export const createRegistrationDocumentTypeFunction = (
  body: GlobalMasterCreateRequest
) => {
  const registrationDocumentType = new DBRegistrationDocumentTypeMaster();
  registrationDocumentType.name = body.name;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(
      registrationDocumentType,
      CONFIG.TABLE_NAMES.globalMastersTable
    )
  );
};

export const createInstitutionAffiliationGradeFunction = (
  body: GlobalMasterCreateRequest
) => {
  const institutionAffiliationGrade = new DBInstitutionAffiliationGradeMaster();
  institutionAffiliationGrade.name = body.name;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(
      institutionAffiliationGrade,
      CONFIG.TABLE_NAMES.globalMastersTable
    )
  );
};

export const createInstitutionAffiliationStatusFunction = (
  body: GlobalMasterCreateRequest
) => {
  const instituteAffiliationStatus = new DBInstitutionAffiliationStatusMaster();
  instituteAffiliationStatus.name = body.name;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(
      instituteAffiliationStatus,
      CONFIG.TABLE_NAMES.globalMastersTable
    )
  );
};

export const createInstitutionAffiliationTypeFunction = (
  body: GlobalMasterCreateRequest
) => {
  const instituteAffiliationType = new DBInstitutionAffiliationTypeMaster();
  instituteAffiliationType.name = body.name;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(
      instituteAffiliationType,
      CONFIG.TABLE_NAMES.globalMastersTable
    )
  );
};

export const createInstitutionAffiliationAuthorityFunction = (
  body: GlobalMasterCreateRequest
) => {
  const institutionAffiliationAuthority = new DBInstitutionAffiliationAuthorityMaster();
  institutionAffiliationAuthority.name = body.name;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(
      institutionAffiliationAuthority,
      CONFIG.TABLE_NAMES.globalMastersTable
    )
  );
};

export const listInstituteTypeFunction = () => {};

export const listAddressTextFunction = () => {};

export const listPhoneTextFunction = () => {};

export const listPhoneAssociatedPostFunction = () => {};

export const listPhoneTypeFunction = () => {};

export const listEmailTextFunction = () => {};

export const listEmailAssociatedPostFunction = () => {};

export const listEmailTypeFunction = () => {};

export const listSocialMediaFunction = () => {};

export const listRegistrationTypeFunction = () => {};

export const listRegistrationDocumentTypeFunction = () => {};

export const listInstitutionAffiliationGradeFunction = () => {};

export const listInstitutionAffiliationStatusFunction = () => {};

export const listInstitutionAffiliationTypeFunction = () => {};

export const listInstitutionAffiliationAuthorityFunction = () => {};

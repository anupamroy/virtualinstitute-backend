import { AWSHandler } from '../shared/helpers/handler-common';
import {
  createInstituteType,
  createAddressText,
  createPhoneText,
  createPhoneAssociatedPost,
  createPhoneType,
  createEmailText,
  createEmailAssociatedPost,
  createEmailType,
  createSocialMedia,
  createRegistrationType,
  createRegistrationDocumentType,
  createInstitutionAffiliationGrade,
  createInstitutionAffiliationStatus,
  createInstitutionAffiliationType,
  createInstitutionAffiliationAuthority,
  listInstituteType,
  listAddressText,
  listPhoneText,
  listPhoneAssociatedPost,
  listPhoneType,
  listEmailText,
  listEmailAssociatedPost,
  listEmailType,
  listSocialMedia,
  listRegistrationType,
  listRegistrationDocumentType,
  listInstitutionAffiliationGrade,
  listInstitutionAffiliationStatus,
  listInstitutionAffiliationType,
  listInstitutionAffiliationAuthority,
} from '../shared/services/nta-global.service';

const createInstituteTypeHandler = AWSHandler('POST', createInstituteType);
const createAddressTextHandler = AWSHandler('POST', createAddressText);
const createPhoneTextHandler = AWSHandler('POST', createPhoneText);
const createPhoneAssociatedPostHandler = AWSHandler(
  'POST',
  createPhoneAssociatedPost
);
const createPhoneTypeHandler = AWSHandler('POST', createPhoneType);
const createEmailTextHandler = AWSHandler('POST', createEmailText);
const createEmailAssociatedPostHandler = AWSHandler(
  'POST',
  createEmailAssociatedPost
);
const createEmailTypeHandler = AWSHandler('POST', createEmailType);
const createSocialMediaHandler = AWSHandler('POST', createSocialMedia);
const createRegistrationTypeHandler = AWSHandler(
  'POST',
  createRegistrationType
);
const createRegistrationDocumentTypeHandler = AWSHandler(
  'POST',
  createRegistrationDocumentType
);
const createInstitutionAffiliationGradeHandler = AWSHandler(
  'POST',
  createInstitutionAffiliationGrade
);
const createInstitutionAffiliationStatusHandler = AWSHandler(
  'POST',
  createInstitutionAffiliationStatus
);
const createInstitutionAffiliationTypeHandler = AWSHandler(
  'POST',
  createInstitutionAffiliationType
);
const createInstitutionAffiliationAuthorityHandler = AWSHandler(
  'POST',
  createInstitutionAffiliationAuthority
);
const listInstituteTypeHandler = AWSHandler('GET', listInstituteType);
const listAddressTextHandler = AWSHandler('GET', listAddressText);
const listPhoneTextHandler = AWSHandler('GET', listPhoneText);
const listPhoneAssociatedPostHandler = AWSHandler(
  'GET',
  listPhoneAssociatedPost
);
const listPhoneTypeHandler = AWSHandler('GET', listPhoneType);
const listEmailTextHandler = AWSHandler('GET', listEmailText);
const listEmailAssociatedPostHandler = AWSHandler(
  'GET',
  listEmailAssociatedPost
);
const listEmailTypeHandler = AWSHandler('GET', listEmailType);
const listSocialMediaHandler = AWSHandler('GET', listSocialMedia);
const listRegistrationTypeHandler = AWSHandler('GET', listRegistrationType);
const listRegistrationDocumentTypeHandler = AWSHandler(
  'GET',
  listRegistrationDocumentType
);
const listInstitutionAffiliationGradeHandler = AWSHandler(
  'GET',
  listInstitutionAffiliationGrade
);
const listInstitutionAffiliationStatusHandler = AWSHandler(
  'GET',
  listInstitutionAffiliationStatus
);
const listInstitutionAffiliationTypeHandler = AWSHandler(
  'GET',
  listInstitutionAffiliationType
);
const listInstitutionAffiliationAuthorityHandler = AWSHandler(
  'GET',
  listInstitutionAffiliationAuthority
);

export {
  createInstituteTypeHandler,
  createAddressTextHandler,
  createPhoneTextHandler,
  createPhoneAssociatedPostHandler,
  createPhoneTypeHandler,
  createEmailTextHandler,
  createEmailAssociatedPostHandler,
  createEmailTypeHandler,
  createSocialMediaHandler,
  createRegistrationTypeHandler,
  createRegistrationDocumentTypeHandler,
  createInstitutionAffiliationGradeHandler,
  createInstitutionAffiliationStatusHandler,
  createInstitutionAffiliationTypeHandler,
  createInstitutionAffiliationAuthorityHandler,
  listInstituteTypeHandler,
  listAddressTextHandler,
  listPhoneTextHandler,
  listPhoneAssociatedPostHandler,
  listPhoneTypeHandler,
  listEmailTextHandler,
  listEmailAssociatedPostHandler,
  listEmailTypeHandler,
  listSocialMediaHandler,
  listRegistrationTypeHandler,
  listRegistrationDocumentTypeHandler,
  listInstitutionAffiliationGradeHandler,
  listInstitutionAffiliationStatusHandler,
  listInstitutionAffiliationTypeHandler,
  listInstitutionAffiliationAuthorityHandler,
};

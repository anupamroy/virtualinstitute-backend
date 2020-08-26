import { AWSHandler } from '../shared/helpers/handler-common';
import {
  listAllNTAAuthorities,
  deleteNTAUser,
  newPasswordChallenge,
  CreateOrgAddress,
  CreateOrgPhoneNumber,
  CreateOrgEmailId,
  CreateOrgRegistration,
  CreateOrgDocument,
  CreateOrgSettings,
  CreateOrgAffiliation,
  createOrganizationMasterUser,
  GetOrgOfCurrentUser,
  GetCurrentUserDetails,
} from '../shared/services/nta-authority.service';
import {
  createOrganization,
  GetOrganizationById,
} from '../shared/services/nta-authority.service';
import { checkToken } from '../shared/services/nta-institute.service';
import { createInstituteMasterUser } from '../shared/services/nta-authority.service';

// NTA Authority
const listAllNTAAuthoritiesHandler = AWSHandler('GET', listAllNTAAuthorities);
const GetOrganizationByIdHandler = AWSHandler('GET', GetOrganizationById);
const CreateOrganizationHandler = AWSHandler('POST', createOrganization);

const GetOrgOfCurrentUserHandler = AWSHandler('GET', GetOrgOfCurrentUser);

const CreateOrgAddressHandler = AWSHandler('POST', CreateOrgAddress);
const CreateOrgPhoneNumberHandler = AWSHandler('POST', CreateOrgPhoneNumber);
const CreateOrgEmailIdHandler = AWSHandler('POST', CreateOrgEmailId);
const CreateOrgRegistrationHandler = AWSHandler('POST', CreateOrgRegistration);
const CreateOrgDocumentHandler = AWSHandler('POST', CreateOrgDocument);
const CreateOrgSettingsHandler = AWSHandler('POST', CreateOrgSettings);
const CreateOrgAffiliationHandler = AWSHandler('POST', CreateOrgAffiliation);

const CreateOrganizationMasterUserHandler = AWSHandler(
  'POST',
  createOrganizationMasterUser
);
const deleteNTAUserHandler = AWSHandler('DELETE', deleteNTAUser);

const CreateInstituteMasterUserHandler = AWSHandler(
  'POST',
  createInstituteMasterUser
);

const checkTokenHandler = AWSHandler('GET', checkToken);
const newPasswordChallengeHandler = AWSHandler('POST', newPasswordChallenge);

const GetCurrentUserDetailsHandler = AWSHandler('GET', GetCurrentUserDetails);

export {
  CreateOrganizationHandler,
  GetOrganizationByIdHandler as listNTAAuthorityHandler,
  listAllNTAAuthoritiesHandler,
  CreateOrganizationMasterUserHandler,
  deleteNTAUserHandler,
  checkTokenHandler,
  newPasswordChallengeHandler,
  CreateOrgAddressHandler,
  CreateOrgPhoneNumberHandler,
  CreateOrgEmailIdHandler,
  CreateOrgRegistrationHandler,
  CreateOrgDocumentHandler,
  CreateOrgSettingsHandler,
  CreateOrgAffiliationHandler,
  CreateInstituteMasterUserHandler,
  GetOrgOfCurrentUserHandler,
  GetCurrentUserDetailsHandler,
};

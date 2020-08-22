import { AWSHandler } from '../shared/helpers/handler-common';
import {
  listAllNTAAuthorities,
  createNTAUser,
  deleteNTAUser,
  newPasswordChallenge,
  CreateOrgAddress,
  CreateOrgPhoneNumber,
  CreateOrgEmailId,
  CreateOrgRegistration,
  CreateOrgDocument,
  CreateOrgSettings,
  CreateOrgAffiliation,
} from '../shared/services/nta-authority.service';
import {
  createOrganization,
  listNTAAuthority,
} from '../shared/services/nta-authority.service';
import { checkToken } from '../shared/services/nta-institute.service';
import { createInstituteMasterUser } from '../shared/services/nta-authority.service';

// NTA Authority
const listAllNTAAuthoritiesHandler = AWSHandler('GET', listAllNTAAuthorities);
const listNTAAuthorityHandler = AWSHandler('GET', listNTAAuthority);
const CreateOrganizationHandler = AWSHandler('POST', createOrganization);

const CreateOrgAddressHandler = AWSHandler('POST', CreateOrgAddress);
const CreateOrgPhoneNumberHandler = AWSHandler('POST', CreateOrgPhoneNumber);
const CreateOrgEmailIdHandler = AWSHandler('POST', CreateOrgEmailId);
const CreateOrgRegistrationHandler = AWSHandler('POST', CreateOrgRegistration);
const CreateOrgDocumentHandler = AWSHandler('POST', CreateOrgDocument);
const CreateOrgSettingsHandler = AWSHandler('POST', CreateOrgSettings);
const CreateOrgAffiliationHandler = AWSHandler('POST', CreateOrgAffiliation);

const createNTAUserHandler = AWSHandler('POST', createNTAUser);
const deleteNTAUserHandler = AWSHandler('DELETE', deleteNTAUser);

const CreateInstituteMasterUserHandler = AWSHandler(
  'POST',
  createInstituteMasterUser
);

const checkTokenHandler = AWSHandler('GET', checkToken);
const newPasswordChallengeHandler = AWSHandler('POST', newPasswordChallenge);

export {
  CreateOrganizationHandler,
  listNTAAuthorityHandler,
  listAllNTAAuthoritiesHandler,
  createNTAUserHandler,
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
};

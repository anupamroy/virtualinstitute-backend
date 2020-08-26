"use strict";
exports.__esModule = true;
exports.GetCurrentUserDetailsHandler = exports.GetOrgOfCurrentUserHandler = exports.CreateInstituteMasterUserHandler = exports.CreateOrgAffiliationHandler = exports.CreateOrgSettingsHandler = exports.CreateOrgDocumentHandler = exports.CreateOrgRegistrationHandler = exports.CreateOrgEmailIdHandler = exports.CreateOrgPhoneNumberHandler = exports.CreateOrgAddressHandler = exports.newPasswordChallengeHandler = exports.checkTokenHandler = exports.deleteNTAUserHandler = exports.CreateOrganizationMasterUserHandler = exports.listAllNTAAuthoritiesHandler = exports.listNTAAuthorityHandler = exports.CreateOrganizationHandler = void 0;
var handler_common_1 = require("../shared/helpers/handler-common");
var nta_authority_service_1 = require("../shared/services/nta-authority.service");
var nta_authority_service_2 = require("../shared/services/nta-authority.service");
var nta_institute_service_1 = require("../shared/services/nta-institute.service");
var nta_authority_service_3 = require("../shared/services/nta-authority.service");
// NTA Authority
var listAllNTAAuthoritiesHandler = handler_common_1.AWSHandler('GET', nta_authority_service_1.listAllNTAAuthorities);
exports.listAllNTAAuthoritiesHandler = listAllNTAAuthoritiesHandler;
var GetOrganizationByIdHandler = handler_common_1.AWSHandler('GET', nta_authority_service_2.GetOrganizationById);
exports.listNTAAuthorityHandler = GetOrganizationByIdHandler;
var CreateOrganizationHandler = handler_common_1.AWSHandler('POST', nta_authority_service_2.createOrganization);
exports.CreateOrganizationHandler = CreateOrganizationHandler;
var GetOrgOfCurrentUserHandler = handler_common_1.AWSHandler('GET', nta_authority_service_1.GetOrgOfCurrentUser);
exports.GetOrgOfCurrentUserHandler = GetOrgOfCurrentUserHandler;
var CreateOrgAddressHandler = handler_common_1.AWSHandler('POST', nta_authority_service_1.CreateOrgAddress);
exports.CreateOrgAddressHandler = CreateOrgAddressHandler;
var CreateOrgPhoneNumberHandler = handler_common_1.AWSHandler('POST', nta_authority_service_1.CreateOrgPhoneNumber);
exports.CreateOrgPhoneNumberHandler = CreateOrgPhoneNumberHandler;
var CreateOrgEmailIdHandler = handler_common_1.AWSHandler('POST', nta_authority_service_1.CreateOrgEmailId);
exports.CreateOrgEmailIdHandler = CreateOrgEmailIdHandler;
var CreateOrgRegistrationHandler = handler_common_1.AWSHandler('POST', nta_authority_service_1.CreateOrgRegistration);
exports.CreateOrgRegistrationHandler = CreateOrgRegistrationHandler;
var CreateOrgDocumentHandler = handler_common_1.AWSHandler('POST', nta_authority_service_1.CreateOrgDocument);
exports.CreateOrgDocumentHandler = CreateOrgDocumentHandler;
var CreateOrgSettingsHandler = handler_common_1.AWSHandler('POST', nta_authority_service_1.CreateOrgSettings);
exports.CreateOrgSettingsHandler = CreateOrgSettingsHandler;
var CreateOrgAffiliationHandler = handler_common_1.AWSHandler('POST', nta_authority_service_1.CreateOrgAffiliation);
exports.CreateOrgAffiliationHandler = CreateOrgAffiliationHandler;
var CreateOrganizationMasterUserHandler = handler_common_1.AWSHandler('POST', nta_authority_service_1.createOrganizationMasterUser);
exports.CreateOrganizationMasterUserHandler = CreateOrganizationMasterUserHandler;
var deleteNTAUserHandler = handler_common_1.AWSHandler('DELETE', nta_authority_service_1.deleteNTAUser);
exports.deleteNTAUserHandler = deleteNTAUserHandler;
var CreateInstituteMasterUserHandler = handler_common_1.AWSHandler('POST', nta_authority_service_3.createInstituteMasterUser);
exports.CreateInstituteMasterUserHandler = CreateInstituteMasterUserHandler;
var checkTokenHandler = handler_common_1.AWSHandler('GET', nta_institute_service_1.checkToken);
exports.checkTokenHandler = checkTokenHandler;
var newPasswordChallengeHandler = handler_common_1.AWSHandler('POST', nta_authority_service_1.newPasswordChallenge);
exports.newPasswordChallengeHandler = newPasswordChallengeHandler;
var GetCurrentUserDetailsHandler = handler_common_1.AWSHandler('GET', nta_authority_service_1.GetCurrentUserDetails);
exports.GetCurrentUserDetailsHandler = GetCurrentUserDetailsHandler;

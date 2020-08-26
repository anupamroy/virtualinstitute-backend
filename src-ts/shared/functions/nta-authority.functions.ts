import { NTA, NTAUser } from '../model/DB/nta.DB.model';
import {
  DynamoDBActions,
  processDynamoDBResponse,
} from '../helpers/db-handler';
import { TABLE_NAMES } from '../constants/common-vars';
import {
  CreateOrganizationRequest,
  CreateOrgPhoneNumberRequest,
  CreateOrgEmailRequest,
  CreateOrgAddressRequest,
  CreateOrgRegistrationRequest,
  CreateOrgDocumentRequest,
  CreateOrgSettingsRequest,
  CreateOrgAffiliationRequest,
  CreateOrgSubscriptionRequest,
  FileMetaData,
} from '../model/request-method.model';
import {
  getContentsByType,
  getCognitoUserFromToken,
  getFileExtension,
  CreateS3FolderStructure,
  scanItemById,
} from '../helpers/general.helpers';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { ObjectId } from '../model/DB/imports/types.DB.model';
import {
  DBOrganization,
  DBOrgPhone,
  DBOrgEmail,
  DBORGAddress,
  DBOrgRegistration,
  DBOrgSettings,
  DBOrgAffiliation,
  DBOrgDocument,
  DBOrgSubscription,
} from '../model/DB/org.DB.model';
import { FileUrlObject } from '../model/response.model';
import {
  CreateInstituteUserRequest,
  CreatePersonRequest,
} from '../model/request.model';
import { cognitoActions } from '../helpers/cognito/cognito.actions';
import { InstituteUser } from '../model/DB/institute.DB.model';
import {
  setValuesInOrg,
  setValuesInOrgAddress,
  setValuesInOrgPhone,
  setValesInOrgEmail,
  setValuesInOrgRegistration,
  setValuesInOrgDocument,
  setValuesInOrgSettings,
  setValuesInOrgSubscription,
  setValuesInOrgAffiliation,
} from '../transforms/nta-authority.transform';
import { createErrorResponse } from '../helpers/handler-common';
import { getParentItemById } from './nta-masters.functions';
import { getOrgItemById } from '../helpers/general.helpers';

// *Create NTA Authority
export const createOrganizationFunction = async (
  body: CreateOrganizationRequest
) => {
  const organization = new DBOrganization();
  setValuesInOrg(body, organization);
  organization.orgLogo = getOrgLogoPath(organization, body);
  return processDynamoDBResponse(
    DynamoDBActions.putItem(organization),
    new FileUrlObject(
      organization.tableType.replace('#', ''),
      organization.orgLogo
    )
  );
};

export const createOrgAddressFunction = async (
  body: CreateOrgAddressRequest,
  orgId: ObjectId
) => {
  const orgAddress = new DBORGAddress(orgId);
  setValuesInOrgAddress(body, orgAddress);
  return processDynamoDBResponse(DynamoDBActions.putItem(orgAddress));
};

export const createOrgPhoneNumberFunction = async (
  body: CreateOrgPhoneNumberRequest,
  orgId: ObjectId
) => {
  const orgPhoneNumber = new DBOrgPhone(orgId);
  setValuesInOrgPhone(body, orgPhoneNumber);
  return processDynamoDBResponse(DynamoDBActions.putItem(orgPhoneNumber));
};

export const createOrgEmailFunction = async (
  body: CreateOrgEmailRequest,
  orgId: ObjectId
) => {
  const orgEmail = new DBOrgEmail(orgId);
  setValesInOrgEmail(body, orgEmail);
  return processDynamoDBResponse(DynamoDBActions.putItem(orgEmail));
};

export const createOrgRegistrationFunction = async (
  body: CreateOrgRegistrationRequest,
  orgId: ObjectId
) => {
  const orgRegistration = new DBOrgRegistration(orgId);
  setValuesInOrgRegistration(body, orgRegistration);
  orgRegistration.registrationCertificateLink = getOrgRegistrationDocumentPath(
    orgId,
    body.registrationCertificate
  );
  return processDynamoDBResponse(
    DynamoDBActions.putItem(orgRegistration),
    new FileUrlObject(orgId, orgRegistration.registrationCertificateLink)
  );
};

export const createOrgDocumentFunction = async (
  body: CreateOrgDocumentRequest,
  orgId: ObjectId
) => {
  const orgDocument = new DBOrgDocument(orgId);
  setValuesInOrgDocument(body, orgDocument);
  orgDocument.documentLink = getOrgRegistrationDocumentPath(
    orgId,
    body.document
  );
  return processDynamoDBResponse(
    DynamoDBActions.putItem(orgDocument),
    new FileUrlObject(orgId, orgDocument.documentLink)
  );
};

export const createOrgSettingsFunction = async (
  body: CreateOrgSettingsRequest,
  orgId: ObjectId
) => {
  const orgSettings = new DBOrgSettings(orgId);
  setValuesInOrgSettings(body, orgSettings);
  return processDynamoDBResponse(DynamoDBActions.putItem(orgSettings));
};

export const createOrgSubscriptionFunction = async (
  body: CreateOrgSubscriptionRequest,
  orgId: ObjectId
) => {
  const orgSubscription = new DBOrgSubscription(orgId);
  setValuesInOrgSubscription(body, orgSubscription);
  return processDynamoDBResponse(DynamoDBActions.putItem(orgSubscription));
};

export const createOrgAffiliationFunction = async (
  body: CreateOrgAffiliationRequest,
  orgId: ObjectId
) => {
  const orgAffiliation = new DBOrgAffiliation(orgId);
  setValuesInOrgAffiliation(body, orgAffiliation);
  orgAffiliation.certificationDocumentLink = getAffiliationDocumentPath(
    orgId,
    body.certificationDocument
  );
  return processDynamoDBResponse(
    DynamoDBActions.putItem(orgAffiliation),
    new FileUrlObject(orgId, orgAffiliation.certificationDocumentLink)
  );
};

export const listAllNTAAuthoritiesFunction = async () => {
  return processDynamoDBResponse(
    getContentsByType(TABLE_NAMES.instituteTable, 'NTA_AUTHORITY')
  );
};

// TODO: Later
export const GetOrganizationByIdFunction = async (ntaId: ObjectId) => {
  return processDynamoDBResponse(getNTAByIDFunction(ntaId));
};

export const GetOrgOfCurrentUserFunction = async (cognitoUserSub: string) => {
  const user = await scanItemById<NTAUser>('#USER#ADMIN#' + cognitoUserSub);
  return getOrgItemById<DBOrganization>(
    user?.tableType + '',
    user?.tableType + '#META'
  );
};

export const GetCurrentUserDetailsFunction = async (cognitoUserSub: string) => {
  return scanItemById<NTAUser>('#USER#ADMIN#' + cognitoUserSub);
};

export const getNTAByIDFunction = (orgId: string) => {
  return DynamoDBActions.get({
    id: '#' + orgId + '#META',
    tableType: '#' + orgId,
  });
};

export const createOrganizationMasterUserFunction = async (
  body: CreatePersonRequest,
  orgId: string
) => {
  const org = await getNTAById(orgId);
  console.log('createOrganizationMasterUserFunction', org);
  if (!org) {
    return createErrorResponse('No Such Organization');
  }
  return org.orgType === 'SELLER'
    ? cognitoActions.addNTAUser(body, org.tableType)
    : createInstituteMasterUserFunction(body, orgId);
};

export const insertCognitoUserInNTAFunction = async (
  orgId: string,
  cognitoUserSub: string,
  picture: FileMetaData
) => {
  const ntaUser = new NTAUser();
  ntaUser.username = cognitoUserSub;
  ntaUser.orgId = orgId;
  ntaUser.tableType = orgId;
  ntaUser.picture = getProfilePicturePath(orgId, picture, cognitoUserSub);
  ntaUser.id = `#USER#ADMIN#${cognitoUserSub}`;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(ntaUser, TABLE_NAMES.instituteTable),
    new FileUrlObject(cognitoUserSub, ntaUser.picture)
  );
};

export const insertCognitoUserIninstituteFunction = async (
  orgId: string,
  cognitoUserSub: string,
  picture: FileMetaData
) => {
  const instituteUser = new InstituteUser();
  instituteUser.instituteId = orgId;
  instituteUser.cognitoUserId = cognitoUserSub;
  instituteUser.tableType = '#' + orgId;
  instituteUser.picture = getProfilePicturePath(orgId, picture, cognitoUserSub);
  return processDynamoDBResponse(
    DynamoDBActions.putItem(instituteUser),
    new FileUrlObject(cognitoUserSub, instituteUser.picture)
  );
};

export const getNTAIdofUser = async (event: APIGatewayProxyEvent) => {
  const cognitoUser = await getCognitoUserFromToken(event);
  const userId =
    cognitoUser.UserAttributes.find((attr) => attr.Name === 'sub')?.Value + '';
  const user: NTAUser = await DynamoDBActions.get(
    { id: userId },
    TABLE_NAMES.instituteTable
  );
  return user.orgId;
};

export const getNTAofUser = async (event: APIGatewayProxyEvent) => {
  const ntaId = getNTAIdofUser(event);
  const nta: NTA = await DynamoDBActions.get(
    { id: ntaId },
    TABLE_NAMES.instituteTable
  );
  return nta;
};

export const getNTAById = (orgId: string) =>
  DynamoDBActions.get({
    tableType: '#' + orgId,
    id: '#' + orgId + '#META',
  }).then((org) => org.Item as DBOrganization);

export const createInstituteMasterUserFunction = async (
  body: CreatePersonRequest,
  orgId: ObjectId
) => {
  return cognitoActions
    .addInstituteUserFunction(body)
    .then((user) =>
      insertCognitoUserIninstituteFunction(
        orgId,
        user.User?.Attributes?.find((attr) => attr.Name === 'sub')?.Value + '',
        body.picture
      )
    );
};

// *Get File Paths
export const getOrgLogoPath = (
  organization: DBOrganization,
  body: CreateOrganizationRequest
) => {
  const extension = getFileExtension(body.organizationIcon);
  const logoUrl = CreateS3FolderStructure.getLogoPath(
    organization.tableType,
    'logo.' + extension
  );
  return logoUrl;
};

export const getOrgRegistrationDocumentPath = (
  orgId: string,
  fileMetaData: FileMetaData
) => {
  const extension = getFileExtension(fileMetaData);
  return CreateS3FolderStructure.getRegistrationDocumentPath(orgId, extension);
};

export const getAffiliationDocumentPath = (
  orgId: string,
  fileMetaData: FileMetaData
) => {
  const extension = getFileExtension(fileMetaData);
  return CreateS3FolderStructure.getAffiliationDocumentPath(orgId, extension);
};

export const getProfilePicturePath = (
  orgId: string,
  fileMetaData: FileMetaData,
  profileId: string
) => {
  const extension = getFileExtension(fileMetaData);
  return CreateS3FolderStructure.getProfilePicturePath(
    orgId,
    extension,
    profileId
  );
};

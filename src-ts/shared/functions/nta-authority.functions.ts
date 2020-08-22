import { NTA, NTAUser } from "../model/DB/nta.DB.model";
import {
  DynamoDBActions,
  processDynamoDBResponse,
} from "../helpers/db-handler";
import { TABLE_NAMES, S3_FOLDER_STRUCTURE } from "../constants/common-vars";
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
} from "../model/request-method.model";
import {
  getContentsByType,
  getCognitoUserFromToken,
  getFileExtension,
  CreateS3FolderStructure,
} from "../helpers/general.helpers";
import { APIGatewayProxyEvent } from "aws-lambda";
import { ObjectId } from "../model/DB/imports/types.DB.model";
import { uploadFileToS3, getSignedUrlS3 } from "../helpers/s3.handler";
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
} from "../model/DB/org.DB.model";
import { FileUrlObject } from "../model/response.model";

// *Create NTA Authority
export const createOrganizationFunction = async (
  body: CreateOrganizationRequest
) => {
  const organization = new DBOrganization();
  organization.name = body.organizationName;
  organization.orgInstituteType = body.organizationType;
  organization.orgShortCode =
    body.organizationShortCode || organization.getShortCode();
  organization.orgLogo = getOrgLogoPath(organization, body);
  return processDynamoDBResponse(
    DynamoDBActions.putItem(organization),
    new FileUrlObject(
      organization.tableType.replace("#", ""),
      organization.orgLogo
    )
  );
};

export const createOrgAddressFunction = async (
  body: CreateOrgAddressRequest,
  orgId: ObjectId
) => {
  const orgAddress = new DBORGAddress(orgId);
  orgAddress.address = body.address;
  orgAddress.addressText = body.addressText;
  return processDynamoDBResponse(DynamoDBActions.putItem(orgAddress));
};

export const createOrgPhoneNumberFunction = async (
  body: CreateOrgPhoneNumberRequest,
  orgId: ObjectId
) => {
  const orgPhoneNumber = new DBOrgPhone(orgId);
  orgPhoneNumber.phoneText = body.phoneText;
  orgPhoneNumber.phone = body.phone;
  orgPhoneNumber.phoneType = body.phoneType;
  orgPhoneNumber.phoneTimings = body.phoneTimings;
  orgPhoneNumber.phoneDays = body.phoneDays;
  orgPhoneNumber.phoneShift = body.phoneShift;
  orgPhoneNumber.associatedPost = body.associatedPost;
  return processDynamoDBResponse(DynamoDBActions.putItem(orgPhoneNumber));
};

export const createOrgEmailFunction = async (
  body: CreateOrgEmailRequest,
  orgId: ObjectId
) => {
  const orgEmail = new DBOrgEmail(orgId);
  orgEmail.emailText = body.emailText;
  orgEmail.emailId = body.emailId;
  orgEmail.emailType = body.emailType;
  orgEmail.emailDays = body.emailDays;
  orgEmail.associatedPost = body.associatedPost;
  return processDynamoDBResponse(DynamoDBActions.putItem(orgEmail));
};

export const createOrgRegistrationFunction = async (
  body: CreateOrgRegistrationRequest,
  orgId: ObjectId
) => {
  const orgRegistration = new DBOrgRegistration(orgId);
  orgRegistration.registrationType = body.registrationNumber;
  orgRegistration.registrationNumber = body.registrationNumber;
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
  orgDocument.documentNumber = body.documentNumber;
  orgDocument.documentValidUpto = body.documentValidUpto;
  orgDocument.documentType = body.documentType;
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
  orgSettings.otp = body.otp;
  orgSettings.password = body.password;
  return processDynamoDBResponse(DynamoDBActions.putItem(orgSettings));
};

export const createOrgSubscriptionFunction = async (
  body: CreateOrgSubscriptionRequest,
  orgId: ObjectId
) => {
  const orgSettings = new DBOrgSubscription(orgId);
  orgSettings.moduleId = body.moduleId;
  orgSettings.subscriptionPackageId = body.subscriptionPackageId;
  orgSettings.subscriptionFrom = body.subscriptionFrom;
  orgSettings.subscriptionUpto = body.subscriptionUpto;
  orgSettings.subscriptionTypeId = body.subscriptionTypeId;
  return processDynamoDBResponse(DynamoDBActions.putItem(orgSettings));
};

export const createOrgAffiliationFunction = async (
  body: CreateOrgAffiliationRequest,
  orgId: ObjectId
) => {
  const orgAffiliation = new DBOrgAffiliation(orgId);
  orgAffiliation.affiliationStartDate = body.affiliationStartDate;
  orgAffiliation.affiliationEndDate = body.affiliationEndDate;
  orgAffiliation.affiliationAuthority = body.affiliationAuthority;
  orgAffiliation.affiliationGrade = body.affiliationGrade;
  orgAffiliation.affiliationStatus = body.affiliationStatus;
  orgAffiliation.affiliationType = body.affiliationType;
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
    getContentsByType(TABLE_NAMES.instituteTable, "NTA_AUTHORITY")
  );
};

// TODO: Later
export const listNTAAuthorityFunction = async (ntaId: ObjectId) => {
  return processDynamoDBResponse(getNTAByIDFunction(ntaId));
};

export const getNTAByIDFunction = (ntaId: string) => {
  return DynamoDBActions.getItemById(
    ntaId,
    "NTA_AUTHORITY",
    TABLE_NAMES.instituteTable
  );
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

export const getNTAIdofUser = async (event: APIGatewayProxyEvent) => {
  const cognitoUser = await getCognitoUserFromToken(event);
  const userId =
    cognitoUser.UserAttributes.find((attr) => attr.Name === "sub")?.Value + "";
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

export const getNTAById = (ntaId: string) =>
  DynamoDBActions.get({ id: ntaId }, TABLE_NAMES.instituteTable).then(
    (nta) => nta.Item
  );

// *Helpers
export const getOrgLogoPath = (
  organization: DBOrganization,
  body: CreateOrganizationRequest
) => {
  const extension = getFileExtension(body.organizationIcon);
  const logoUrl = CreateS3FolderStructure.getLogoPath(
    organization.tableType,
    "logo." + extension
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

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
} from "../model/request-method.model";
import {
  getContentsByType,
  getCognitoUserFromToken,
  getFileExtension,
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
} from "../model/DB/org.DB.model";

// *Create NTA Authority
export const createOrganizationFunction = async (
  body: CreateOrganizationRequest
) => {
  const organization = new DBOrganization();
  organization.name = body.organizationName;
  organization.orgInstituteType = body.organizationType;
  organization.orgShortCode =
    body.organizationShortCode || organization.getShortCode();
  // const { logoUrl, S3Url } =
  organization.orgLogo = await processorgLogo(organization, body);
  return processDynamoDBResponse(DynamoDBActions.putItem(organization), {
    id: organization.tableType.replace("#", ""),
    logoUrl: organization.orgLogo,
  });
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
  return processDynamoDBResponse(DynamoDBActions.putItem(orgRegistration));
};

export const createOrgDocumentFunction = async (
  body: CreateOrgDocumentRequest,
  orgId: ObjectId
) => {
  const orgDocument = new DBOrgDocument(orgId);
  return processDynamoDBResponse(DynamoDBActions.putItem(orgDocument));
};

export const createOrgSettingsFunction = async (
  body: CreateOrgSettingsRequest,
  orgId: ObjectId
) => {
  const orgSettings = new DBOrgSettings(orgId);
  return processDynamoDBResponse(DynamoDBActions.putItem(orgSettings));
};

export const createOrgAffiliationFunction = async (
  body: CreateOrgAffiliationRequest,
  orgId: ObjectId
) => {
  const orgAffiliation = new DBOrgAffiliation(orgId);
  return processDynamoDBResponse(DynamoDBActions.putItem(orgAffiliation));
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
  ntaId: string,
  username: string
) => {
  const ntaUser = new NTAUser();
  ntaUser.username = username;
  ntaUser.ntaId = ntaId;
  ntaUser.tableType = `#NTA#${ntaId}`;
  ntaUser.id = `#USER#ADMIN#${username}`;
  return processDynamoDBResponse(
    DynamoDBActions.putItem(ntaUser, TABLE_NAMES.instituteTable)
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
  return user.ntaId;
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
export const processorgLogo = async (
  organization: DBOrganization,
  body: CreateOrganizationRequest
) => {
  // Process Image
  const extension = getFileExtension(body.organizationIcon);
  const logoUrl = S3_FOLDER_STRUCTURE.getLogoPath(
    organization.tableType,
    "logo." + extension
  );
  // const S3Url = await getSignedUrlS3(
  //   logoUrl,
  //   body.organizationIcon.contentType
  // );
  return logoUrl;
  //  {
  //   ,
  //   // S3Url,
  // };
};

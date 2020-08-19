import { NTA, NTAUser } from '../model/DB/nta.DB.model';
import {
  DynamoDBActions,
  processDynamoDBResponse,
} from '../helpers/db-handler';
import { TABLE_NAMES } from '../constants/common-vars';
import {
  CreateNTAAuthorityRequest,
  CreateNTAPhoneNumberRequest,
  CreateNTAEmailRequest,
} from '../model/request-method.model';
import {
  getContentsByType,
  getCognitoUserFromToken,
} from '../helpers/general.helpers';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { ObjectId } from '../model/DB/imports/types.DB.model';
import {
  DBOrganization,
  DBOrgPhone,
  DBOrgEmail,
} from '../model/DB/org.DB.model';

// *Create NTA Authority
export const createNTAAuthorityFunction = async (
  body: CreateNTAAuthorityRequest
) => {
  const ntaAuthority = new DBOrganization();
  ntaAuthority.name = body.organizationName;
  ntaAuthority.orgLogo = body.organizationIcon;
  ntaAuthority.orgInstituteType = body.organizationType;
  ntaAuthority.orgShortCode =
    body.organizationShortCode || ntaAuthority.getShortCode();
  return processDynamoDBResponse(DynamoDBActions.putItem(ntaAuthority));
};

export const createNTAPhoneNumberFunction = async (
  body: CreateNTAPhoneNumberRequest,
  orgId: ObjectId
) => {
  const ntaPhoneNumber = new DBOrgPhone(orgId);
  ntaPhoneNumber.phoneText = body.phoneText;
  ntaPhoneNumber.phone = body.phone;
  ntaPhoneNumber.phoneType = body.phoneType;
  ntaPhoneNumber.phoneTimings = body.phoneTimings;
  ntaPhoneNumber.phoneDays = body.phoneDays;
  ntaPhoneNumber.phoneShift = body.phoneShift;
  ntaPhoneNumber.associatedPost = body.associatedPost;
  return processDynamoDBResponse(DynamoDBActions.putItem(ntaPhoneNumber));
};

export const createNTAEmail = async (
  body: CreateNTAEmailRequest,
  orgId: ObjectId
) => {
  const ntaEmail = new DBOrgEmail(orgId);
  ntaEmail.emailText = body.emailText;
  ntaEmail.emailId = body.emailId;
  ntaEmail.emailType = body.emailType;
  ntaEmail.emailDays = body.emailDays;
  ntaEmail.associatedPost = body.associatedPost;
  return processDynamoDBResponse(DynamoDBActions.putItem(ntaEmail));
};

export const listAllNTAAuthoritiesFunction = async () => {
  return processDynamoDBResponse(
    getContentsByType(TABLE_NAMES.instituteTable, 'NTA_AUTHORITY')
  );
};

// TODO: Later
export const listNTAAuthorityFunction = async (ntaId: ObjectId) => {
  return processDynamoDBResponse(getNTAByIDFunction(ntaId));
};

export const getNTAByIDFunction = (ntaId: string) => {
  return DynamoDBActions.getItemById(
    ntaId,
    'NTA_AUTHORITY',
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
    cognitoUser.UserAttributes.find((attr) => attr.Name === 'sub')?.Value + '';
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

import * as aws from 'aws-sdk';
import { EventHeaders } from '../model/request.model';

export const CORS_HEADERS = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,GET,PATCH,PUT,DELETE',
};

export const cognito = new aws.CognitoIdentityServiceProvider();

export const EVENT_HEADERS: EventHeaders = {
  accessToken: 'access-token',
  ntaAuthorityId: 'nta-authority-id',
  ntaAPIPasskey: 'nta-api-pass-key',
};

export const EVENT_HEADERS_LOCAL: EventHeaders = {
  accessToken: 'Access-Token',
  ntaAuthorityId: 'Nta-Authority-Id',
  ntaAPIPasskey: 'Nta-Api-Pass-Key',
};

export const ERRORS = {
  INSTITUTION_TYPE_NO_EXIST: 'Institution Type Does not exist',
  PARENT_FEES_HEAD_NOT_EXIST: 'Parent Fees head Does not exist',
  FEES_HEAD_NO_SPECIAL_CHARS:
    'Fees head name should not contain any special characters.',
  FEES_HEAD_NAME_ALREADY_EXISTS: 'Fees head name already exists',
  FEES_HEAD_NO_EXISTS: 'Fees head does not Exist',
  FEES_HEAD_INSTITUTE_ID_NO_MATCH_PARENT:
    'The Fees Head Institute does not match with the parent Fees head',
  FEES_TYPE_NO_SPECIAL_CHARS:
    'Fees Type name should not contain any special characters.',
  FEES_TYPE_NO_EXIST: 'Fees Type does not Exist',
  FEES_TYPE_NAME_ALREADY_EXISTS: 'Fees type name already exists',
  PARENT_ACCOUNT_HEAD_NO_EXISTS: 'Parent Accounts head Does not exist',
  ACCOUNTS_HEAD_NO_SPECIAL_CHARS:
    'Accounts head name should not contain any special characters.',
  ACCOUNTS_HEAD_NO_EXISTS: 'Accounts head does not Exist',
  ACCOUNTS_HEAD_NAME_ALREADY_EXISTS: 'Fees type name already exists',
  GENERAL_UNAUTHORISED_ACCESS: 'Unauthorised Access',
  GENERAL_KEYS_MISSING: 'Some keys Missing',
};

export const S3_FOLDER_STRUCTURE = {
  ORGANIZATION: 'org_meta',
  IMAGES: '/images',
  REGISTRATION_DOCUMENTS: '/registration-documents',
  AFFILIATION_DOCUMENTS: '/affiliation-documents',
  PROFILE_META: '/profile_meta',
  PROFILE_PICTURE: '/profile-picture',
  LOGO: '/logo',
};

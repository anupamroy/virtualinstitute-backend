import {
  CreatePersonRequest,
  CreateInstituteUserRequest,
} from '../model/request.model';
import { CognitoConfig } from '../constants/common-vars';
import { AdminCreateUserRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { CreateStudentRequest } from '../model/request.model';

export const createCognitoUserObject = (
  UserPoolId: string,
  Username: string,
  TemporaryPassword: string,
  UserAttributes: string[],
  customAttributes: string[],
  body: any
): AdminCreateUserRequest => {
  return {
    UserPoolId,
    Username,
    TemporaryPassword,
    UserAttributes: [
      ...UserAttributes.map((attribute) => ({
        Name: attribute,
        Value: body[attribute],
      })),
      ...customAttributes.map((attribute) => ({
        Name: 'custom:' + attribute,
        Value: body[attribute],
      })),
    ],
  };
};

// Student
export const generateStudentRegistrationNumber = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);

export const createCognitoStudentObject = (
  registrationNumber: string,
  body: CreateStudentRequest
) => {
  body.TYPE = 'STUDENT';
  return createCognitoUserObject(
    CognitoConfig.studentInstituteUserPoolId,
    registrationNumber,
    body.password,
    [
      'email',
      'gender',
      'name',
      'family_name',
      'middle_name',
      'phone_number',
      'picture',
    ],
    ['TYPE'],
    body
  );
};

export const createCognitoInstituteUserObject = (
  body: CreateInstituteUserRequest
) => {
  body.TYPE = 'INSTITUTE';
  return createCognitoUserObject(
    CognitoConfig.studentInstituteUserPoolId,
    body.phone_number,
    body.password,
    [
      'email',
      'gender',
      'name',
      'family_name',
      'middle_name',
      'phone_number',
      'picture',
    ],
    ['TYPE'],
    body
  );
};

export const createCognitoNTAUserObject = (body: CreatePersonRequest) =>
  createCognitoUserObject(
    CognitoConfig.ntaUserPoolId,
    body.phone_number,
    body.password,
    ['email', 'gender', 'name', 'family_name', 'middle_name'],
    [],
    body
  );

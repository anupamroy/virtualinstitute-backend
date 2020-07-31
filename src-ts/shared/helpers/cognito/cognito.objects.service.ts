import { CreatePersonRequest } from '../../model/request.model';
import { CognitoConfig } from '../../constants/common-vars';
import { AdminCreateUserRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';

export const createCognitoUserObject = (
  UserPoolId: string,
  Username: string,
  TemporaryPassword: string,
  UserAttributes: string[],
  body: any
): AdminCreateUserRequest => {
  return {
    UserPoolId,
    Username,
    TemporaryPassword,
    UserAttributes: UserAttributes.map((attribute) => ({
      Name: attribute,
      Value: body[attribute],
    })),
  };
};

// Student
export const generateStudentRegistrationNumber = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);

export const createCognitoStudentObject = (
  registrationNumber: string,
  body: CreatePersonRequest
) =>
  createCognitoUserObject(
    CognitoConfig.studentInstituteUserPoolId,
    registrationNumber,
    body.password,
    ['email', 'gender', 'name', 'family_name', 'middle_name'],
    body
  );

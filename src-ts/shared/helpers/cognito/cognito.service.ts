import * as aws from 'aws-sdk';
import {
  AdminCreateUserRequest,
  RespondToAuthChallengeRequest,
  AdminDeleteUserRequest,
} from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { createResponse } from '../handler';
import { APIResponse } from '../../model/request-method.model';
import { CognitoConfig } from '../../constants/common-vars';
import { CreatePersonRequest } from '../../model/request.model';
import { processDynamoDBResponse } from '../db-handler';
import { PromiseResult } from 'aws-sdk/lib/request';

const cognito = new aws.CognitoIdentityServiceProvider();

export const ProcessCognitoUserResponse = (
  event: Promise<
    PromiseResult<
      aws.CognitoIdentityServiceProvider.AdminCreateUserResponse,
      aws.AWSError
    >
  >
) =>
  event
    .then((result) =>
      createResponse(200, new APIResponse(false, '', result.User))
    )
    .catch((e) => createResponse(422, new APIResponse(true, e.message, e)));

export const createCognitoUser = (user: AdminCreateUserRequest) =>
  ProcessCognitoUserResponse(cognito.adminCreateUser(user).promise());

export const deleteCognitoUser = (UserPoolId: string, Username: string) =>
  processDynamoDBResponse(
    cognito.adminDeleteUser({ UserPoolId, Username }).promise()
  );



// Password Challenge
export const respondToAuthChallenge = () => {};

export const setUserPassword = (USERNAME: string, Session: string) => {
  const object: RespondToAuthChallengeRequest = {
    ChallengeName: 'NEW_PASSWORD_REQUIRED',
    ChallengeResponses: {
      NEW_PASSWORD: '12345678',
      USERNAME,
    },
    ClientId: CognitoConfig.ntaAppId,
    Session,
  };
  return processDynamoDBResponse(
    cognito.respondToAuthChallenge(object).promise()
  );
};

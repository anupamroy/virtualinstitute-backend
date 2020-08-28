import * as aws from 'aws-sdk';
import {
  AdminCreateUserRequest,
  RespondToAuthChallengeRequest,
} from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { createResponse } from '../helpers/handler-common';
import { APIResponse } from '../model/request-method.model';
import { cognito } from '../constants/common.const';
import { processDynamoDBResponse } from '../helpers/db-handler';
import { PromiseResult } from 'aws-sdk/lib/request';
import { CONFIG } from '../constants/config';

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
export const setUserPassword = (USERNAME: string, Session: string) => {
  const object: RespondToAuthChallengeRequest = {
    ChallengeName: 'NEW_PASSWORD_REQUIRED',
    ChallengeResponses: {
      NEW_PASSWORD: '12345678',
      USERNAME,
    },
    ClientId: CONFIG.CognitoConfig.ntaAppId,
    Session,
  };
  return processDynamoDBResponse(
    cognito.respondToAuthChallenge(object).promise()
  );
};

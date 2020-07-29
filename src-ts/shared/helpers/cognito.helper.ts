import * as aws from "aws-sdk";
import {
  AdminCreateUserRequest,
  RespondToAuthChallengeResponse,
  RespondToAuthChallengeRequest,
} from "aws-sdk/clients/cognitoidentityserviceprovider";
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import {
  CognitoConfig,
  REQUEST_HEADERS,
  CORS_HEADERS,
} from "../constants/common-vars";
import { parseBody, createResponse } from "./handler";
import { APIResponse } from "../model/request-method.model";
import { CreatePersonRequest } from "../model/request.model";
import { DynamoDBActions } from "./db-handler";
import {
  keysMissingResponse,
  unauthorisedAccessResponse,
} from "./response.helper";

const cognito = new aws.CognitoIdentityServiceProvider();

export class CognitoActions {
  constructor() {
    this.setNTAPassword = this.setNTAPassword.bind(this);
  }
  async addStudent(event: APIGatewayProxyEvent) {
    const body = parseBody<CreatePersonRequest>(event.body);
    if (
      body &&
      Object.keys(new CreatePersonRequest()).every(
        (key) => body[key as keyof CreatePersonRequest]
      )
    ) {
      const request: AdminCreateUserRequest = {
        UserPoolId: CognitoConfig.studentInstituteUserPoolId,
        Username: body.mobile,
        TemporaryPassword: body.password,
        UserAttributes: [
          { Name: "email", Value: body.email },
          { Name: "gender", Value: body.gender },
          { Name: "name", Value: body.name },
          { Name: "family_name", Value: body.family_name },
          { Name: "middle_name", Value: body.middle_name },
        ],
      };
      return cognito
        .adminCreateUser(request)
        .promise()
        .then((user) =>
          createResponse(200, new APIResponse(false, "", user.User))
        )
        .catch((e) => createResponse(422, new APIResponse(true, e.message, e)));
    } else {
      return keysMissingResponse();
    }
  }

  async addNTAUser(event: APIGatewayProxyEvent) {
    const ntaAPIPasskey = event.headers[REQUEST_HEADERS.ntaAPIPasskey];
    console.log("ntaAPIPasskey", ntaAPIPasskey, event.headers);
    if (ntaAPIPasskey === CognitoConfig.ntaAPIPasskey) {
      const body = parseBody<CreatePersonRequest>(event.body);
      if (
        body &&
        Object.keys(new CreatePersonRequest()).every(
          (key) => body[key as keyof CreatePersonRequest]
        )
      ) {
        const request: AdminCreateUserRequest = {
          UserPoolId: CognitoConfig.ntaUserPoolId,
          Username: body.mobile,
          TemporaryPassword: body.password,
          UserAttributes: [
            { Name: "email", Value: body.email },
            { Name: "gender", Value: body.gender },
            { Name: "name", Value: body.name },
            { Name: "family_name", Value: body.family_name },
            { Name: "middle_name", Value: body.middle_name },
          ],
        };
        return cognito
          .adminCreateUser(request)
          .promise()
          .then((user) =>
            createResponse(200, new APIResponse(false, "", user.User))
          )
          .catch((e) =>
            createResponse(422, new APIResponse(true, e.message, e))
          );
      } else {
        return keysMissingResponse();
      }
    } else {
      return unauthorisedAccessResponse();
    }
  }

  setNTAPassword(event: APIGatewayProxyEvent) {
    const body = parseBody<{ mobile: string; session: string }>(event.body);
    const mobile = body?.mobile;
    const session = body?.session;
    if (mobile && session) {
      const object: RespondToAuthChallengeRequest = {
        ChallengeName: "NEW_PASSWORD_REQUIRED",
        ChallengeResponses: {
          NEW_PASSWORD: "12345678",
          USERNAME: mobile,
        },
        ClientId: CognitoConfig.ntaAppId,
        Session: session,
      };
      return cognito
        .respondToAuthChallenge(object)
        .promise()
        .then((data) => createResponse(200, new APIResponse(false, "", data)))
        .catch((error) => createResponse(422, error.message, error));
    } else {
      return keysMissingResponse();
    }
  }

  deleteNTA(event: APIGatewayProxyEvent) {
    const ntaAPIPasskey = event.headers[REQUEST_HEADERS.ntaAPIPasskey];
    console.log("ntaAPIPasskey", ntaAPIPasskey, event.headers);
    if (ntaAPIPasskey === CognitoConfig.ntaAPIPasskey) {
      const mobile = event.pathParameters?.mobile;
      if (mobile) {
        const request: AdminCreateUserRequest = {
          UserPoolId: CognitoConfig.ntaUserPoolId,
          Username: mobile,
        };
        const cognito = new aws.CognitoIdentityServiceProvider();
        return cognito
          .adminDeleteUser(request)
          .promise()
          .then((user) => createResponse(200, new APIResponse(false, "", user)))
          .catch((e) =>
            createResponse(422, new APIResponse(true, e.message, e))
          );
      } else {
        return createResponse(
          400,
          new APIResponse(true, "Key mobile Missing in URL")
        );
      }
    } else {
      return createResponse(403, new APIResponse(true, "Unauthorised Access"));
    }
  }

  createNTA(event: APIGatewayProxyEvent) {
    const NTA = DynamoDBActions.get({ type: "NTA" });
    if(!NTA) {
      
    }
  }
}

export const cognitoActions = new CognitoActions();

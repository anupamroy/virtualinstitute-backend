import * as aws from "aws-sdk";
import {
  AdminCreateUserRequest,
  RespondToAuthChallengeResponse,
  RespondToAuthChallengeRequest,
} from "aws-sdk/clients/cognitoidentityserviceprovider";
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { CognitoConfig, REQUEST_HEADERS } from "../constants/common-vars";
import { parseBody, createResponse } from "./handler";
import { APIResponse } from "../model/request-method.model";
import { CreateNTAUserRequest } from "../model/request.model";

const cognito = new aws.CognitoIdentityServiceProvider();

export class CognitoActions {
  constructor() {
    this.setNTAPassword = this.setNTAPassword.bind(this);
  }
  async addStudent() {
    const request: AdminCreateUserRequest = {
      UserPoolId: CognitoConfig.ntaUserPoolId,
      Username: "9422086010",
      UserAttributes: [{ Name: "email", Value: "aditya18thm@gmail.com" }],
    };
    const user = await cognito.adminCreateUser(request).promise();
    return user.User;
  }

  async addNTA(event: APIGatewayProxyEvent) {
    const ntaAPIPasskey = event.headers[REQUEST_HEADERS.ntaAPIPasskey];
    console.log("ntaAPIPasskey", ntaAPIPasskey, event.headers);
    if (ntaAPIPasskey === CognitoConfig.ntaAPIPasskey) {
      const body = parseBody<CreateNTAUserRequest>(event.body);
      if (
        body &&
        Object.keys(new CreateNTAUserRequest()).every(
          (key) => body[key as keyof CreateNTAUserRequest]
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
            this.setNTAPassword(body.mobile)
              .then(() =>
                createResponse(200, new APIResponse(false, "", user.User))
              )
              .catch((e) =>
                createResponse(422, new APIResponse(true, e.message, e))
              )
          )
          .catch((e) =>
            createResponse(422, new APIResponse(true, e.message, e))
          );
      } else {
        return createResponse(
          400,
          new APIResponse(true, "Key mobile/password Missing")
        );
      }
    } else {
      return createResponse(403, new APIResponse(true, "Unauthorised Access"));
    }
  }

  setNTAPassword(mobile: string) {
    const object: RespondToAuthChallengeRequest = {
      ChallengeName: "NEW_PASSWORD_REQUIRED",
      ChallengeResponses: {
        NEW_PASSWORD: "12345678",
        USERNAME: mobile,
      },
      ClientId: CognitoConfig.ntaAppId,
    };
    return cognito.respondToAuthChallenge(object).promise();
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
}

export const cognitoActions = new CognitoActions();

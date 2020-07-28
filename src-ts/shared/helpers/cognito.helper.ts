import * as aws from "aws-sdk";
import { AdminCreateUserRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { CognitoConfig, REQUEST_HEADERS } from "../constants/common-vars";
import { parseBody, createResponse } from "./handler";
import { APIResponse } from "../model/request-method.model";

export const cognitoActions = {
  addStudent: async () => {
    const request: AdminCreateUserRequest = {
      UserPoolId: "ap-south-1_75LKZuJ8p",
      Username: "9422086010",
      UserAttributes: [{ Name: "email", Value: "aditya18thm@gmail.com" }],
    };
    const cognito = new aws.CognitoIdentityServiceProvider();
    const user = await cognito.adminCreateUser(request).promise();
    return user.User;
  },

  addNTA: async (event: APIGatewayProxyEvent) => {
    const ntaAPIPasskey = event.headers[REQUEST_HEADERS.ntaAPIPasskey];
    console.log("ntaAPIPasskey", ntaAPIPasskey, event.headers);
    if (ntaAPIPasskey === CognitoConfig.ntaAPIPasskey) {
      const mobile = parseBody<{ mobile: string }>(event.body)?.mobile;
      if (mobile) {
        const request: AdminCreateUserRequest = {
          UserPoolId: "ap-south-1_qhEXlobaj",
          Username: mobile,
          UserAttributes: [{ Name: "email", Value: "aditya18thm@gmail.com" }],
        };
        const cognito = new aws.CognitoIdentityServiceProvider();
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
        return createResponse(400, new APIResponse(true, "Key mobile Missing"));
      }
    } else {
      return createResponse(403, new APIResponse(true, "Unauthorised Access"));
    }
  },
};

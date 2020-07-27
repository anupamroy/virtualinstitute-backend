import * as aws from "aws-sdk";
import { AdminCreateUserRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";

export const cognitoActions = {
  addStudent: async () => {
    console.info("creating user");
    const request: AdminCreateUserRequest = {
      UserPoolId: "ap-south-1_75LKZuJ8p",
      Username: "9422086010",
      UserAttributes: [{ Name: "email", Value: "aditya18thm@gmail.com" }],
    };
    const cognito = new aws.CognitoIdentityServiceProvider();
    const user = await cognito.adminCreateUser(request).promise();
    return user.User;
  },
};

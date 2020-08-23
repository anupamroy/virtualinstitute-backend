import { APIGatewayProxyEvent } from "aws-lambda";
import { CognitoConfig, cognito } from "../../constants/common-vars";
import { keysMissingResponse } from "../response.helper";
import { parseBody, createResponse } from "../handler-common";
import {
  CreatePersonRequest,
  CreateStudentRequest,
} from "../../model/request.model";
import { AdminCreateUserRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";
import {
  createCognitoNTAUserObject,
  createCognitoStudentObject,
} from "../../transforms/cognito.transform";
import {
  setUserPassword,
  deleteCognitoUser,
} from "../../functions/cognito.functions";
import { APIResponse } from "../../model/request-method.model";
import { NTATokenGuard, requestValidatorGuard } from "../requests/guard";
import {
  insertCognitoUserInNTAFunction,
  insertCognitoUserIninstituteFunction,
} from "../../functions/nta-authority.functions";
import { createCognitoUser } from "../../functions/cognito.functions";
import { CreateInstituteUserRequest } from "../../model/request.model";
import { createCognitoInstituteUserObject } from "../../transforms/cognito.transform";
import { ObjectId } from "../../model/DB/imports/types.DB.model";

export class CognitoActions {
  async addStudent(event: APIGatewayProxyEvent) {
    const body = parseBody<CreateStudentRequest>(event.body);
    return await this.addStudentFunction(body as any);
    // return requestValidatorGuard(
    //   body,
    //   new CreateStudentRequest(),
    //   this.addStudentFunction,
    //   [body]
    // );
  }

  async addStudentFunction(body: CreateStudentRequest) {
    const request: AdminCreateUserRequest = createCognitoStudentObject(
      body.registration_number,
      body
    );
    return createCognitoUser(request);
  }

  async addInstituteUserFunction(body: CreatePersonRequest) {
    const request: AdminCreateUserRequest = {
      ...createCognitoInstituteUserObject({
        ...body,
        TYPE: "INSTITUTE",
      }),
    };
    const pictureAttribute = request.UserAttributes?.find(
      (attribute) => attribute.Name === "picture"
    );
    if (pictureAttribute) {
      pictureAttribute.Value = "";
    }
    console.log("addInstituteUserFunction", request);
    return cognito.adminCreateUser(request).promise();
  }

  // To Do Write this
  async deleteStudent(event: APIGatewayProxyEvent) {
    const studentId = event.pathParameters?.id;
  }

  async addNTAUser(body: CreatePersonRequest, orgId: ObjectId) {
    const result = await requestValidatorGuard(
      body,
      new CreatePersonRequest(),
      this.addNTAUserFunction,
      [body, orgId]
    );
    return await result();
  }

  async addNTAUserFunction(body: CreatePersonRequest, orgId: ObjectId) {
    const request: AdminCreateUserRequest = createCognitoNTAUserObject(body);
    return cognito
      .adminCreateUser(request)
      .promise()
      .then((user) =>
        insertCognitoUserInNTAFunction(
          orgId,
          user.User?.Attributes?.find((attr) => attr.Name === "sub")?.Value +
            "",
          body.picture
        )
      )
      .catch((e) => createResponse(422, new APIResponse(true, e.message, e)));
  }

  setNTAPassword(event: APIGatewayProxyEvent) {
    const body = parseBody<{ mobile: string; session: string }>(event.body);
    const mobile = body?.mobile;
    const session = body?.session;
    if (mobile && session) {
      return setUserPassword(mobile, session);
    } else {
      return keysMissingResponse();
    }
  }

  deleteNTAUser(event: APIGatewayProxyEvent) {
    return NTATokenGuard(event, this.deleteNTAFunction);
  }

  deleteNTAFunction(event: APIGatewayProxyEvent) {
    const mobile = event.pathParameters?.mobile;
    if (mobile) {
      return deleteCognitoUser(CognitoConfig.ntaUserPoolId, mobile);
    } else {
      return createResponse(
        400,
        new APIResponse(true, "Key mobile Missing in URL")
      );
    }
  }
}

export const cognitoActions = new CognitoActions();

import { APIGatewayProxyEvent } from 'aws-lambda';
import { CognitoConfig } from '../../constants/common-vars';
import { keysMissingResponse } from '../response.helper';
import { parseBody, createResponse } from '../handler';
import {
  CreatePersonRequest,
  CreateStudentRequest,
} from '../../model/request.model';
import { AdminCreateUserRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import {
  createCognitoStudentObject,
  createCognitoNTAUserObject,
} from '../../transforms/cognito.transform';
import {
  createCognitoUser,
  setUserPassword,
  deleteCognitoUser,
} from '../../functions/cognito.functions';
import { APIResponse } from '../../model/request-method.model';
import { NTATokenGuard, requestValidatorGuard } from '../requests/guard';

export class CognitoActions {
  async addStudent(event: APIGatewayProxyEvent) {
    const body = parseBody<CreateStudentRequest>(event.body);
    return requestValidatorGuard(
      body,
      new CreateStudentRequest(),
      this.addStudentFunction,
      [body]
    );
  }

  async addStudentFunction(body: CreateStudentRequest) {
    const request: AdminCreateUserRequest = createCognitoStudentObject(
      body.registrationNumber,
      body
    );
    return createCognitoUser(request);
  }

  async addNTAUser(event: APIGatewayProxyEvent) {
    const body = parseBody<CreateStudentRequest>(event.body);
    return await NTATokenGuard(
      event,
      await requestValidatorGuard(
        body,
        new CreatePersonRequest(),
        this.addNTAUserFunction,
        [body]
      )
    );
  }

  async addNTAUserFunction(body: CreateStudentRequest) {
    const request: AdminCreateUserRequest = createCognitoNTAUserObject(body);
    return createCognitoUser(request);
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

  deleteNTA(event: APIGatewayProxyEvent) {
    return NTATokenGuard(event, this.deleteNTAFunction);
  }

  deleteNTAFunction(event: APIGatewayProxyEvent) {
    const mobile = event.pathParameters?.mobile;
    if (mobile) {
      return deleteCognitoUser(CognitoConfig.ntaUserPoolId, mobile);
    } else {
      return createResponse(
        400,
        new APIResponse(true, 'Key mobile Missing in URL')
      );
    }
  }
}

export const cognitoActions = new CognitoActions();

import * as aws from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  REQUEST_HEADERS,
  CognitoConfig,
  TABLE_NAMES,
} from '../../constants/common-vars';
import {
  unauthorisedAccessResponse,
  keysMissingResponse,
} from '../response.helper';
import { requestValidator } from '../requests/request.helper';
import { parseBody, createResponse } from '../handler';
import {
  CreatePersonRequest,
  CreateStudentRequest,
} from '../../model/request.model';
import { AdminCreateUserRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import {
  createCognitoUserObject,
  createCognitoStudentObject,
} from './cognito.objects.service';
import {
  createCognitoUser,
  setUserPassword,
  deleteCognitoUser,
} from './cognito.service';
import { APIResponse } from '../../model/request-method.model';
import { DynamoDBActions } from '../db-handler';

export const checkIfNTATokenValid = (event: APIGatewayProxyEvent) =>
  event.headers[REQUEST_HEADERS.ntaAPIPasskey] === CognitoConfig.ntaAPIPasskey;

export const NTATokenGuard = (
  event: APIGatewayProxyEvent,
  callback: Function
) =>
  checkIfNTATokenValid(event) ? callback(event) : unauthorisedAccessResponse();

export const requestValidatorGuard = (
  body: any,
  classInstance: any,
  callback: Function,
  callbackParams: any
) =>
  body && requestValidator(body, classInstance)
    ? callback(callbackParams)
    : keysMissingResponse();

export class CognitoActions {
  constructor() {
    this.setNTAPassword = this.setNTAPassword.bind(this);
  }
  async addStudent(event: APIGatewayProxyEvent) {
    const body = parseBody<CreatePersonRequest>(event.body);
    if (body && requestValidator(body, new CreatePersonRequest())) {
      const request: AdminCreateUserRequest = createCognitoUserObject(
        CognitoConfig.studentInstituteUserPoolId,
        body.mobile,
        body.password,
        ['email', 'gender', 'name', 'family_name', 'middle_name'],
        body
      );
      return createCognitoUser(request);
    } else {
      return keysMissingResponse();
    }
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
    return NTATokenGuard(
      event,
      requestValidatorGuard(
        body,
        new CreateStudentRequest(),
        this.addNTAUserFunction,
        body
      )
    );
  }

  async addNTAUserFunction(body: CreateStudentRequest) {
    const request: AdminCreateUserRequest = createCognitoUserObject(
      CognitoConfig.studentInstituteUserPoolId,
      body.mobile,
      body.password,
      ['email', 'gender', 'name', 'family_name', 'middle_name'],
      body
    );
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

  createNTA() {
    const NTA = DynamoDBActions.get(
      { type: 'NTA' },
      TABLE_NAMES.instituteTable
    );
    if (!NTA) {
    }
  }
}

export const cognitoActions = new CognitoActions();

import { APIGatewayProxyEvent } from 'aws-lambda';
import { createStudentuserFunction } from '../functions/nta-student.functions';
import { parseBody } from '../helpers/handler-common';
import {
  CreateInstituteUserRequest,
  CreateStudentRequest,
} from '../model/request.model';
import { requestValidatorGuard } from '../helpers/requests/guard';

export const CreateStudentUser = async (event: APIGatewayProxyEvent) => {
  const body = parseBody<CreateInstituteUserRequest>(event.body);
  const result = await requestValidatorGuard(
    body,
    new CreateStudentRequest(),
    createStudentuserFunction,
    [event]
  );
  return await result();
};
export const DeleteStudentUser = async () => {};

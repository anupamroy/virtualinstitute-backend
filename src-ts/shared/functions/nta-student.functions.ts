import { APIGatewayProxyEvent } from 'aws-lambda';
import { cognitoActions } from '../helpers/cognito/cognito.actions';
export const createStudentuserFunction = async (
  event: APIGatewayProxyEvent
) => {

  // TODO: Insert Student in DB and Assign him an NTA and Institute
  return await cognitoActions.addStudent(event);
};

// TODO: Write this Function
// const insertCognitoStudentinDBFunction = ()

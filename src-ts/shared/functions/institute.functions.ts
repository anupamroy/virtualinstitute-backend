import { Institute, InstituteUser } from '../model/DB/institute.DB.model';
import {
  processDynamoDBResponse,
  DynamoDBActions,
} from '../helpers/db-handler';
import { ObjectId } from '../model/DB/imports/types.DB.model';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { getContentsByType } from '../helpers/general.helpers';
import { CONFIG } from '../constants/config';
export const createInstitute = (ntaId: ObjectId) => {
  const institute = new Institute();
  return processDynamoDBResponse(
    DynamoDBActions.putItem(institute, CONFIG.TABLE_NAMES.instituteTable),
    institute
  );
};

export const createInstituteUser = (
  instututeId: ObjectId,
  cognitoUserId: ObjectId
) => {
  const user = new InstituteUser();
  user.instituteId = instututeId;
  user.cognitoUserId = cognitoUserId;
};

export const getInstituteIdByUser = async (event: APIGatewayProxyEvent) => {
  const instituteUsers = await getContentsByType(
    CONFIG.TABLE_NAMES.instituteTable,
    'INSTITUTE_USER'
  );
  const currentUser = instituteUsers.find(
    (user: InstituteUser) =>
      user.cognitoUserId === event.requestContext.authorizer?.claims?.sub
  );
  return (currentUser as InstituteUser)?.instituteId;
};

export const getInstituteById = async (instituteId: ObjectId) => {
  const institutes = await getContentsByType(
    CONFIG.TABLE_NAMES.instituteTable,
    'INSTITUTE'
  );
  return institutes.find(
    (institute: Institute) => institute.id === instituteId
  );
};

export const getInstituteFromEvent = async (event: APIGatewayProxyEvent) => {
  const instituteId = await getInstituteIdByUser(event);
  return await (instituteId && getInstituteById(instituteId));
};

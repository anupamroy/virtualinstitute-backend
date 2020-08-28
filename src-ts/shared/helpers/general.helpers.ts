import { DynamoDBActions } from './db-handler';
import {
  TABLE_NAMES,
  cognito,
  EVENT_HEADERS,
  S3_FOLDER_STRUCTURE,
} from '../constants/common-vars';
import { TableName, ObjectId } from '../model/DB/imports/types.DB.model';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { NTA } from '../model/DB/nta.DB.model';
import { getNTAById } from '../functions/nta-authority.functions';
import { EVENT_HEADERS_LOCAL } from '../constants/common-vars';
import { GeneralDBItem } from '../model/DB/imports/DB.model';
import { GeneralMasterItem } from '../model/DB/imports/misc.DB.model';
import { FileMetaData } from '../model/request-method.model';
import { v4 as uuid } from 'uuid';
import { DBOrganization } from '../model/DB/org.DB.model';

export const getContentsByType = (
  tablename: string,
  tableType: TableName
): Promise<any[]> => {
  const params = {
    FilterExpression: 'tableType = :tableType',
    ExpressionAttributeValues: {
      ':tableType': tableType,
    },
  };
  return DynamoDBActions.scan(tablename, params);
};

export const getCognitoUserFromToken = (event: APIGatewayProxyEvent) => {
  return cognito
    .getUser({
      AccessToken: event.headers['Access-Token'],
    })
    .promise();
};

export const getNTAFromEvent = async (event: APIGatewayProxyEvent) => {
  const ntaId = getNTAIdFromEvent(event);
  const nta: DBOrganization = await getNTAById(ntaId);
  return nta;
};

export const getNTAIdFromEvent = (event: APIGatewayProxyEvent) => {
  const ntaId =
    event.headers[EVENT_HEADERS.ntaAuthorityId] ||
    event.headers[EVENT_HEADERS_LOCAL.ntaAuthorityId];
  return ntaId;
};

export const sanitizeString = (inputString: string) =>
  (inputString || '').trim().replace(/[^\w\s]/gi, '');

export const getNTAMasterRangeKey = (
  tableType: TableName,
  masterId: ObjectId,
  parentId?: ObjectId,
  institutionTypeId?: ObjectId
) => {
  return (
    `#MASTER` +
    `#MASTER_TYPE#${tableType}` +
    (institutionTypeId ? `#INSTITUTION_TYPE#${institutionTypeId}` : ``) +
    (parentId ? `#PARENT_ID#${parentId}` : ``) +
    `#MASTER_ID#${masterId}`
  );
};

export const getNTAMasterList = async <T>(
  ntaId: string,
  tableType: TableName
) => {
  return await DynamoDBActions.query({
    TableName: TABLE_NAMES.instituteTable,
    KeyConditionExpression:
      'tableType = :ntaItem and  begins_with(id, :master) ',
    ExpressionAttributeValues: {
      ':ntaItem': `#NTA#${ntaId}`,
      ':master': `#MASTER#MASTER_TYPE#${tableType}`,
    },
  }).then((result: { Items: T[] }) =>
    result.Items.filter(
      (item: any) => !(item as GeneralDBItem)?.isDeleted
    ).sort((item1: any, item2: any) =>
      (item1 as GeneralMasterItem).name > (item2 as GeneralMasterItem).name
        ? 1
        : -1
    )
  );
};

export const checkIfMasterListitemExistsById = async (
  ntaId: string,
  id: string
) => {
  return await DynamoDBActions.get(
    {
      tableType: `#NTA#${ntaId}`,
      id,
    },
    TABLE_NAMES.instituteTable
  ).then((result: { Item: GeneralMasterItem }) => !!result.Item);
};

export const checkIfMasterExistsByIdQuery = async (
  ntaId: string,
  id: string
) => {
  return await DynamoDBActions.query({
    KeyConditionExpression: 'tableType = :ntaItem and  id = :master',
    ExpressionAttributeValues: {
      ':ntaItem': `#NTA#${ntaId}`,
      ':master': id,
    },
    TableName: TABLE_NAMES.instituteTable,
  });
};

export const checkIfMasterListItemExistsByName = async (
  ntaId: string,
  tableType: TableName,
  masterName: string,
  institutionTypeId?: string
) => {
  return await DynamoDBActions.query({
    TableName: TABLE_NAMES.instituteTable,
    KeyConditionExpression: 'tableType = :ntaItem and begins_with(id, :id)',
    FilterExpression: '#name = :masterName',
    ExpressionAttributeValues: {
      ':ntaItem': `#NTA#${ntaId}`,
      ':id':
        `#MASTER#MASTER_TYPE#${tableType}` +
        (!!institutionTypeId ? `#INSTITUTION_TYPE#${institutionTypeId}` : ``),
      ':masterName': masterName,
    },
    ExpressionAttributeNames: {
      '#name': 'name',
    },
  }).then(
    (result) => !!result.Items.filter((item: any) => !item?.isDeleted).length
  );
};

export const getIdFromURLEvent = (event: APIGatewayProxyEvent) => {
  return decodeURIComponent(event.pathParameters?.id || '');
};

export const getNTAObjectById = async <T>(
  masterId: ObjectId,
  ntaId: ObjectId
) => {
  return await DynamoDBActions.get(
    {
      tableType: `#NTA#${ntaId}`,
      id: masterId,
    },
    TABLE_NAMES.instituteTable
  ).then((result: { Item: T }) =>
    !(result.Item as any)?.isDeleted ? result.Item : null
  );
};

export const setUpdationDetailsOfObject = (
  object: GeneralDBItem,
  event: APIGatewayProxyEvent
) => {
  const userId = event.headers.username;
  object.updated_by = userId;
  object.updated_at = new Date().toISOString();
};

export const base64Decode = (b64Encoded: string) =>
  Buffer.from(b64Encoded, 'base64').toString();

export const getFileExtension = (file: FileMetaData) =>
  file.name.split('.').slice(-1).pop() || '';

export class CreateS3FolderStructure {
  static getLogoPath(orgId: string, imageName: string) {
    return (
      S3_FOLDER_STRUCTURE.ORGANIZATION +
      '/' +
      orgId.replace(/#/g, '') +
      S3_FOLDER_STRUCTURE.IMAGES +
      S3_FOLDER_STRUCTURE.LOGO +
      '/' +
      imageName
    );
  }
  static getRegistrationDocumentPath(orgId: string, documentExtension: string) {
    return (
      S3_FOLDER_STRUCTURE.ORGANIZATION +
      '/' +
      orgId.replace(/#/g, '') +
      S3_FOLDER_STRUCTURE.REGISTRATION_DOCUMENTS +
      '/' +
      uuid() +
      '.' +
      documentExtension
    );
  }

  static getAffiliationDocumentPath(orgId: string, documentExtension: string) {
    return (
      S3_FOLDER_STRUCTURE.ORGANIZATION +
      '/' +
      orgId.replace(/#/g, '') +
      S3_FOLDER_STRUCTURE.AFFILIATION_DOCUMENTS +
      '/' +
      uuid() +
      '.' +
      documentExtension
    );
  }

  static getProfilePicturePath(
    orgId: string,
    documentExtension: string,
    profileId: string
  ) {
    return (
      S3_FOLDER_STRUCTURE.ORGANIZATION +
      '/' +
      orgId.replace(/#/g, '') +
      S3_FOLDER_STRUCTURE.PROFILE_META +
      '/' +
      profileId +
      S3_FOLDER_STRUCTURE.PROFILE_PICTURE +
      '/profile' +
      '.' +
      documentExtension
    );
  }
}

export const getOrgItemById = async <T>(orgId: string, itemId: string) => {
  return await DynamoDBActions.get({
    tableType: orgId,
    id: itemId,
  }).then((result: { Item: T }) => result.Item);
};

export const scanItemById = async <T>(itemId: string) => {
  return DynamoDBActions.scan(TABLE_NAMES.instituteTable, {
    ScanFilter: {
      id: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [itemId],
      },
    },
  }).then((result) => (result.Items ? (result.Items[0] as T) : null));
};

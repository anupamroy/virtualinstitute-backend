import * as aws from 'aws-sdk';
import { DecodedFile } from '../model/request-method.model';
import { S3 } from 'aws-sdk';
import { CONFIG } from '../constants/config';

const S3Object = new aws.S3();

export const uploadFileToS3 = async (Key: string, file: DecodedFile) => {
  const S3Params: S3.Types.PutObjectRequest = {
    Bucket: CONFIG.S3_BUCKETS.PRIMARY,
    Key,
    Body: file.content,
    ContentType: file.contentType,
    ACL: 'public-read',
  };
  return await S3Object.upload(S3Params).promise();
};

export const getSignedUrlS3 = async (Key: string, ContentType: string) => {
  // TODO: Insert Meta Data
  const S3Params: S3.Types.PutObjectRequest = {
    Bucket: CONFIG.S3_BUCKETS.PRIMARY,
    Key,
    ContentType,
    ACL: 'public-read',
  };
  console.log('S3Params', S3Params);
  return await S3Object.getSignedUrlPromise('putObject', S3Params);
};

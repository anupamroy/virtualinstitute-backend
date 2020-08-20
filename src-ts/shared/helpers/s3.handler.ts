import * as aws from 'aws-sdk';
import { S3_BUCKETS } from '../constants/common-vars';
import { DecodedFile } from '../model/request-method.model';
import { S3 } from 'aws-sdk';

const S3Object = new aws.S3();

export const uploadFileToS3 = async (Key: string, file: DecodedFile) => {
  var enc = new TextEncoder();

  const S3Params: S3.Types.PutObjectRequest = {
    Bucket: S3_BUCKETS.PRIMARY,
    Key,
    Body: file.content,
    ContentType: file.contentType,
    ACL: 'public-read',
  };
  console.log(file.contentType);
  // console.log(file.content, typeof file.content, enc.encode(file.content + ''));
  return await S3Object.upload(S3Params).promise();
};

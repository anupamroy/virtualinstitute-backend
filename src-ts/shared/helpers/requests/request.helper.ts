import { APIGatewayProxyEvent } from 'aws-lambda';
import { REQUEST_HEADERS, CognitoConfig } from '../../constants/common-vars';
import { base64Decode } from '../general.helpers';
const multipart = require('aws-lambda-multipart-parser');
// const busboy = require('busboy');

export const requestValidator = (object: any, classInstance: any) =>
  object && Object.keys(classInstance).every((key) => object[key]);

export const checkIfNTATokenValid = (event: APIGatewayProxyEvent) => {
  return (
    event.headers[REQUEST_HEADERS.ntaAPIPasskey] === CognitoConfig.ntaAPIPasskey
  );
};

export const parseMultiPart = (event: APIGatewayProxyEvent) =>
  // {
  //   var contentType =
  //     event.headers['Content-Type'] || event.headers['content-type'];
  //   var bb = new busboy({ headers: { 'content-type': contentType } });

  //   bb.on('file', function (fieldname, file, filename, encoding, mimetype) {
  //     console.log(
  //       'File [%s]: filename=%j; encoding=%j; mimetype=%j',
  //       fieldname,
  //       filename,
  //       encoding,
  //       mimetype
  //     );

  //     file
  //       .on('data', (data) =>
  //         console.log('File [%s] got %d bytes', fieldname, data.length)
  //       )
  //       .on('end', () => console.log('File [%s] Finished', fieldname));
  //   })
  //     .on('field', (fieldname, val) =>
  //       console.log('Field [%s]: value: %j', fieldname, val)
  //     )
  //     .on('finish', () => {
  //       console.log('Done parsing form!');
  //       // context.succeed({ statusCode: 200, body: 'all done', headers });
  //     })
  //     .on('error', (err) => {
  //       console.log('failed', err);
  //       // context.fail({ statusCode: 500, body: err, headers });
  //     });

  //   console.log('start parsing');
  //   console.log(event.body);
  //   bb.end(event.body);
  // };
  // new Promise((resolve, reject) => {
  //   const contentType =
  //     event.headers['Content-Type'] || event.headers['content-type'];
  //   const bb = new busboy({ headers: { 'content-type': contentType } });

  //   const data: any = {};

  //   bb.on(
  //     'file',
  //     (
  //       fieldname: string,
  //       file: any,
  //       filename: string,
  //       encoding: string,
  //       mimetype: string
  //     ) => {
  //       console.log(
  //         'File [%s]: filename=%j; encoding=%j; mimetype=%j',
  //         fieldname,
  //         filename,
  //         encoding,
  //         mimetype
  //       );

  //       file
  //         .on('data', (data) =>
  //           console.log('File [%s] got %d bytes', fieldname, data.length)
  //         )
  //         .on('end', () => console.log('File [%s] Finished', fieldname));
  //     }
  //   )
  //     .on('field', (fieldname: string, val: any) => {
  //       data[fieldname] = val;
  //     })
  //     .on('finish', () => {
  //       resolve(data);
  //     })
  //     .on('error', (err: any) => {
  //       reject(err);
  //     });

  //   bb.end(event.body);
  // });
  {
    const contentType =
      event.headers['Content-Type'] || event.headers['content-type'];
    // const bb = new busboy({ headers: { 'content-type': contentType }});
    const eventClone = { ...event, body: base64Decode(event.body || '') };
    const retval = multipart.parse(eventClone, true);

    console.log('------------parsed----------------');
    return retval;
  };

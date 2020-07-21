// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const dynamodb = require("aws-sdk/clients/dynamodb");

export const CommonItems = {
  documentClient: new dynamodb.DocumentClient(),
  // Get the DynamoDB table name from environment variables
  tableName: process.env.SAMPLE_TABLE,
};

namespace ResponseProcessing {
  export const createResponse = (
    statusCode: number,
    body: any | null | undefined
  ) => {
    return {
      statusCode,
      body: JSON.stringify(body),
    };
  };
}

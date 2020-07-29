export const requestValidator = (object: any, classInstance: any) =>
  object && Object.keys(classInstance).every((key) => object[key]);



import { createResponse } from "./handler";
import { APIResponse } from "../model/request-method.model";

export const unauthorisedAccessResponse = () =>
  createResponse(403, new APIResponse(true, "Unauthorised Access"));

export const keysMissingResponse = () =>
  createResponse(400, new APIResponse(true, "Some keys Missing"));

export const optionsResponse = () => createResponse(200, null);

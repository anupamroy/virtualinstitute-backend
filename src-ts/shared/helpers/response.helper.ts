import { createResponse } from './handler-common';
import { APIResponse } from '../model/request-method.model';
import { ERRORS } from '../constants/common.const';

export const unauthorisedAccessResponse = () =>
  createResponse(403, new APIResponse(true, ERRORS.GENERAL_UNAUTHORISED_ACCESS));

export const keysMissingResponse = () =>
  createResponse(400, new APIResponse(true, ERRORS.GENERAL_KEYS_MISSING));

export const optionsResponse = () => createResponse(200, null);

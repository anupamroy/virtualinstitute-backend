import { AWSHandler } from "../shared/helpers/handler";
import { listAllNTAAuthorities } from "./others/nta-admin.handler";
import {
  createNTAAuthority,
  listNTAAuthority,
} from "./others/nta-admin.handler";

export const createNTAAuthorityHandler = AWSHandler("POST", createNTAAuthority);
export const listNTAAuthorityHandler = AWSHandler("GET", listNTAAuthority);

export const listAllNTAAuthoritiesHandler = AWSHandler(
  "GET",
  listAllNTAAuthorities
);

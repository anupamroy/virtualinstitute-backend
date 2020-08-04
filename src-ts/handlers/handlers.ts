import { AWSHandler } from "../shared/helpers/handler-common";
import { listAllNTAAuthorities } from "./others/nta-admin.service";
import {
  createNTAAuthority,
  listNTAAuthority,
} from "./others/nta-admin.service";

export const createNTAAuthorityHandler = AWSHandler("POST", createNTAAuthority);
export const listNTAAuthorityHandler = AWSHandler("GET", listNTAAuthority);

export const listAllNTAAuthoritiesHandler = AWSHandler(
  "GET",
  listAllNTAAuthorities
);

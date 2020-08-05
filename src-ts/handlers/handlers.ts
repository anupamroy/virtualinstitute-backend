import { AWSHandler } from "../shared/helpers/handler-common";
import { listAllNTAAuthorities } from "./others/nta-admin.service";
import {
  createNTAAuthority,
  listNTAAuthority,
} from "./others/nta-admin.service";

const listAllNTAAuthoritiesHandler = AWSHandler("GET", listAllNTAAuthorities);
const listNTAAuthorityHandler = AWSHandler("GET", listNTAAuthority);

const createNTAAuthorityHandler = AWSHandler("POST", createNTAAuthority);

export {
  createNTAAuthorityHandler,
  listNTAAuthorityHandler,
  listAllNTAAuthoritiesHandler,
};

import { AWSHandler } from "../shared/helpers/handler-common";
import { listAllNTAAuthorities } from "../shared/services/nta-admin.service";
import {
  createNTAAuthority,
  listNTAAuthority,
} from "../shared/services/nta-admin.service";

// NTA Authority
const listAllNTAAuthoritiesHandler = AWSHandler("GET", listAllNTAAuthorities);
const listNTAAuthorityHandler = AWSHandler("GET", listNTAAuthority);
const createNTAAuthorityHandler = AWSHandler("POST", createNTAAuthority);

export {
  createNTAAuthorityHandler,
  listNTAAuthorityHandler,
  listAllNTAAuthoritiesHandler,
};

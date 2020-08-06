import { AWSHandler } from '../shared/helpers/handler-common';
import {
  listAllNTAAuthorities,
  createNTAUser,
  deleteNTAUser,
} from '../shared/services/nta-authority.service';
import {
  createNTAAuthority,
  listNTAAuthority,
} from '../shared/services/nta-authority.service';
import {
  checkToken,
  newPasswordChallenge,
} from '../shared/services/nta-institute.service';

// NTA Authority
const listAllNTAAuthoritiesHandler = AWSHandler('GET', listAllNTAAuthorities);
const listNTAAuthorityHandler = AWSHandler('GET', listNTAAuthority);
const createNTAAuthorityHandler = AWSHandler('POST', createNTAAuthority);

const createNTAUserHandler = AWSHandler('POST', createNTAUser);
const deleteNTAUserHandler = AWSHandler('DELETE', deleteNTAUser);

const checkTokenHandler = AWSHandler('GET', checkToken);
const newPasswordChallengeHandler = AWSHandler('POST', newPasswordChallenge);

export {
  createNTAAuthorityHandler,
  listNTAAuthorityHandler,
  listAllNTAAuthoritiesHandler,
  createNTAUserHandler,
  deleteNTAUserHandler,
  checkTokenHandler,
  newPasswordChallengeHandler,
};

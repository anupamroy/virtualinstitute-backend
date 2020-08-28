import { AWSHandler } from '../shared/helpers/handler-common';
import { createInstituteType } from '../shared/services/nta-global.service';

const createInstituteTypeHandler = AWSHandler('POST', createInstituteType);

export { createInstituteTypeHandler };

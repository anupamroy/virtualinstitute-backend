import { GeneralMasterItem } from './imports/misc.DB.model';
import { LinkURL } from './imports/types.DB.model';

export class DBInstititutionTypeMaster extends GeneralMasterItem {
  tableType: string = '#INSTITUTION_TYPE_MASTER';
}
export class DBAddressTextMaster extends GeneralMasterItem {
  tableType: string = '#ADDRESS_TEXT_MASTER';
}
export class DBPhoneTextMaster extends GeneralMasterItem {
  tableType: string = '#PHONE_TEXT_MASTER';
}
export class DBPhoneAssociatedPostMaster extends GeneralMasterItem {
  tableType: string = '#PHONE_ASSOCIATED_POST_MASTER';
}
export class DBPhoneTypeMaster extends GeneralMasterItem {
  tableType: string = '#PHONE_TYPE_MASTER';
}
export class DBEmailTextMaster extends GeneralMasterItem {
  tableType: string = '#EMAIL_TEXT_MASTER';
}
export class DBEmailAssociatedPostMaster extends GeneralMasterItem {
  tableType: string = '#EMAIL_ASSOCIATED_POST_MASTER';
}
export class DBEmailTypeMaster extends GeneralMasterItem {
  tableType: string = '#EMAIL_TYPE_MASTER';
}
export class DBSocialMediaMaster extends GeneralMasterItem {
  tableType: string = '#SOCIAL_MEDIA_MASTER';
  icon: LinkURL = '';
}
export class DBRegistrationTypeMaster extends GeneralMasterItem {
  tableType: string = '#REGISTRATION_TYPE_MASTER';
}
export class DBRegistrationDocumentTypeMaster extends GeneralMasterItem {
  tableType: string = '#REGISTRATION_DOCUMENT_TYPE_MASTER';
}
export class DBInstitutionAffiliationGradeMaster extends GeneralMasterItem {
  tableType: string = '#INSTITUTE_AFFILIATION_GRADE_MASTER';
}
export class DBInstitutionAffiliationStatusMaster extends GeneralMasterItem {
  tableType: string = '#INSTITUTION_AFFILIATION_STATUS_MASTER';
}
export class DBInstitutionAffiliationTypeMaster extends GeneralMasterItem {
  tableType: string = '#INSTITUTION_AFFILIATION_TYPE_MASTER';
}
export class DBInstitutionAffiliationAuthorityMaster extends GeneralMasterItem {
  tableType: string = '#INSTITUTION_AFFILIATION_AUTHORITY_MASTER';
}

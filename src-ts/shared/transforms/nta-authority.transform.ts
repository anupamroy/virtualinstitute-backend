import {
  CreateOrganizationRequest,
  CreateOrgAddressRequest,
  CreateOrgPhoneNumberRequest,
  CreateOrgEmailRequest,
  CreateOrgRegistrationRequest,
  CreateOrgDocumentRequest,
  CreateOrgSettingsRequest,
  CreateOrgSubscriptionRequest,
  CreateOrgAffiliationRequest,
} from "../model/request-method.model";
import {
  DBOrganization,
  DBORGAddress,
  DBOrgPhone,
  DBOrgEmail,
  DBOrgRegistration,
  DBOrgDocument,
  DBOrgSettings,
  DBOrgSubscription,
  DBOrgAffiliation,
} from "../model/DB/org.DB.model";

export const setValuesInOrg = (
  body: CreateOrganizationRequest,
  organization: DBOrganization
) => {
  organization.name = body.organizationName;
  organization.orgInstituteType = body.organizationType;
  organization.orgShortCode =
    body.organizationShortCode || organization.getShortCode();
};

export const setValuesInOrgAddress = (
  body: CreateOrgAddressRequest,
  orgAddress: DBORGAddress
) => {
  orgAddress.address = body.address;
  orgAddress.addressText = body.addressText;
};

export const setValuesInOrgPhone = (
  body: CreateOrgPhoneNumberRequest,
  orgPhoneNumber: DBOrgPhone
) => {
  orgPhoneNumber.phoneText = body.phoneText;
  orgPhoneNumber.phone = body.phone;
  orgPhoneNumber.phoneType = body.phoneType;
  orgPhoneNumber.phoneTimings = body.phoneTimings;
  orgPhoneNumber.phoneDays = body.phoneDays;
  orgPhoneNumber.phoneShift = body.phoneShift;
  orgPhoneNumber.associatedPost = body.associatedPost;
};

export const setValesInOrgEmail = (
  body: CreateOrgEmailRequest,
  orgEmail: DBOrgEmail
) => {
  orgEmail.emailText = body.emailText;
  orgEmail.emailId = body.emailId;
  orgEmail.emailType = body.emailType;
  orgEmail.emailDays = body.emailDays;
  orgEmail.associatedPost = body.associatedPost;
};

export const setValuesInOrgRegistration = (
  body: CreateOrgRegistrationRequest,
  orgRegistration: DBOrgRegistration
) => {
  orgRegistration.registrationType = body.registrationNumber;
  orgRegistration.registrationNumber = body.registrationNumber;
};

export const setValuesInOrgDocument = (
  body: CreateOrgDocumentRequest,
  orgDocument: DBOrgDocument
) => {
    orgDocument.documentNumber = body.documentNumber;
  orgDocument.documentValidUpto = body.documentValidUpto;
  orgDocument.documentType = body.documentType;
};

export const setValuesInOrgSettings = (body: CreateOrgSettingsRequest, orgSettings: DBOrgSettings) => {
    orgSettings.otp = body.otp;
    orgSettings.password = body.password;
}

export const setValuesInOrgSubscription = (body: CreateOrgSubscriptionRequest, orgSubscription: DBOrgSubscription) => {
    orgSubscription.moduleId = body.moduleId;
    orgSubscription.subscriptionPackageId = body.subscriptionPackageId;
    orgSubscription.subscriptionFrom = body.subscriptionFrom;
    orgSubscription.subscriptionUpto = body.subscriptionUpto;
    orgSubscription.subscriptionTypeId = body.subscriptionTypeId;
}

export const setValuesInOrgAffiliation = (body: CreateOrgAffiliationRequest, orgAffiliation: DBOrgAffiliation) => {
    orgAffiliation.affiliationStartDate = body.affiliationStartDate;
  orgAffiliation.affiliationEndDate = body.affiliationEndDate;
  orgAffiliation.affiliationAuthority = body.affiliationAuthority;
  orgAffiliation.affiliationGrade = body.affiliationGrade;
  orgAffiliation.affiliationStatus = body.affiliationStatus;
  orgAffiliation.affiliationType = body.affiliationType;
}
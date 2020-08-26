"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getProfilePicturePath = exports.getAffiliationDocumentPath = exports.getOrgRegistrationDocumentPath = exports.getOrgLogoPath = exports.createInstituteMasterUserFunction = exports.getNTAById = exports.getNTAofUser = exports.getNTAIdofUser = exports.insertCognitoUserIninstituteFunction = exports.insertCognitoUserInNTAFunction = exports.createOrganizationMasterUserFunction = exports.getNTAByIDFunction = exports.GetCurrentUserDetailsFunction = exports.GetOrgOfCurrentUserFunction = exports.GetOrganizationByIdFunction = exports.listAllNTAAuthoritiesFunction = exports.createOrgAffiliationFunction = exports.createOrgSubscriptionFunction = exports.createOrgSettingsFunction = exports.createOrgDocumentFunction = exports.createOrgRegistrationFunction = exports.createOrgEmailFunction = exports.createOrgPhoneNumberFunction = exports.createOrgAddressFunction = exports.createOrganizationFunction = void 0;
var nta_DB_model_1 = require("../model/DB/nta.DB.model");
var db_handler_1 = require("../helpers/db-handler");
var common_vars_1 = require("../constants/common-vars");
var general_helpers_1 = require("../helpers/general.helpers");
var org_DB_model_1 = require("../model/DB/org.DB.model");
var response_model_1 = require("../model/response.model");
var cognito_actions_1 = require("../helpers/cognito/cognito.actions");
var institute_DB_model_1 = require("../model/DB/institute.DB.model");
var nta_authority_transform_1 = require("../transforms/nta-authority.transform");
var handler_common_1 = require("../helpers/handler-common");
var general_helpers_2 = require("../helpers/general.helpers");
// *Create NTA Authority
exports.createOrganizationFunction = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var organization;
    return __generator(this, function (_a) {
        organization = new org_DB_model_1.DBOrganization();
        nta_authority_transform_1.setValuesInOrg(body, organization);
        organization.orgLogo = exports.getOrgLogoPath(organization, body);
        return [2 /*return*/, db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(organization), new response_model_1.FileUrlObject(organization.tableType.replace('#', ''), organization.orgLogo))];
    });
}); };
exports.createOrgAddressFunction = function (body, orgId) { return __awaiter(void 0, void 0, void 0, function () {
    var orgAddress;
    return __generator(this, function (_a) {
        orgAddress = new org_DB_model_1.DBORGAddress(orgId);
        nta_authority_transform_1.setValuesInOrgAddress(body, orgAddress);
        return [2 /*return*/, db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(orgAddress))];
    });
}); };
exports.createOrgPhoneNumberFunction = function (body, orgId) { return __awaiter(void 0, void 0, void 0, function () {
    var orgPhoneNumber;
    return __generator(this, function (_a) {
        orgPhoneNumber = new org_DB_model_1.DBOrgPhone(orgId);
        nta_authority_transform_1.setValuesInOrgPhone(body, orgPhoneNumber);
        return [2 /*return*/, db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(orgPhoneNumber))];
    });
}); };
exports.createOrgEmailFunction = function (body, orgId) { return __awaiter(void 0, void 0, void 0, function () {
    var orgEmail;
    return __generator(this, function (_a) {
        orgEmail = new org_DB_model_1.DBOrgEmail(orgId);
        nta_authority_transform_1.setValesInOrgEmail(body, orgEmail);
        return [2 /*return*/, db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(orgEmail))];
    });
}); };
exports.createOrgRegistrationFunction = function (body, orgId) { return __awaiter(void 0, void 0, void 0, function () {
    var orgRegistration;
    return __generator(this, function (_a) {
        orgRegistration = new org_DB_model_1.DBOrgRegistration(orgId);
        nta_authority_transform_1.setValuesInOrgRegistration(body, orgRegistration);
        orgRegistration.registrationCertificateLink = exports.getOrgRegistrationDocumentPath(orgId, body.registrationCertificate);
        return [2 /*return*/, db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(orgRegistration), new response_model_1.FileUrlObject(orgId, orgRegistration.registrationCertificateLink))];
    });
}); };
exports.createOrgDocumentFunction = function (body, orgId) { return __awaiter(void 0, void 0, void 0, function () {
    var orgDocument;
    return __generator(this, function (_a) {
        orgDocument = new org_DB_model_1.DBOrgDocument(orgId);
        nta_authority_transform_1.setValuesInOrgDocument(body, orgDocument);
        orgDocument.documentLink = exports.getOrgRegistrationDocumentPath(orgId, body.document);
        return [2 /*return*/, db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(orgDocument), new response_model_1.FileUrlObject(orgId, orgDocument.documentLink))];
    });
}); };
exports.createOrgSettingsFunction = function (body, orgId) { return __awaiter(void 0, void 0, void 0, function () {
    var orgSettings;
    return __generator(this, function (_a) {
        orgSettings = new org_DB_model_1.DBOrgSettings(orgId);
        nta_authority_transform_1.setValuesInOrgSettings(body, orgSettings);
        return [2 /*return*/, db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(orgSettings))];
    });
}); };
exports.createOrgSubscriptionFunction = function (body, orgId) { return __awaiter(void 0, void 0, void 0, function () {
    var orgSubscription;
    return __generator(this, function (_a) {
        orgSubscription = new org_DB_model_1.DBOrgSubscription(orgId);
        nta_authority_transform_1.setValuesInOrgSubscription(body, orgSubscription);
        return [2 /*return*/, db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(orgSubscription))];
    });
}); };
exports.createOrgAffiliationFunction = function (body, orgId) { return __awaiter(void 0, void 0, void 0, function () {
    var orgAffiliation;
    return __generator(this, function (_a) {
        orgAffiliation = new org_DB_model_1.DBOrgAffiliation(orgId);
        nta_authority_transform_1.setValuesInOrgAffiliation(body, orgAffiliation);
        orgAffiliation.certificationDocumentLink = exports.getAffiliationDocumentPath(orgId, body.certificationDocument);
        return [2 /*return*/, db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(orgAffiliation), new response_model_1.FileUrlObject(orgId, orgAffiliation.certificationDocumentLink))];
    });
}); };
exports.listAllNTAAuthoritiesFunction = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, db_handler_1.processDynamoDBResponse(general_helpers_1.getContentsByType(common_vars_1.TABLE_NAMES.instituteTable, 'NTA_AUTHORITY'))];
    });
}); };
// TODO: Later
exports.GetOrganizationByIdFunction = function (ntaId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, db_handler_1.processDynamoDBResponse(exports.getNTAByIDFunction(ntaId))];
    });
}); };
exports.GetOrgOfCurrentUserFunction = function (cognitoUserSub) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, general_helpers_1.scanItemById('#USER#ADMIN#' + cognitoUserSub)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, general_helpers_2.getOrgItemById((user === null || user === void 0 ? void 0 : user.tableType) + '', (user === null || user === void 0 ? void 0 : user.tableType) + '#META')];
        }
    });
}); };
exports.GetCurrentUserDetailsFunction = function (cognitoUserSub) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, general_helpers_1.scanItemById('#USER#ADMIN#' + cognitoUserSub)];
    });
}); };
exports.getNTAByIDFunction = function (orgId) {
    return db_handler_1.DynamoDBActions.get({
        id: '#' + orgId + '#META',
        tableType: '#' + orgId
    });
};
exports.createOrganizationMasterUserFunction = function (body, orgId) { return __awaiter(void 0, void 0, void 0, function () {
    var org;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getNTAById(orgId)];
            case 1:
                org = _a.sent();
                console.log('createOrganizationMasterUserFunction', org);
                if (!org) {
                    return [2 /*return*/, handler_common_1.createErrorResponse('No Such Organization')];
                }
                return [2 /*return*/, org.orgType === 'SELLER'
                        ? cognito_actions_1.cognitoActions.addNTAUser(body, org.tableType)
                        : exports.createInstituteMasterUserFunction(body, orgId)];
        }
    });
}); };
exports.insertCognitoUserInNTAFunction = function (orgId, cognitoUserSub, picture) { return __awaiter(void 0, void 0, void 0, function () {
    var ntaUser;
    return __generator(this, function (_a) {
        ntaUser = new nta_DB_model_1.NTAUser();
        ntaUser.username = cognitoUserSub;
        ntaUser.orgId = orgId;
        ntaUser.tableType = orgId;
        ntaUser.picture = exports.getProfilePicturePath(orgId, picture, cognitoUserSub);
        ntaUser.id = "#USER#ADMIN#" + cognitoUserSub;
        return [2 /*return*/, db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(ntaUser, common_vars_1.TABLE_NAMES.instituteTable), new response_model_1.FileUrlObject(cognitoUserSub, ntaUser.picture))];
    });
}); };
exports.insertCognitoUserIninstituteFunction = function (orgId, cognitoUserSub, picture) { return __awaiter(void 0, void 0, void 0, function () {
    var instituteUser;
    return __generator(this, function (_a) {
        instituteUser = new institute_DB_model_1.InstituteUser();
        instituteUser.instituteId = orgId;
        instituteUser.cognitoUserId = cognitoUserSub;
        instituteUser.tableType = '#' + orgId;
        instituteUser.picture = exports.getProfilePicturePath(orgId, picture, cognitoUserSub);
        return [2 /*return*/, db_handler_1.processDynamoDBResponse(db_handler_1.DynamoDBActions.putItem(instituteUser), new response_model_1.FileUrlObject(cognitoUserSub, instituteUser.picture))];
    });
}); };
exports.getNTAIdofUser = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var cognitoUser, userId, user;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, general_helpers_1.getCognitoUserFromToken(event)];
            case 1:
                cognitoUser = _b.sent();
                userId = ((_a = cognitoUser.UserAttributes.find(function (attr) { return attr.Name === 'sub'; })) === null || _a === void 0 ? void 0 : _a.Value) + '';
                return [4 /*yield*/, db_handler_1.DynamoDBActions.get({ id: userId }, common_vars_1.TABLE_NAMES.instituteTable)];
            case 2:
                user = _b.sent();
                return [2 /*return*/, user.orgId];
        }
    });
}); };
exports.getNTAofUser = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var ntaId, nta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ntaId = exports.getNTAIdofUser(event);
                return [4 /*yield*/, db_handler_1.DynamoDBActions.get({ id: ntaId }, common_vars_1.TABLE_NAMES.instituteTable)];
            case 1:
                nta = _a.sent();
                return [2 /*return*/, nta];
        }
    });
}); };
exports.getNTAById = function (orgId) {
    return db_handler_1.DynamoDBActions.get({
        tableType: '#' + orgId,
        id: '#' + orgId + '#META'
    }).then(function (org) { return org.Item; });
};
exports.createInstituteMasterUserFunction = function (body, orgId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, cognito_actions_1.cognitoActions
                .addInstituteUserFunction(body)
                .then(function (user) {
                var _a, _b, _c;
                return exports.insertCognitoUserIninstituteFunction(orgId, ((_c = (_b = (_a = user.User) === null || _a === void 0 ? void 0 : _a.Attributes) === null || _b === void 0 ? void 0 : _b.find(function (attr) { return attr.Name === 'sub'; })) === null || _c === void 0 ? void 0 : _c.Value) + '', body.picture);
            })];
    });
}); };
// *Get File Paths
exports.getOrgLogoPath = function (organization, body) {
    var extension = general_helpers_1.getFileExtension(body.organizationIcon);
    var logoUrl = general_helpers_1.CreateS3FolderStructure.getLogoPath(organization.tableType, 'logo.' + extension);
    return logoUrl;
};
exports.getOrgRegistrationDocumentPath = function (orgId, fileMetaData) {
    var extension = general_helpers_1.getFileExtension(fileMetaData);
    return general_helpers_1.CreateS3FolderStructure.getRegistrationDocumentPath(orgId, extension);
};
exports.getAffiliationDocumentPath = function (orgId, fileMetaData) {
    var extension = general_helpers_1.getFileExtension(fileMetaData);
    return general_helpers_1.CreateS3FolderStructure.getAffiliationDocumentPath(orgId, extension);
};
exports.getProfilePicturePath = function (orgId, fileMetaData, profileId) {
    var extension = general_helpers_1.getFileExtension(fileMetaData);
    return general_helpers_1.CreateS3FolderStructure.getProfilePicturePath(orgId, extension, profileId);
};

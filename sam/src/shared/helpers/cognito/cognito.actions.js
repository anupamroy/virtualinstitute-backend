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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cognitoActions = exports.CognitoActions = void 0;
const common_vars_1 = require("../../constants/common-vars");
const response_helper_1 = require("../response.helper");
const handler_common_1 = require("../handler-common");
const request_model_1 = require("../../model/request.model");
const cognito_transform_1 = require("../../transforms/cognito.transform");
const cognito_functions_1 = require("../../functions/cognito.functions");
const request_method_model_1 = require("../../model/request-method.model");
const guard_1 = require("../requests/guard");
const nta_functions_1 = require("../../functions/nta.functions");
class CognitoActions {
    addStudent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            //   const body = parseBody<CreateStudentRequest>(event.body);
            //   return requestValidatorGuard(
            //     body,
            //     new CreateStudentRequest(),
            //     this.addStudentFunction,
            //     [body]
            //   );
        });
    }
    // async addStudentFunction(body: CreateStudentRequest) {
    //   const request: AdminCreateUserRequest = createCognitoStudentObject(
    //     body.registrationNumber,
    //     body
    //   );
    //   return createCognitoUser(request);
    // }
    addNTAUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = handler_common_1.parseBody(event.body);
            return yield guard_1.NTATokenGuard(event, yield guard_1.requestValidatorGuard(body, new request_model_1.CreatePersonRequest(), this.addNTAUserFunction, [body, event]));
        });
    }
    addNTAUserFunction(body, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const ntaId = event.headers["Nta-Authority-Id"];
            const request = cognito_transform_1.createCognitoNTAUserObject(body);
            return common_vars_1.cognito
                .adminCreateUser(request)
                .promise()
                .then((user) => {
                var _a, _b, _c;
                return nta_functions_1.insertCognitoUserInNTAFunction(ntaId, ((_c = (_b = (_a = user.User) === null || _a === void 0 ? void 0 : _a.Attributes) === null || _b === void 0 ? void 0 : _b.find((attr) => attr.Name === "sub")) === null || _c === void 0 ? void 0 : _c.Value) + "");
            })
                .catch((e) => handler_common_1.createResponse(422, new request_method_model_1.APIResponse(true, e.message, e)));
        });
    }
    setNTAPassword(event) {
        const body = handler_common_1.parseBody(event.body);
        const mobile = body === null || body === void 0 ? void 0 : body.mobile;
        const session = body === null || body === void 0 ? void 0 : body.session;
        if (mobile && session) {
            return cognito_functions_1.setUserPassword(mobile, session);
        }
        else {
            return response_helper_1.keysMissingResponse();
        }
    }
    deleteNTAUser(event) {
        return guard_1.NTATokenGuard(event, this.deleteNTAFunction);
    }
    deleteNTAFunction(event) {
        var _a;
        const mobile = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.mobile;
        if (mobile) {
            return cognito_functions_1.deleteCognitoUser(common_vars_1.CognitoConfig.ntaUserPoolId, mobile);
        }
        else {
            return handler_common_1.createResponse(400, new request_method_model_1.APIResponse(true, "Key mobile Missing in URL"));
        }
    }
}
exports.CognitoActions = CognitoActions;
exports.cognitoActions = new CognitoActions();

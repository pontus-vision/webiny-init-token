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
const graphql_request_1 = require("graphql-request");
const apis_1 = require("./apis");
const cognito_login_1 = require("./cognito-login");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const cognitoUserSession = yield (0, cognito_login_1.login)(process.env["AWS_COGNITO_USERNAME"] || "", process.env["AWS_COGNITO_PASSWORD"] || "", process.env["AWS_COGNITO_USER_POOL_ID"] || "", process.env["AWS_COGNITO_CLIENT_ID"] || "");
    console.log(`${JSON.stringify(cognitoUserSession.getAccessToken().payload)}`);
}))();
const query = ({ query = "", variables = {} } = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, graphql_request_1.request)(process.env.API_URL + "/graphql", query, variables, {
        authorization: process.env.WEBINY_API_KEY || "",
    });
});
const installSecurity = () => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield query({
        query: apis_1.INSTALL_SECURITY,
    });
    console.log(resp);
});
const installAdminUsers = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield query({
        query: apis_1.INSTALL_ADMIN_USERS,
        variables: {
            data: {
                data,
            },
        },
    });
    console.log(resp);
});
const installI18N = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield query({
        query: apis_1.INSTALL_ADMIN_USERS,
        variables: {
            data: {
                data,
            },
        },
    });
    console.log(resp);
});
const installFileManager = () => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield query({
        query: apis_1.INSTALL_FILE_MANAGER,
    });
    console.log(resp);
});
const installPageBuilder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield query({
        query: apis_1.INSTALL_PAGE_BUILDER,
        variables: {
            data: {
                data,
            },
        },
    });
});
const installFormBuilder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield query({
        query: apis_1.INSTALL_FORM_BUILDER,
        variables: {
            data: {
                data,
            },
        },
    });
});

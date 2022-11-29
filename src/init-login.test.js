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
const installAdminUsers = (firstName, lastName, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield query({
        query: apis_1.INSTALL_ADMIN_USERS,
        variables: {
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            },
        },
    });
    console.log(resp);
});

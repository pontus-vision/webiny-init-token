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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
// const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const amazon_cognito_identity_js_1 = __importDefault(require("amazon-cognito-identity-js"));
global.fetch = require("node-fetch");
const login = (username, password, userPoolId, clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const userPool = new amazon_cognito_identity_js_1.default.CognitoUserPool({
        UserPoolId: userPoolId,
        ClientId: clientId,
    });
    const userData = {
        Username: username,
        Pool: userPool,
    };
    const authenticationDetails = new amazon_cognito_identity_js_1.default.AuthenticationDetails({
        Username: username,
        Password: password,
    });
    return new Promise((resolve, reject) => {
        const cognitoUser = new amazon_cognito_identity_js_1.default.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (session, userConfirmationNecessary) => {
                resolve(session);
            },
            onFailure: function (err) {
                console.log(`An error occurred while executing login command ("cognitoUser.authenticateUser")`, err);
                reject(err);
            },
            newPasswordRequired: function (userAttributes) {
                delete userAttributes.email_verified; // it's returned but not valid to submit
                const newPassword = "12345678";
                userAttributes.email = username;
                cognitoUser.completeNewPasswordChallenge(newPassword, null, {
                    /* @ts-ignore */
                    onSuccess: resolve,
                    onFailure: function (err) {
                        console.log(`An error occurred while executing login command ("cognitoUser.completeNewPasswordChallenge")`, err, userAttributes);
                        reject(err);
                    },
                });
            },
        });
        return cognitoUser;
    });
});
exports.login = login;

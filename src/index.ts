import { request } from "graphql-request";
import {
  INSTALL_ADMIN_USERS,
  INSTALL_FILE_MANAGER,
  INSTALL_FORM_BUILDER,
  INSTALL_PAGE_BUILDER,
  INSTALL_SECURITY,
} from "./apis";
import {
  CreateUserData,
  InstallFormBuilderData,
  InstallI18NData,
  InstallPageBuilderData,
} from "./types";
import { login } from "./cognito-login";

(async () => {
  const userName = process.env["AWS_COGNITO_USERNAME"] || "";
  const password = process.env["AWS_COGNITO_PASSWORD"] || "";
  const userPoolId = process.env["AWS_COGNITO_USER_POOL_ID"] || "";
  const clientId = process.env["AWS_COGNITO_CLIENT_ID"] || "";

  try {
    const cognitoUserSession = await login(
      userName,
      password,
      userPoolId,
      clientId
    );
  console.log(`${JSON.stringify(cognitoUserSession.getAccessToken().payload)}`);
  
    
  } catch (error) {
    console.log(`error: ${error}`);
    
  }

})();

const query = async ({ query = "", variables = {} } = {}) => {
  return request(process.env.API_URL + "/graphql", query, variables, {
    authorization: process.env.WEBINY_API_KEY || "",
  });
};

const installSecurity = async () => {
  const resp = await query({
    query: INSTALL_SECURITY,
  });

  console.log(resp);
};

const installAdminUsers = async (data: CreateUserData) => {
  const resp = await query({
    query: INSTALL_ADMIN_USERS,
    variables: {
      data: {
        data,
      },
    },
  });

  console.log(resp);
};

const installI18N = async (data: InstallI18NData) => {
  const resp = await query({
    query: INSTALL_ADMIN_USERS,
    variables: {
      data: {
        data,
      },
    },
  });

  console.log(resp);
};

const installFileManager = async () => {
  const resp = await query({
    query: INSTALL_FILE_MANAGER,
  });

  console.log(resp);
};

const installPageBuilder = async (data: InstallPageBuilderData) => {
  const resp = await query({
    query: INSTALL_PAGE_BUILDER,
    variables: {
      data: {
        data,
      },
    },
  });
};

const installFormBuilder = async (data: InstallFormBuilderData) => {
  const resp = await query({
    query: INSTALL_FORM_BUILDER,
    variables: {
      data: {
        data,
      },
    },
  });
};

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
import { getUserPoolClientId } from './cognito-userpool';


const query = async (authorizationHeader: string, { query = "", variables = {} } = {}) => {
  return request(process.env.API_URL + "/graphql", query, variables, {
    authorization: process.env.WEBINY_API_KEY || "",
  });
};

const installSecurity = async (authorizationHeader: string): Promise<void> => {
  const resp = await query(authorizationHeader,{
    query: INSTALL_SECURITY,
  });

  console.log(resp);
};

const installAdminUsers = async (authorizationHeader: string,data: CreateUserData):Promise<void> => {
  const resp = await query(authorizationHeader,{
    query: INSTALL_ADMIN_USERS,
    variables: {
      data: {
        data,
      },
    },
  });

  console.log(resp);
};

const installI18N = async (authorizationHeader: string, data: InstallI18NData) => {
  const resp = await query(authorizationHeader,{
    query: INSTALL_ADMIN_USERS,
    variables: {
      data: {
        data,
      },
    },
  });

  console.log(resp);
};

const installFileManager = async (authorizationHeader: string) => {
  const resp = await query(authorizationHeader,{
    query: INSTALL_FILE_MANAGER,
  });

  console.log(resp);
};

const installPageBuilder = async (authorizationHeader: string,data: InstallPageBuilderData) => {
  const resp = await query(authorizationHeader,{
    query: INSTALL_PAGE_BUILDER,
    variables: {
      data: {
        data,
      },
    },
  });
};

const installFormBuilder = async (authorizationHeader: string,data: InstallFormBuilderData) => {
  const resp = await query(authorizationHeader,{
    query: INSTALL_FORM_BUILDER,
    variables: {
      data: {
        data,
      },
    },
  });
};

(async () => {
  const userName = process.env["AWS_COGNITO_USERNAME"] || "";
  const password = process.env["AWS_COGNITO_PASSWORD"] || "";

  const userPoolId = await getUserPoolClientId('pr55');// process.env["AWS_COGNITO_USER_POOL_ID"] || "";
  const clientId = process.env["AWS_COGNITO_CLIENT_ID"] || "";

  try {
    const cognitoUserSession = await login(
      userName,
      password,
      userPoolId.userPoolId || process.env["AWS_COGNITO_USER_POOL_ID"] || '',
      userPoolId.clientId || clientId
    );
    console.log(`${JSON.stringify(cognitoUserSession.getAccessToken().payload)}`);
    const authorizationHeader = `Bearer ${cognitoUserSession?.getAccessToken().getJwtToken()}` 

    await installSecurity(authorizationHeader);


  } catch (error) {
    console.log(`error: ${error}`);

  }

})();


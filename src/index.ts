import { request } from "graphql-request";
import {
  INSTALL_ADMIN_USERS,
  INSTALL_FILE_MANAGER,
  INSTALL_FORM_BUILDER,
  INSTALL_PAGE_BUILDER,
  INSTALL_SECURITY,
} from "./apis";
import {
  CreateApiKeyData,
  CreateApiKeyOutput,
  CreateUserData,
  InstallFormBuilderData,
  InstallI18NData,
  InstallPageBuilderData,
} from "./types";
import { login } from "./cognito-login";
import { getUserPoolClientId } from "./cognito-userpool";
import { getCurrentToken, setCurrentToken } from "./s3-token-store";

const query = async (
  authorizationHeader: string | undefined,
  { query = "", variables = {} } = {}
) => {
  return request(process.env.API_URL + "/graphql", query, variables, {
    authorization: authorizationHeader || process.env.WEBINY_API_KEY || "",
  });
};

const installSecurity = async (): Promise<void> => {
  const resp = await query(undefined, {
    query: INSTALL_SECURITY,
  });

  console.log(resp);
};

const installAdminUsers = async (data: CreateUserData): Promise<void> => {
  const resp = await query(undefined, {
    query: INSTALL_ADMIN_USERS,
    variables: {
      data: {
        data,
      },
    },
  });

  console.log(resp);
};

const installI18N = async (
  authorizationHeader: string,
  data: InstallI18NData
) => {
  const resp = await query(authorizationHeader, {
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
  const resp = await query(authorizationHeader, {
    query: INSTALL_FILE_MANAGER,
  });

  console.log(resp);
};

const installPageBuilder = async (
  authorizationHeader: string,
  data: InstallPageBuilderData
) => {
  const resp = await query(authorizationHeader, {
    query: INSTALL_PAGE_BUILDER,
    variables: {
      data: {
        data,
      },
    },
  });
};

const installFormBuilder = async (
  authorizationHeader: string,
  data: InstallFormBuilderData
) => {
  const resp = await query(authorizationHeader, {
    query: INSTALL_FORM_BUILDER,
    variables: {
      data: {
        data,
      },
    },
  });
};

const createApiKey = async (
  authorizationHeader: string,
  data: CreateApiKeyData
): Promise<CreateApiKeyOutput> => {
  const resp = await query(authorizationHeader, {
    query: INSTALL_FORM_BUILDER,
    variables: {
      data,
    },
  });
  return resp;
};

(async () => {
  const userName = process.env["AWS_COGNITO_USERNAME"] || "";
  const password = process.env["AWS_COGNITO_PASSWORD"] || "";
  const webinyEnv = process.env["WEBINY_ENV"] || "";

  try {
    const userPoolId = await getUserPoolClientId(webinyEnv); // process.env["AWS_COGNITO_USER_POOL_ID"] || "";
    const clientId = process.env["AWS_COGNITO_CLIENT_ID"] || "";


    let token = await getCurrentToken(webinyEnv)
    if (!token) {
      await installSecurity();
      await installAdminUsers({
        email: userName,
        password: password,
        firstName: "admin",
        lastName: "admin",
      });

      const cognitoUserSession = await login(
        userName,
        password,
        userPoolId.userPoolId || process.env["AWS_COGNITO_USER_POOL_ID"] || "",
        userPoolId.clientId || clientId
      );
      console.log(
        `${JSON.stringify(cognitoUserSession.getAccessToken().payload)}`
      );

      const authorizationHeader = `Bearer ${cognitoUserSession
        ?.getAccessToken()
        .getJwtToken()}`;
      await installI18N(authorizationHeader, {
        code: "pt-BR",
      });

      await installFileManager(authorizationHeader);
      await installFormBuilder(authorizationHeader, {
        domain: 'test.com'
      });



      const tokenData = await createApiKey(authorizationHeader, {
        name: "test123",
        description: "test123",
        permissions: [
          {
            name: "content.i18n",
          },
          {
            name: "cms.*",
          },
          {
            name: "adminUsers.*",
          },
        ],
      });

      token = tokenData.data.security.apiKey.data.token;
      
      setCurrentToken(webinyEnv,token)

    }

    console.log(token)




  } catch (error) {
    console.log(`error: ${error}`);
  }
})();

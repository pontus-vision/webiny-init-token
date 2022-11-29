import { request } from "graphql-request";
import { INSTALL_ADMIN_USERS, INSTALL_SECURITY } from "./apis";
import { CreateUserData } from "./types";

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
      data,
    },
  });

  console.log(resp);
};

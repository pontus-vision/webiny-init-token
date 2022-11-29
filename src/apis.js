"use strict";
/**
 * Contains all of the GraphQL queries and mutations that we might need while writing our tests.
 * If needed, feel free to add more.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSTALL_ADMIN_USERS = exports.INSTALL_SECURITY = exports.LIST_TODOS = exports.DELETE_TODO = exports.UPDATE_BASES_LEGAIS = exports.PUBLISH_BASES_LEGAIS = exports.CREATE_API_KEY = exports.CREATE_USER = exports.GET_GROUP_LIST = exports.CREATE_BASES_LEGAIS = exports.GET_TODO = void 0;
exports.GET_TODO = `
  query GetTodo($id: ID!) {
    todos {
      getTodo(id: $id) {
        id
        title
        description
      }
    }
  }
`;
exports.CREATE_BASES_LEGAIS = `
  mutation CmsEntriesCreateBasesLegais($data: BasesLegaisInput!) {
    content: createBasesLegais(data: $data) {
      data {
        id
        savedOn
        basesLegaisReferencia
        meta {
          title
          publishedOn
          version
          locked
          status
          __typename
        }
        __typename
      }
      error {
        message
        code
        data
        __typename
      }
      __typename
    }
  }
`;
exports.GET_GROUP_LIST = `
query listGroups {
security {
groups: listGroups {
  data {
    id
    slug
    name
    description
    createdOn
    __typename
  }
  __typename
}
__typename
}
}
`;
exports.CREATE_USER = `
mutation CreateUser($data: AdminUsersCreateInput!) {
adminUsers {
user: createUser(data: $data) {
  data {
    id
    email
    firstName
    lastName
    avatar
    gravatar
    createdOn
    __typename
  }
  error {
    code
    message
    data
    __typename
  }
  __typename
}
__typename
}
}
`;
exports.CREATE_API_KEY = `
mutation CreateApiKey($data: SecurityApiKeyInput!) {
security {
apiKey: createApiKey(data: $data) {
  data {
    id
    name
    description
    token
    permissions
    createdOn
    __typename
  }
  error {
    code
    message
    data
    __typename
  }
  __typename
}
__typename
}
}`;
//Publish Entry
exports.PUBLISH_BASES_LEGAIS = `
mutation CmsPublishBasesLegais($revision: ID!) {
content: publishBasesLegais(revision: $revision) {
 data {
   id
   meta {
     title
     publishedOn
     version
     locked
     status
     __typename
   }
   __typename
 }
 error {
   message
   code
   data
   __typename
 }
 __typename
}
}
`;
exports.UPDATE_BASES_LEGAIS = `
mutation CmsUpdateBasesLegais($revision: ID!, $data: BasesLegaisInput!) {
content: updateBasesLegais(revision: $revision, data: $data) {
data {
  id
  basesLegaisReferencia
  savedOn
  meta {
    title
    publishedOn
    version
    locked
    status
    __typename
  }
  __typename
}
error {
  message
  code
  data
  __typename
}
__typename
}
}

`;
exports.DELETE_TODO = `
  mutation DeleteTodo($id: ID!) {
    todos {
      deleteTodo(id: $id) {
        id
        title
        description
      }
    }
  }
`;
exports.LIST_TODOS = `
  query ListTodos($sort: TodosListSort, $limit: Int, $after: String) {
    todos {
      listTodos(sort: $sort, limit: $limit, after: $after) {
        data {
          id
          title
          description
        }
        meta {
          limit
          after
          before
        }
      }
    }
  }
`;
exports.INSTALL_SECURITY = `
mutation InstallSecurity {
security {
 install {
   data
   error {
     code
     message
     __typename
   }
   __typename
 }
 __typename
}
}
`;
exports.INSTALL_ADMIN_USERS = `
mutation InstallAdminUsers($data: AdminUsersInstallInput!) {
adminUsers {
 install(data: $data) {
   data
   error {
     code
     message
     __typename
   }
   __typename
 }
 __typename
}
}
`;

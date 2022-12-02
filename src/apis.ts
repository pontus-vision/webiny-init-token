/**
 * Contains all of the GraphQL queries and mutations that we might need while writing our tests.
 * If needed, feel free to add more.
 */

export const GET_TODO = /* GraphQL */ `
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

export const CREATE_BASES_LEGAIS = /* GraphQL */ `
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

export const GET_GROUP_LIST = `
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

export const CREATE_USER = `
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

export const CREATE_API_KEY = `
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

export const PUBLISH_BASES_LEGAIS = `
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

export const UPDATE_BASES_LEGAIS = /* GraphQL*/ `
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

export const DELETE_TODO = /* GraphQL */ `
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

export const LIST_TODOS = /* GraphQL */ `
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

export const INSTALL_SECURITY = `
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

export const INSTALL_ADMIN_USERS = `
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

export const INSTALL_I18N = `
mutation InstallI18N($data: I18NInstallInput!) {
  i18n {
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

export const INSTALL_FILE_MANAGER = `
mutation InstallFileManager($srcPrefix: String) {
  fileManager {
    install(srcPrefix: $srcPrefix) {
      data
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

export const INSTALL_PAGE_BUILDER = `
mutation InstallPageBuilder($data: PbInstallInput!) {
  pageBuilder {
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

export const INSTALL_FORM_BUILDER = `
mutation InstallFormBuilder($domain: String) {
  formBuilder {
    install(domain: $domain) {
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

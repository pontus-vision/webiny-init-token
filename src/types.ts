export interface CreateUserData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface InstallI18NData {
  code: string;
}

export interface InstallPageBuilderData {
  name: string;
}

export interface InstallFormBuilderData {
  domain: string;
}

export interface CreateApiKeyData {
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Permission {
  name: string;
}

export interface CreateApiKeyOutput {
  data: CreateApiKeyOutputData;
}

export interface CreateApiKeyOutputData {
  security: Security;
}

export interface Security {
  apiKey: APIKey;
  __typename: string;
}

export interface APIKey {
  data: APIKeyData;
  error?: string;
  __typename: string;
}

export interface APIKeyData {
  id: string;
  name: string;
  description: string;
  token: string;
  permissions: Permission[];
  createdOn: Date;
  __typename: string;
}

export interface Permission {
  name: string;
}

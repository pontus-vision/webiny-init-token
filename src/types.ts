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

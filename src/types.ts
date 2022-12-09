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

export interface Data {
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Permission {
  name: string;
}

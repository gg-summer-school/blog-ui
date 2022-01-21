export interface Users{
  id: string;
  name: string;
  email: string;
  articles: [];
  role: Roles[];
  password: string;
}

export interface loginData{
  email: string;
  password: string;
}
export interface Roles {
  id: number;
  role: string;
}
export interface Password {
  oldPassword: string;
  newPassword: string;
}

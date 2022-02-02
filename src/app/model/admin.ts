export interface Admin {
  active: boolean,
  approved: boolean,
  email: string,
  id: string,
  name: string,
  role: Role[],
  userId: string,
}
export interface Role {
  id: number;
  role: string;
}

export interface  Transactions {
  nameOfArticle: string,
  id: string,
  createdAt: string
}

export enum RolePayload {
  ROLE_ADMIN,
  ROLE_PUBLISHER,
  ROLE_READER
}

export interface roleDTO {
  role : string;
}

import {Contributors} from "./contributors";

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
  ROLE_ADMIN= "ROLE_ADMIN",
  ROLE_PUBLISHER ="ROLE_PUBLISHER",
  ROLE_READER="ROLE_READER"
}

export interface roleDTO {
  role : string;
}

export interface Articles {
  articleAbstract: string;
  categoryId: string;
  categoryName:string;
  contributors: Contributors[];
  coverPage: string;
  createdAt: string
  document:string
  id: string
  price: number
  title: string
  toc: string
  updatedAt: string
  userId: string
}

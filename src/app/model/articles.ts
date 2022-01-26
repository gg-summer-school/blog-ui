import {Contributors} from "./contributors";
import {Categories} from "./categories";

export interface Articles {
  title: string;
  articleAbstract: string;
  toc: string;
  price: number;

  contributors: Contributors[];
}

export interface ArticleList {
  last: false;
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  articleDtoLIst: ArticleDto[]
}



export interface ArticleDto{
  articleAbstract:string
  categoryId: string
  categoryName: string
  contributors: Contributors[]
  coverPage: string
  createdAt: Date
  document: string
  id: string
  price: number
  title: string
  toc: string
  updatedAt: String
  userId: string
}
export interface updatePayload {
  articleAbstract: string
  price: number
  title: string,
  toc: string
}

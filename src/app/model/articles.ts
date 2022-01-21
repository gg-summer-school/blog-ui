import {Contributors} from "./contributors";

export interface Articles {
  title: string;
  articleAbstract: string;
  toc: string;
  price: number;

  contributors: Contributors[];
}

export interface Payment {
  nameOfArticle: string;
}

export interface ArticleDto{
  articleAbstract: string;
  categoryId: string;
  categoryName: string;
  contributors: Contributors[];
  coverPage: string;
  createdAt: Date;
  document: string;
  id: string;
  price: number;
  title: string;
  toc: string;
  updatedAt: string;
  userId: string;
}
export interface updatePayload{
  articleAbstract: string;
  price: number;
  title: string;
  toc: string;

}


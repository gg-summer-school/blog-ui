import {Contributors} from "./contributors";
import {Categories} from "./categories";

export interface Articles {
  title: string;
  articleAbstract: string;
  toc: string;
  price: number;
  contributors: Contributors[];
}
  
export interface ArticleDto{
  articleAbstract:string
  categoryId: string
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
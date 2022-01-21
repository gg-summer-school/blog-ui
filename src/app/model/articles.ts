import {Contributors} from "./contributors";
import {Categories} from "./categories";
import { ArticleDto } from "./articlesDto";

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

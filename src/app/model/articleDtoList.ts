import { ArticleDto } from "./articles";

export interface ArticleResource {
  last: false;
  pageNo: Number;
  pageSize: Number;
  totalElements: Number;
  totalPages: Number;
  articleDtoList: ArticleDto[]
}
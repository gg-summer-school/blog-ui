import { ArticleDto } from "./articles";

export interface ArticleResource {
  last: boolean;
  pageNo: Number;
  pageSize: Number;
  totalElements: Number;
  totalPages: Number;
  articleDtoList: ArticleDto[]
}
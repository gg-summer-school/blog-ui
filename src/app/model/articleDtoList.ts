import { ArticleDto } from "./articles";
import { Contributors } from "./contributors";

export interface ArticleList {
    last:false;
  pageNo:Number;
  pageSize:Number;
  totalElements:Number;
  totalPages:Number;
  articleDtoList:ArticleDto[]
}
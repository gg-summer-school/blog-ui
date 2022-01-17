import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Articles } from '../model/articles';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  baseUrl3: string = environment.baseUrl3;
  baseUrl2: string = environment.baseUrl2;

  constructor(private http: HttpClient) { }
  getAllArticles(articleData: Articles)
  {
    return this.http.get(this.baseUrl3 + '/' + 'categories');

  }
  createArticle(article:Articles, publisherId:number, categoryId:number)
  {
    return this.http.post(this.baseUrl2+'/publishers/'+publisherId+'/articles/categories/'+categoryId, article);
  }
  createArticleFiles(article:Articles, publisherId:number, articleId:number)
  {
    return this.http.post(this.baseUrl2+'/publishers/'+publisherId+'/articles/'+articleId+'/file-upload', article);
  }
  getOneArticle(articleId:number)
  {

  }
  deleteArticle(articleId:number)
  {

  }
  updateArticle(articleId:number, article:any)
  {

  }

}

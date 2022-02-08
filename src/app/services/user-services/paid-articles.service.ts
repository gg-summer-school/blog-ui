import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ArticleDto, updatePayload} from "../../model/articles";
import {PaidArticles} from "../../model/paidArticles";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaidArticlesService {

  baseUrl: string = environment.baseUrlPub;
  baseUrl1: string = environment.baseUrlPro

  constructor(private http: HttpClient) { }

  getBookTitle(userId: string): Observable<ArticleDto[]>{
    return this.http.get<ArticleDto[]>(this.baseUrl1 + 'users/' + userId + '/paid-articles');
  }

  // deleteArticle(userId:string, articleId:string, categoryId:string)
  // {
  //   return this.http.delete(this.baseUrl1+'publishers/'+userId+'/articles/'+articleId+'/categories/'+categoryId);
  // }
  // getOneArticle(userId:string, articleId:string, categoryId:string)
  // {
  //   return this.http.get<ArticleDto>(this.baseUrl1+'publisher/'+userId+'/articles/'+articleId+'/categories/'+categoryId);
  // }
  // editArticle(userId:string, articleId:string, categoryId:string, article:updatePayload)
  // {
  //   return this.http.put(this.baseUrl1+'publishers/'+userId+'/articles/'+articleId+'/categories/'+categoryId, article);
  // }

}

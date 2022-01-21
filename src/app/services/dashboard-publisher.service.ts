import { Injectable } from '@angular/core';

import {ArticleDto, Articles, updatePayload} from "../model/articles";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardPublisherService {
  baseUrl: string = environment.baseUrlPub;
  baseUrl1: string = environment.baseUrlPro

  constructor(private http: HttpClient) { }

  getArticlesByPublisher(publisherId: string){
    return this.http.get<ArticleDto[]>(this.baseUrl1 + 'publishers/' + publisherId + '/articles');
  }
  deleteArticle(userId:string, articleId:string, categoryId:string)
  {
    return this.http.delete(this.baseUrl1+'publishers/'+userId+'/articles/'+articleId+'/categories/'+categoryId);
  }
  getOneArticle(userId:string, articleId:string, categoryId:string)
  {
    return this.http.get<ArticleDto>(this.baseUrl1+'publisher/'+userId+'/articles/'+articleId+'/categories/'+categoryId);
  }
  editArticle(userId:string, articleId:string, categoryId:string, article:updatePayload)
  {
    return this.http.put(this.baseUrl1+'publishers/'+userId+'/articles/'+articleId+'/categories/'+categoryId, article);
  }
}

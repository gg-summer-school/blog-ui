import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Articles } from '../model/articles';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  baseUrl3: string = environment.baseUrl3;

  constructor(private http: HttpClient) { }
  getAllArticles(articleData: Articles)
  {
    return this.http.get(this.baseUrl3 + '/' + 'categories');

  }
  createArticle(article:any)
  {
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

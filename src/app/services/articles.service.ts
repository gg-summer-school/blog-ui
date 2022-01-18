import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Articles } from '../model/articles';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  baseUrl: string = environment.baseUrlPub;
  baseUrl1: string = environment.baseUrlPro
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  }

  constructor(private http: HttpClient) { }
  getAllArticles(articleData: Articles)
  {
    return this.http.get(this.baseUrl + '/' + 'categories');

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
  //display all user articles
  displayAlluserArticles(userId: number):Observable<Articles[]>{
    return this.http.get<Articles[]>(this.baseUrl1 + 'users' + '/' + {userId})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  //display one user article
  getOneUserArticle(articleId: number, userId: number): Observable<Articles>{
    return this.http.get<Articles>(this.baseUrl1 + 'users' + '/' + {userId} + '/' + 'paid-articles/' + {articleId})
  }
  //get all user-role paid articles
  getAllUserPaidArticles(userId: number){
    return this.http.get<Articles>(this.baseUrl1 + 'users' + '/' + {userId} + '/' + 'paid-articles')
  }
   //get all user-role paid article
   getAllOneUserPaidArticle(userId: number, articleId: number){
    return this.http.get<Articles>(this.baseUrl1 + 'users' + '/' + {userId} +'/' + 'paid-articles/' + {articleId})
  }
   // Error handling
   handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
    
  }


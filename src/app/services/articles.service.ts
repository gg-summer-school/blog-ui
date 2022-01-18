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
  getAllArticles()
  {
    return this.http.get(this.baseUrl + 'articles');

  }
  createArticle(article:Articles, publisherId:string, categoryId:string)
  {
    return this.http.post(this.baseUrl1+'publishers/'+publisherId+'/articles/categories/'+categoryId, article);
  }
  createArticleFiles(article:Articles, publisherId:string, articleId:string)
  {
    return this.http.put(this.baseUrl1+'/publishers'+publisherId+'/articles/'+articleId+'/file-upload', article);
  }
  getArticlesByCategory(article:Articles, publisherId:string, articleId:string)
  {
    return this.http.put(this.baseUrl1+'/publishers'+publisherId+'/articles/'+articleId+'/file-upload', article);
  }
  getOneArticle(articleId:string)
  {

  }
  deleteArticle(articleId:string)
  {

  }
  updateArticle(articleId:string, article:any)
  {

  }
  //display all user articles
  displayAlluserArticles(userId: string):Observable<Articles[]>{
    return this.http.get<Articles[]>(this.baseUrl1 + 'users' + '/' + {userId})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  //display one user article
  getOneUserArticle(articleId: string, userId: string): Observable<Articles>{
    return this.http.get<Articles>(this.baseUrl1 + 'users' + '/' + {userId} + '/' + 'paid-articles/' + {articleId})
  }
  //get all user-role paid articles
  getAllUserPaidArticles(userId: string){
    return this.http.get<Articles>(this.baseUrl1 + 'users' + '/' + {userId} + '/' + 'paid-articles')
  }
   //get all user-role paid article
   getAllOneUserPaidArticle(userId: string, articleId: string){
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


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Articles, Payment} from '../model/articles';
import {ResponseObject} from '../model/response';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  baseUrl: string = environment.baseUrlPub;
  baseUrl1: string = environment.baseUrlPro;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getAllArticles()
  {
    return this.http.get(this.baseUrl + 'articles');

  }
  createArticle(article: Articles, publisherId: string, categoryId: string): Observable<ResponseObject>
  {
    return this.http.post<ResponseObject>(this.baseUrl1 + 'publishers/' + publisherId + '/articles/categories/' + categoryId, article);
  }

  // tslint:disable-next-line:typedef
  uploadArticleFiles(uploadFile: FormData, publisherId: string, articleId: string)
  {

  return this.http.put(this.baseUrl1 + 'publishers/' + publisherId + '/articles/' + articleId + '/file-uploads',  uploadFile);

  }
  // getArticlesByCategory(article:Articles, publisherId:string, articleId:string)
  // {
  //   return this.http.put(this.baseUrl1+'/publishers'+publisherId+'/articles/'+articleId+'/file-upload', article);
  // }
  // tslint:disable-next-line:typedef
  getCategory()
  {
    return this.http.get(this.baseUrl + 'categories');
  }
  // payArticles
  // tslint:disable-next-line:variable-name typedef
  PayArticle(user_id: string, article_id: string, article: any){
    return this.http.post<ResponseObject>(this.baseUrl1 + `transactions/user/${user_id}/article/${article_id}`, article)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );

  }

  // downloadFile
  downloadArticle(): any{
    return this.http.get(this.baseUrl1 + 'articles', {responseType: 'blob'});
  }
  // display all user articles
  displayAlluserArticles(userId: string) : Observable<Articles[]>{
    return this.http.get<Articles[]>(this.baseUrl1 + 'users' + '/' + {userId})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // display one user article
  getOneUserArticle(articleId: string, userId: string): Observable<Articles>{
    return this.http.get<Articles>(this.baseUrl1 + 'users' + '/' + {userId} + '/' + 'paid-articles/' + {articleId});
  }
  // get all user-role paid articles
  // tslint:disable-next-line:typedef
  getAllUserPaidArticles(userId: string){
    return this.http.get<Articles>(this.baseUrl1 + 'users' + '/' + {userId} + '/' + 'paid-articles');
  }
   // get all user-role paid article
  // tslint:disable-next-line:typedef
   getAllOneUserPaidArticle(userId: string, articleId: string){
    return this.http.get<Articles>(this.baseUrl1 + 'users' + '/' + {userId} + '/' + 'paid-articles/' + {articleId});

  }
   // Error handling
  // tslint:disable-next-line:typedef
   handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
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


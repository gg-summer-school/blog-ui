import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ArticleDto, Articles } from '../model/articles';
import { ResponseObject } from "../model/response";
import { Categories } from "../model/categories";
import { ArticleResource } from '../model/articleDtoList';
import { PayArticleDto } from '../model/articlesDto';
import { UserDto } from '../model/UserDto';


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



  getAllArticles(pageNo: number, pageSize: number): Observable<ArticleResource> {
    return this.http.get<ArticleResource>(this.baseUrl + `articles?pageNo=` + pageNo + `&pageSize=` + pageSize);
  }

  searchArticle(articleTitle: string): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(this.baseUrl + `articles-search?title=`+ articleTitle);

  }



  createArticle(article: Articles, publisherId: string, categoryId: string): Observable<ResponseObject> {
    return this.http.post<ResponseObject>(this.baseUrl1 + 'publishers/' + publisherId + '/articles/categories/' + categoryId, article);
  }

  uploadArticleFiles(uploadFile: FormData, publisherId: string, articleId: string) {

    return this.http.put(this.baseUrl1 + 'publishers/' + publisherId + '/articles/' + articleId + '/file-uploads', uploadFile);
  }

  getArticlesByCategory(catid: string):Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(this.baseUrl + `articles/categories?categoryId=` + catid);
  }


  getCategory():Observable<Categories[]> {
    return this.http.get<Categories[]>(this.baseUrl + 'categories');
  }


  // downloadFile
  downloadArticle(): any {
    return this.http.get(this.baseUrl1 + 'articles', { responseType: 'blob' });
  }
  // display all user articles
  displayAlluserArticles(userId: string): Observable<Articles[]> {
    return this.http.get<Articles[]>(this.baseUrl1 + 'users' + '/' + { userId })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  PayArticle(user_id: string, article_id: string, article: PayArticleDto):Observable<ResponseObject>{
    return this.http.post<ResponseObject>(this.baseUrl1 + `transactions/users/${user_id}/articles/${article_id}`, article)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );

  }

  checkIfUserhasBoughtArticle(userId: string, articleId: string): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl1 + `users/${userId}/articles/${articleId}/check-if-user-has-bought-article`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  previewArticle(articleId: string, userId:string):Observable<any>{
     return this.http.get(this.baseUrl1 + `users/${userId}/articles/${articleId}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getPublisherByArticleId(articleId:string):Observable<UserDto> {
    return this.http.get<UserDto>(this.baseUrl1+ `publisher/articles?articleId=${articleId}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Error handling
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


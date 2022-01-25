import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { loginData, Users } from '../model/users';
import {UserDto} from "../model/UserDto";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userProfile!: Users;

  baseUrl: string = environment.baseUrlPub;
  baseUrlAuth: string = environment.baseUrl;
  baseUrlUserProfile: string = environment.baseUrlPro
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  register(userData: Users) {
    return this.http.post(this.baseUrlAuth + '/' + 'signup', userData);
  }

  login(userData: loginData):Observable<UserDto> {
    return this.http.post<any>(this.baseUrlAuth + '/' + 'signin', userData);
  }

  getUserProfile(): Observable<Users> {
    return  this.http.get<Users>(this.baseUrlUserProfile + 'users' +  '/' + 'user_profile')
    .pipe(
        map((res: Users) => {
          return res || {}
        }),
      catchError(this.handleError)
    )
  }

  refreshToken(token: string) {
    return this.http.post(this.baseUrlAuth + '/' + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }

  updateUserProfile(user:Users){
    return this.http.put<Users>(this.baseUrlUserProfile,user,
    {headers: this.headers}).pipe(
      map((res: Users) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
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

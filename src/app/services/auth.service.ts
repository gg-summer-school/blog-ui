import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { loginData, Users } from '../model/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userProfile!: Users;

  baseUrl: string = environment.baseUrlPub;
  baseUrlUserProfile: string = environment.baseUrlPro
  // baseUrlUserProfile1: string = 'http://localhost:8000/api/protected/users/user_profile';
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  register(userData: Users) {
  //  return this.http.post(this.baseUrl + '/' + 'public' + '/' + 'auth' + '/' + 'signup', userData;
    return this.http.post(this.baseUrl + 'auth' + '/' + 'signup', userData);
  }

  login() {
    return this.http.get<loginData>(this.baseUrl + 'auth' + '/' + 'signin');
  }

  getUserProfile(): Observable<any> {
    
    return  this.http.get(this.baseUrlUserProfile + 'users' +  '/' + 'user_profile',
      {headers: this.headers}).pipe(
        map((res: any) => {
          return res || {}
        }),
      catchError(this.handleError)
    )
  }
  updateUserProfile(user:any){
    return this.http.put(this.baseUrlUserProfile,user,
    {headers: this.headers}).pipe(
      map((res: any) => {
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

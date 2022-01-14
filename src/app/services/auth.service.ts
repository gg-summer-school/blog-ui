import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  register(userData: Users) {
   return this.http.post(this.baseUrl + '/' + 'public' + '/' + 'auth' + '/' + 'signup', userData);
  }

  login(userData: Users) {
    return this.http.post(this.baseUrl + '/' + 'public' + '/' + 'auth' + '/' + 'login', userData);
  }
  
}

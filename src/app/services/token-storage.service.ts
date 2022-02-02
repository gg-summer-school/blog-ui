import { Injectable } from '@angular/core';
import { UserDto } from '../model/UserDto';

const  TOKEN_KEY = 'auth-token'
const  USER_KEY = 'auth-user'
const REFRESHTOKEN_KEY = 'auth-refreshtoken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }


  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
 public getToken1(): boolean | null {
    return !!localStorage.getItem(TOKEN_KEY);

  }

  public saveUser(user: UserDto): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): UserDto {
    const user = localStorage.getItem(USER_KEY)
    const userDto:UserDto = JSON.parse(user as string);
    return userDto; 
  }
}

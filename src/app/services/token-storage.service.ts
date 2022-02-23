import { Injectable } from '@angular/core';
import { ArticleDto } from '../model/articles';
import { UserDto } from '../model/UserDto';

const  TOKEN_KEY = 'auth-token'
const  USER_KEY = 'auth-user'
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const MYCART ='my-cart';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

 
  constructor() { }

  signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY)
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

  public addToCart(items:ArticleDto[]){
    localStorage.setItem(MYCART, JSON.stringify(items))
  }

  public getCartItems():ArticleDto[]{
    const items = localStorage.getItem(MYCART);
    const articles:ArticleDto[] = JSON.parse(items as string);
    return articles

  }

  
}

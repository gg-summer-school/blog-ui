import { Injectable } from '@angular/core';
import {UserDto} from "../model/UserDto";
const USER:string = 'user';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.localStorage.clear();
  }

  // public saveToken(token:UserDto): void {
  //   localStorage.removeItem('user');
  //   localStorage.setItem('user', token);
  // }

  public getToken(): string | null {
    return localStorage.getItem(USER);
  }

  public saveUser(user: UserDto): void {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  }

  public getUser(): UserDto {
    const user = localStorage.getItem('user')
    const userDto  = (JSON.parse(user as string));
    return userDto;
  }
}

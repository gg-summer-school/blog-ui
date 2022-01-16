import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }

  getPublishers(publishNames: string): string {
    return this.http.get('')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }

  getUsers(usersNames: string): string {
    return this.http.get('')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }

  getUserNumber(usersNumber: number): number {
    return this.http.get('')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }

  getArticlesNumber(articleNames: number): number {
    return this.http.get('')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }

  getEmail(email: string): string {
    return this.http.get('')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }

  getPendingUsers(pendingUsers: string): string {
    return this.http.get('')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }

  suspend(): void {
    return this.http.get('')
      .map(
        (response: Response) => {
          const data = response.json();
        }
      );
    return alert('Do you really want to suspend this user?');
  }

  blockk(): void {
    return this.http.get('')
      .map(
        (response: Response) => {
          const data = response.json();
        }
      );
    return alert('Do you really want to block this user?');
  }

  acceptPublisher(): void {
    return this.http.get('')
      .map(
        (response: Response) => {
          const data = response.json();
        }
      );
    return alert('Cool! Now a publisher!!!');
  }

  declinePublisher(): void {
    return this.http.get('')
      .map(
        (response: Response) => {
          const data = response.json();
        }
      );
    return alert('Oops! You have rejected a user!!!');
  }
}

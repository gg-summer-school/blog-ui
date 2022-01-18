import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminPagesService {

  constructor(private http: HttpClient) { }

  getPublishers(name: string) {
    return this.http.get('')
  }

  getUsers(name: string) {
    return this.http.get('')
  }

  getEmail(email: string) {
    return this.http.get('')
  }
}

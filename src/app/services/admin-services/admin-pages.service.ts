import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminPagesService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  getPublishers() {
    return this.http.get(this.baseUrlPro + 'users');
  }

  getUsers(name: string) {
    return this.http.get(this.baseUrlPro + 'users')
  }

  getEmail(email: string) {
    return this.http.get('')
  }
}

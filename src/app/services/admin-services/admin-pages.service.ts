import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {Admin} from "../../model/admin";

@Injectable({
  providedIn: 'root'
})
export class AdminPagesService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  getPublishers(isApproved: boolean) {
    return this.http.get<Admin>(this.baseUrlPro + 'users' + '/' + 'publishers' + '/' + isApproved);
  }

  //http://localhost:8000/api/protected/users/publishers/false

  getReaders() {
    return this.http.get<Admin>(this.baseUrlPro + 'users' + '/' + 'readers');
  }

  getArticlesByPublisher(publisherId: string, isApproved: boolean) {
    return this.http.get<Admin>(this.baseUrlPro + 'publishers' + '/' + publisherId + '/' + 'articles');
  }

  approveUser(user_id: string, approve: boolean) {
    return this.http.put<Admin>(this.baseUrlPro + 'approve' + '/' + 'user' + '/' + user_id, approve);
  }

  suspendUser(user_id: string, suspend: boolean) {
    return this.http.put<Admin>(this.baseUrlPro + 'suspend' + '/' + 'user' + '/' + user_id, suspend);
  }

  addRole(user_id: string, add_Role: boolean) {
    return this.http.put<Admin>(this.baseUrlPro + 'suspend' + '/' + 'user' + '/' + user_id, add_Role);
  }

  declineUser(user_id: string) {
    return this.http
  }


}

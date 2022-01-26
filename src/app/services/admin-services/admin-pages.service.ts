import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {Admin, roleDTO, RolePayload, Transactions} from "../../model/admin";

@Injectable({
  providedIn: 'root'
})
export class AdminPagesService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }



  getPublishers(isApproved: boolean) {
    return this.http.get<Admin[]>(this.baseUrlPro + 'users' + '/' + 'publishers' + '/' + isApproved);
  }

  //http://localhost:8000/api/protected/users/publishers/false

  getReaders() {
    return this.http.get<Admin[]>(this.baseUrlPro + 'users' + '/' + 'readers');
  }

  getArticlesByPublisher(publisherId: string, isApproved: boolean) {
    return this.http.get<Admin>(this.baseUrlPro + 'publishers' + '/' + publisherId + '/' + 'articles');
  }

  approveUser(user_id: string, approve: boolean) {
    return this.http.patch<Admin>(this.baseUrlPro + 'approve' + '/' + 'users' + '/' + user_id, approve);
  }

  suspendUser(user_id: string, suspend: boolean) {
    return this.http.patch<Admin>(this.baseUrlPro + 'suspend' + '/' + 'users' + '/' + user_id, suspend);
  }

  appendRole(userId: string, roleDto: roleDTO) {
    return this.http.patch<Admin>(`${this.baseUrlPro}add-role/users/${userId}`, roleDto);
  }
  removeRole(userId: string, roleDto: roleDTO) {
    return this.http.patch<Admin>(`${this.baseUrlPro}remove-role/users/${userId}`, roleDto);
  }

  reactivateUser(user_id: string, reactivate_User: boolean) {
    return this.http.patch<Admin>(this.baseUrlPro + 'reactivate' + '/' + 'users' + '/' + user_id, reactivate_User);
  }

  declineUser(publisher_id: string) {
    return this.http.delete<Admin>(this.baseUrlPro + 'users' + '/' + publisher_id);
  }

  transactionDetails(user_id: string) {
    return this.http.get<Transactions[]>(this.baseUrlPro + 'transactions' + '/' + 'users' + '/' + user_id);
  }


}

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


}

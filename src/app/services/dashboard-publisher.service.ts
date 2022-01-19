import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Articles} from "../model/articles";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardPublisherService {
  baseUrl: string = environment.baseUrlPub;
  baseUrl1: string = environment.baseUrlPro

  constructor(private http: HttpClient) { }

  getArticlesByPublisher(publisherId: string){
    return this.http.get(this.baseUrl1 + 'publishers/' + publisherId + '/articles');
  }
}

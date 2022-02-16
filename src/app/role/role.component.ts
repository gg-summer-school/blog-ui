import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {ArticlesService} from "../services/articles.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  publisherId:string='';

  constructor(public tokenStorage: TokenStorageService, private http: HttpClient) { }

  ngOnInit(): void {
    this.publisherId= this.tokenStorage.getUser().id;
  }

  addRole()
  {
    this.http.patch('http://localhost:8000/api/protected/add-role/users/'+ this.publisherId, 'ROLE_PUBLISHER')
      .subscribe(res=>
      {
        console.log(res);
      });
  }
}

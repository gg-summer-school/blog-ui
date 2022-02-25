import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { Users } from 'src/app/model/users';
import { AuthService } from 'src/app/services/auth.service';
import {TranslateService} from "@ngx-translate/core";
import {TokenStorageService} from "../../services/token-storage.service";
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";
import {} from "../../model/admin";
import { Articles } from 'src/app/model/articles';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  firstName = '';
  email = 'ndzodaniel31@gmail.com';
  userProfile!: Users;
  publisherId: string = '';
  articles: Articles[] = [];
  number!: number;
  user_id = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              public translate: TranslateService, private tokenStorage: TokenStorageService,
              private adminPagesService: AdminPagesService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }
  switchLang(lang: string) {
   
    this.translate.use(lang);
  }
  usersEdit = this.formBuilder.group({
    firstName: '',
    email: '',
    password: '',
  });
ngOnInit(): void {
     this.getUserDetail();
     const name = this.tokenStorage.getUser().name
      this.user_id = this.tokenStorage.getUser().id;
    
     this.getAllArticlesByPublisher();
     this.firstName = name.split(' ').slice(0, -1).join(' ');
  }

  getUserDetail() {
    this.authService.getUserProfile().subscribe((response: any) => {
      this.userProfile = response;
    });
  }

  editUserAccount(): void{
    this.authService.updateUserProfile(this.usersEdit.value).subscribe((response : any) => {
      this.userProfile = response;
    });
  }

  getAllArticlesByPublisher() {
  this.adminPagesService.getAllArticlesByPublisher(this.user_id)
    .subscribe( (res: Articles[]) => {
      this.articles = res;
      this.number= this.articles.length;
    
    })
  }

}

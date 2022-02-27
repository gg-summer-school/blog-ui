import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { Users } from 'src/app/model/users';
import { AuthService } from 'src/app/services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {AdminPagesService} from '../../services/admin-services/admin-pages.service';
import {Admin} from '../../model/admin';
import { Articles } from 'src/app/model/articles';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              public translate: TranslateService, private tokenStorage: TokenStorageService,
              private adminPagesService: AdminPagesService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  firstName = '';
  email = 'ndzodaniel31@gmail.com';
  userProfile!: Users;
  publisherId: string = '';
  articles: Articles[] = [];
  number!: number;
  user_id = '';
  usersEdit = this.formBuilder.group({
    firstName: '',
    email: '',
    password: '',
  });
  switchLang(lang: string) {

    this.translate.use(lang);
  }
ngOnInit(): void {
     this.getUserDetail();
     const name = this.tokenStorage.getUser().name

      this.user_id = this.tokenStorage.getUser().id;


     this.getAllArticlesByPublisher();
     this.firstName = name.split(' ').slice(0, -1).join(' ');
  }

  // tslint:disable-next-line:typedef
  getUserDetail() {
    this.authService.getUserProfile().subscribe((response: any) => {
      this.userProfile = response;
    });
  }

  editUserAccount(): void{
    this.authService.updateUserProfile(this.usersEdit.value).subscribe((response: any) => {
      this.userProfile = response;
    });
  }

  // tslint:disable-next-line:typedef
  getAllArticlesByPublisher() {
  this.adminPagesService.getAllArticlesByPublisher(this.user_id)
    .subscribe( (res: Articles[]) => {
      this.articles = res;

      this.number= this.articles.length;

    })

  }

}

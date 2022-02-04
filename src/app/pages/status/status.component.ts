import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {TranslateService} from "@ngx-translate/core";
import {Users} from "../../model/users";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Articles} from "../../model/admin";
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  userProfile!: Users;
  isDisabled = true;

  articles: Articles[] = [];
  paidArticles: Articles[] = [];
  numberOfPaid!: number;
  number!: number;
  user_id = '';

  userRole: any = [];
  adminRole: boolean = false;
  publisherRole: boolean = false;
  readerRole: boolean = false;

  userName: string='';
  firstName = '';
  email = '';
  old_pass = '';
  new_pass = '';
  role: any[] = [];
  role2: string = '';

  constructor(private tokenStorageService: TokenStorageService, translate: TranslateService, private formBuilder: FormBuilder, private authService: AuthService,
              private adminPagesService: AdminPagesService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  usersEdit = this.formBuilder.group({
    email: '',
    name: ''
  });

  passwordChange = this.formBuilder.group({
    newPassword: '',
    oldPassword: ''
  });

  ngOnInit(): void {
    this.user_id = this.tokenStorageService.getUser().id;
    this.getAllArticlesByPublisher();
    this.getAllPaidArticles();
   this.userName= this.tokenStorageService.getUser().name;
    const name = this.tokenStorageService.getUser().name;
    const role = this.tokenStorageService.getUser().role;
    this.firstName = name.split(' ').slice(0, -1).join(' ');
    this.email = this.tokenStorageService.getUser().email;
    for (let i of role) {
      this.role2 = i.split('_').slice(-1).join(' ');
      this.role.push(this.role2);
    }
  }

  editUserAccount(): void{
    console.log(this.usersEdit.value);
    this.authService.updateUserProfile(this.usersEdit.value).subscribe((response : any) => {
      this.userProfile = response;
      const user = this.tokenStorageService.getUser();
      console.log(user);
      const newUser = {
        accessToken: user.accessToken,
        email: user.email,
        id: user.id,
        name: this.usersEdit.value.name,
        refreshToken: user.refreshToken,
        type: user.type,
        role: user.role,
      }
      this.tokenStorageService.saveUser(newUser);
      window.location.reload();
    });
  }

  passwordChanged(): void {
    console.log(this.passwordChange.value)
    this.authService.changePassword(this.passwordChange.value).subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log(error.message)
    })
  }

  getAllArticlesByPublisher() {
    this.userRole = this.tokenStorageService.getUser().role;
    this.readerRole = this.userRole.includes('ROLE_READER');
    this.publisherRole = this.userRole.includes('ROLE_PUBLISHER');
    this.adminRole = this.userRole.includes('ROLE_ADMIN');
    this.adminPagesService.getAllArticlesByPublisher(this.user_id)
      .subscribe( (res: Articles[]) => {
        this.articles = res;
        this.number= this.articles.length;
        console.log("length "+ this.number);
      })
  }

  getAllPaidArticles() {
    this.adminPagesService.getPaidArticlesByUser(this.user_id).subscribe((response: Articles[]) => {
       this.paidArticles = response;
       this.numberOfPaid = this.paidArticles.length;
      console.log(this.numberOfPaid);
    })
  }

}

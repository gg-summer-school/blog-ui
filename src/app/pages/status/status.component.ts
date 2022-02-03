import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {TranslateService} from "@ngx-translate/core";
import {Users} from "../../model/users";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  userProfile!: Users;

  userName: string='';
  firstName = '';
  email = '';
  role: any[] = [];
  role2: string = '';

  constructor(private tokenStorageService: TokenStorageService, translate: TranslateService, private formBuilder: FormBuilder, private authService: AuthService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  // switchLang(lang: string) {
  //   console.log(lang)
  //   this.translate.use(lang);
  // }

  usersEdit = this.formBuilder.group({
    firstName: '',
    email: ''
  });

  ngOnInit(): void {
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
    console.log(this.usersEdit.value)
    this.authService.updateUserProfile(this.usersEdit.value).subscribe((response : any) => {
      this.userProfile = response;
    });
  }

}

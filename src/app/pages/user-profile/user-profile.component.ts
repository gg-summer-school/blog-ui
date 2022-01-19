import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { Users } from 'src/app/model/users';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  firstName = 'Ndzo Daniel';
  email = 'ndzodaniel31@gmail.com';
  userProfile!: Users;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }
  usersEdit = this.formBuilder.group({
    firstName: '',
    email: '',
    password: ''
  });
ngOnInit(): void {
     this.getUserDetail();
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


}

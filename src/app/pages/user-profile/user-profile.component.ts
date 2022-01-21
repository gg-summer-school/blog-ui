import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Password, Users} from 'src/app/model/users';
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
  submitted = false;
  pwd!: Password;


  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }
  usersEdit = this.formBuilder.group({
    name: '',
    email: '',
    password: ''
  });
  changePassword = this.formBuilder.group({
    oldPassword: '',
    newPassword: ''
  });
  // changePassword = new FormGroup({
  //   oldPassword: new FormControl('', Validators.required, PasswordValidators.cannotContainOldPassword),
  //   newPassword: new FormControl('', Validators.required),
  //   confirmPassword: new FormControl('', [
  //     Validators.required,
  //     PasswordValidators.confirmNewPassword
  //   ])
  // });

  get f(): {[key: string]: AbstractControl} {
    return this.changePassword.controls;
  }
ngOnInit(): void {
     this.getUserDetail();
  }

  // tslint:disable-next-line:typedef
  getUserDetail() {
    // const count = storage.reduce((counter, obj) => obj.status === '0' ? counter += 1 : counter, 0); // 6
    this.authService.getUserProfile().subscribe((response: Users) => {
      this.userProfile = response;
    });
  }

  // tslint:disable-next-line:typedef
  editUserAccount(){
    this.authService.updateUserProfile(this.usersEdit.value).subscribe((response: Users) => {
      this.userProfile = response;
      window.location.reload();
    });
  }

  UserChangePassword(){
    this.submitted = true;
    this.authService.changePassword(this.changePassword.value).subscribe((response: Password) => {
        console.log(response);
        console.log(this.changePassword.value);
        // window.alert('password changed');
      });
  }



}

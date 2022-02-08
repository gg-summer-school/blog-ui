import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginData, Users } from 'src/app/model/users';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {UserDto} from "../../model/UserDto";
import {TranslateService} from "@ngx-translate/core";
import { NotificationMessageService } from 'src/app/services/Notification/notification-message.service';
import { NotificationType } from 'src/app/model/NotificationMessage';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    public translate: TranslateService,
    private notificationService:NotificationMessageService,
    private  spinnerService: NgxSpinnerService
    ) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
     this.roles = this.tokenStorage.getUser().role;
    }


    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required])]
    })
}

get registerFormControl() {
  return this.loginForm.controls;
}

onSubmit() {

    this.spinnerService.show()
  this.submitted = true;
  if (this.loginForm.valid) {

     this.authService.login(this.loginForm.value).subscribe((userData: UserDto) => {
      const user = userData.role;
      this.notificationService.sendMessage({message: 'Login Successfully', type:NotificationType.success})
      if(user.length === 1){
        this.router.navigate(['/users-article']);
      } else if(user.length === 2) {
        this.router.navigate(['/your-articles']);
      }else if(user.length === 3) {
        this.router.navigate(['/requests']);
      }

        this.tokenStorage.saveToken(userData.accessToken);
       this.tokenStorage.saveUser(userData);
       this.spinnerService.hide(

       )
    },
    err => {
      this.spinnerService.hide()
      this.notificationService.sendMessage({message:err.error.message, type:NotificationType.error})
    }
  );
  }
}

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginData, Users } from 'src/app/model/users';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {UserDto} from "../../model/UserDto";

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
    private router: Router
    ) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    //  this.roles = this.tokenStorage.getUser().roles;
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

  this.submitted = true;
  // if (this.loginForm.valid) {
     this.authService.login(this.loginForm.value).subscribe((userData: UserDto) => {
      const user = userData.role;
      const reader = user.find((role: any )=> role === 'READER');
      const publisher = user.find((role: any )=> role === 'PUBLISHER');
      console.log(user);
      
      if((user[0] === 'READER' && user[1] == 'PUBLISHER' && user[2] == 'ADMIN') || (user[0] =='ADMIN' && user[1] == 'PUBLISHER' && user[2] == 'READER') || (user[0] == 'READER' && user[1] == 'ADMIN' && user[2] == 'PUBLISHER') ) {
        this.router.navigate(['/requests']);
      }
      else if ((user[0] == 'READER' && user[1] == 'PUBLISHER') || (user[0] == 'PUBLISHER' && user[1] == 'READER')) {
          this.router.navigate(['/your-articles'])
      }
      else if(reader == 'READER') {
          this.router.navigate(['/users-article'])
      }


        this.tokenStorage.saveToken(userData.accessToken);
       this.tokenStorage.saveUser(userData);
    },
    err => {
      console.log(err.error)
      this.errorMessage = err.error.message;
    }
  );
  //}
}

}

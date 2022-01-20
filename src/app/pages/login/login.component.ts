import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginData, Users } from 'src/app/model/users';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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
      this.roles = this.tokenStorage.getUser().roles;
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
  if (this.loginForm.valid) {
     this.authService.login(this.loginForm.value).subscribe((userData: any) => { 
        this.router.navigate(['/user-admin']);
        
        this.tokenStorage.saveUser(userData);
        
        this.tokenStorage.saveToken(userData.accessToken);
    },
    err => {
      this.errorMessage = err.error.message;
    }
  );
  }
}

}
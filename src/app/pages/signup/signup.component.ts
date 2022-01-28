import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  role = "PUBLISHER";
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router,
              public translate: TranslateService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    console.log(lang)
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(256)]],
        role: ['', Validators.required]
      }
    );
  }
  get f(): {[key: string]: AbstractControl} {
    return this.signupForm.controls;
  }

  onSubmit(): void{
    this.submitted = true;
    if (this.signupForm.invalid){
      return;
    }
    else{
      this.authService.register(this.signupForm.value).subscribe(userData => {
        this.router.navigate(['/login'])
      }, error => {
        this.errorMessage = error.error.message;
      })
    }
  }
  onReset(): void {
    this.submitted = false;
    this.signupForm.reset();
  }

}

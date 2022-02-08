import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {TranslateService} from "@ngx-translate/core";
import { NotificationMessageService } from 'src/app/services/Notification/notification-message.service';
import { NotificationType } from 'src/app/model/NotificationMessage';
import {NgxSpinnerService} from "ngx-spinner";

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
              public translate: TranslateService, private notificationService:NotificationMessageService,
              private  spinnerService: NgxSpinnerService) {
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
    this.spinnerService.show()
    this.submitted = true;
    if (this.signupForm.invalid){
      return;
    }
    else{
      this.authService.register(this.signupForm.value).subscribe(userData => {
        this.notificationService.sendMessage({message:"Account created Successfully", type:NotificationType.success})
        this.router.navigate(['/login'])
        this.spinnerService.hide()
      }, error => {
        // this.errorMessage = error.error.message;
        this.spinnerService.hide()
        this.notificationService.sendMessage({message:error.error.message, type:NotificationType.error})
      })
    }
  }
  onReset(): void {
    this.submitted = false;
    this.signupForm.reset();
  }

}

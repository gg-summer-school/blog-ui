import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  role = "Publisher";

  constructor(private formBuilder: FormBuilder) { }

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
    console.log(JSON.stringify(this.signupForm.value, null, 2));
  }
  onReset(): void {
    this.submitted = false;
    this.signupForm.reset();
  }

}

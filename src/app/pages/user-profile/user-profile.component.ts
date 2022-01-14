import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  firstName: string = "Ndzo Daniel";
  email: string = "ndzodaniel31@gmail.com";

  constructor(private formBuilder: FormBuilder) { }
  user!: FormGroup;
  users = this.formBuilder.group({
    name: '',
    email: '',
    password: '',
    roles: ''
  });

  ngOnInit(): void {
  }

}

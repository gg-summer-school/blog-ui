import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  isBlocked = false;
  isSuspended = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClickBlock() {
    this.isBlocked = true;
    this.isSuspended = false;
  }

  onClickSuspend() {
    this.isSuspended = true;
    this.isBlocked = false;
  }

}

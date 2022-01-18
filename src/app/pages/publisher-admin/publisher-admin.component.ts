import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publisher-admin',
  templateUrl: './publisher-admin.component.html',
  styleUrls: ['./publisher-admin.component.scss']
})
export class PublisherAdminComponent implements OnInit {

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

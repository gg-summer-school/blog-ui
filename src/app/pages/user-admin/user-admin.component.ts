import { Component, OnInit } from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  isBlocked = false;
  isSuspended = false;
  readers: any;

  constructor(private adminPagesService: AdminPagesService) { }

  ngOnInit(): void {
    this.displayReaders()
  }

  displayReaders() {
    this.adminPagesService.getReaders()
      .subscribe( res=>
      {
        this.readers = res;
      })
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

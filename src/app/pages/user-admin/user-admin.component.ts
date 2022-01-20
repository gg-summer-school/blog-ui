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
  suspendUser: boolean = false;


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

  onClickSuspend(publisherId: string) {
    this.isSuspended = true;
    this.adminPagesService.suspendUser(publisherId, this.suspendUser).subscribe((res) => {
    })
  }

}

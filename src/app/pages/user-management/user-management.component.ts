import { Component, OnInit } from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";
import {Admin, roleDTO, RolePayload} from "../../model/admin";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  number!: number;
  isApproved: boolean = true;
  publishers: Admin[] = [];
  readers: Admin[] = [];

  constructor(private adminPagesService: AdminPagesService) { }

  ngOnInit(): void {
    this.displayAllUsers();
  }

  displayAllUsers() {
    this.adminPagesService.getPublishers(this.isApproved)
      .subscribe( res =>
      {
        this.displayPublishers();
        this.displayReaders();
        this.number= this.publishers.length && this.readers.length;
      })
  }

  displayPublishers() {
    this.adminPagesService.getPublishers(this.isApproved)
      .subscribe( res =>
      {
        this.publishers = res;
        this.number= this.publishers.length;
      })
  }

  displayReaders() {
    this.adminPagesService.getReaders()
      .subscribe( res=>
      {
        this.readers = res;
        this.number= this.readers.length;
      })
  }

  addRoleToUser(user_id: string, event:any) {
    const role : roleDTO = {
      role : (<any>RolePayload)[event.target.value]
    }
    this.adminPagesService.appendRole(user_id, role).subscribe((res: any) => {
      console.log(res);
    }, (error: any) => {
      alert(error.error.message);
    })
    window.location.reload();

  }

  removeRoleToUser(user_id: string, event:any) {
    const role : roleDTO = {
      role : (<any>RolePayload)[event.target.value]
    }
    this.adminPagesService.removeRole(user_id, role).subscribe((res: any) => {
      console.log(res);
    }, (error: any) => {
      alert(error.error.message);
    })
    window.location.reload();
  }
}

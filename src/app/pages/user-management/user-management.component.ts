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
  allUsers: Admin[] = [];

  constructor(private adminPagesService: AdminPagesService) { }

  ngOnInit(): void {
    this.displayAllUsers();
  }

  displayAllUsers() {
    this.adminPagesService.getUsers()
      .subscribe( res =>
      {
        this.allUsers = res;
        this.number= this.allUsers.length;
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

import { Component, OnInit } from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";
import {Admin, roleDTO, RolePayload} from "../../model/admin";
import {NotificationMessageService} from "../../services/Notification/notification-message.service";
import {NotificationType} from "../../model/NotificationMessage";
import {NgxSpinnerService} from "ngx-spinner";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {
  user2: any[] = [];
  addRoles: string[] = [];
  userRoles: any[] = [];
  enableRole = '';

  number!: number;
  publishers: Admin[] = [];
  readers: Admin[] = [];
  allUsers: Admin[] = [];
  rolePayload: Admin[] = [];

  constructor(private adminPagesService: AdminPagesService,  private notificationService:NotificationMessageService,
              private  spinnerService: NgxSpinnerService, private tokenStore: TokenStorageService) { }

  ngOnInit(): void {
    this.user2 = [
      'ROLE_ADMIN',
      'ROLE_PUBLISHER',
      'ROLE_READER'
    ]
    this.displayAllUsers();
  }

  getUserRoles(userId : string) {
    const user = this.allUsers.find((user) => user.id === userId);
    const role = [...this.user2];
    const tes: string[] = [];
    // @ts-ignore
    this.userRoles.push(user.role);

    // @ts-ignore
    const test2 = user.role.map(function (obj) {
      return obj.role;
    });

    const filteredArray = role.filter(value => !test2.includes(value));
    for(let filter of filteredArray){
      this.enableRole = (filter)
    }

    // for(let i = 0; i<=filteredArray.length; i++) {
    //   this.enableRole = filteredArray[i];
    // }

    this.addRoles = filteredArray;
  }

  displayAllUsers() {
    this.spinnerService.show()
    this.adminPagesService.getUsers()
      .subscribe( res =>
      {
        this.allUsers = res;
        this.rolePayload = this.allUsers;
        this.number= this.allUsers.length;
        this.spinnerService.hide()
      })
  }



  addRoleToUser(user_id: string, event:any) {
    this.spinnerService.show()
    const role : roleDTO = {
      role : (<any>RolePayload)[event.target.value]
    }
    this.adminPagesService.appendRole(user_id, role).subscribe((res: any) => {
  this.spinnerService.hide()
    }, (error: any) => {
      this.spinnerService.hide()
      this.notificationService.sendMessage({message: error.error.message, type:NotificationType.error})
    })
    window.location.reload();
  }

  removeRoleToUser(user_id: string, event:any) {
    this.spinnerService.show()
    const role : roleDTO = {
      role : (<any>RolePayload)[event.target.value]
    }
    this.adminPagesService.removeRole(user_id, role).subscribe((res: any) => {
  this.spinnerService.hide()
    }, (error: any) => {
      this.spinnerService.hide()
      this.notificationService.sendMessage({message: error.error.message, type:NotificationType.error})
    })
    window.location.reload();
  }
}

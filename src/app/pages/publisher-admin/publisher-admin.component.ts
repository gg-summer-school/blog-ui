import { Component, OnInit } from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";
import {Admin, roleDTO, RolePayload} from "../../model/admin";

@Component({
  selector: 'app-publisher-admin',
  templateUrl: './publisher-admin.component.html',
  styleUrls: ['./publisher-admin.component.scss']
})
export class PublisherAdminComponent implements OnInit {

  isBlocked = false;
  isSuspended = false;

  publishers: Admin[] = [];
  isApproved: boolean = true;
  publisherId: string = 'e4ab681b-34c8-4f54-8b0a-88423122bffd';
  numberOfArticles: Admin[] = [];
  status: string = 'Suspend';
  suspendUser: boolean = false;
  addRole!: RolePayload;
  reactivate: boolean = true;
  number!: number

  constructor(private adminPagesService: AdminPagesService) { }

  ngOnInit(): void {
    this.displayPublishers();
    // this.getArticlesById()
  }

  displayPublishers() {
    this.adminPagesService.getPublishers(this.isApproved)
      .subscribe( res =>
      {
        this.publishers = res;
      })
    this.number= this.publishers.length;
  }

  suspendPublisher(publisherId: string) {
    this.adminPagesService.suspendUser(publisherId, this.suspendUser).subscribe((res) => {
      this.displayPublishers();
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
  }

  reactivateUser(publisherId: string) {
    this.adminPagesService.reactivateUser(publisherId, this.reactivate).subscribe((res) => {
      this.displayPublishers();
    })
  }

  onClickSuspend() {
    this.isSuspended = true;
    this.isBlocked = false;
    }


    // getArticlesById() {
    //   this.adminPagesService.getArticlesByPublisher(this.publisherId, this.isApproved)
    //     .subscribe( res =>
    //     {
    //       // console.log(res)
    //     })
    // }

  }

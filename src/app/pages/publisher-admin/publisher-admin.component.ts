import { Component, OnInit } from '@angular/core';
import { AdminPagesService } from "../../services/admin-services/admin-pages.service";
import { Admin } from "../../model/admin";

@Component({
  selector: 'app-publisher-admin',
  templateUrl: './publisher-admin.component.html',
  styleUrls: ['./publisher-admin.component.scss']
})
export class PublisherAdminComponent implements OnInit {

  isBlocked = false;
  isSuspended = false;

  publishers: any;
  isApproved: boolean = true;
  publisherId: string = 'e4ab681b-34c8-4f54-8b0a-88423122bffd';
  numberOfArticles: Admin[] = [];
  status: string = 'Suspend';
  suspendUser: boolean = false;
  addRole: boolean = false;
  reactivate: boolean = true;


  constructor(private adminPagesService: AdminPagesService) { }

  ngOnInit(): void {
    this.displayPublishers();
    // this.getArticlesById()
  }

  displayPublishers() {
    // this.adminPagesService.getPublishers(this.isApproved)
    //   .subscribe( res =>
    //   {
    //     this.publishers = res;
    //     // console.log(this.publishers);
    //   })
  }

  getArticlesById() {
    // this.adminPagesService.getArticlesByPublisher(this.publisherId, this.isApproved)
    //   .subscribe( res =>
    //   {
    //     // console.log(res)
    //   })
  }

  onClickBlock() {
    this.isBlocked = true;
    this.isSuspended = false;
  }

  onClickSuspend() {
    this.isSuspended = true;
    this.isBlocked = false;

  }

  suspendPublisher(publisherId: string) {
    this.adminPagesService.suspendUser(publisherId, this.suspendUser).subscribe((res) => {
    })
  }

    addRoleToUser(publisherId: string) {
      this.adminPagesService.addRole(publisherId, this.addRole).subscribe((res) => {
      })
    }

    reactivateUser(publisherId: string) {
      this.adminPagesService.reactivateUser(publisherId, this.reactivate).subscribe((res) => {
      })
    }


    // getArticlesById() {
    //   this.adminPagesService.getArticlesByPublisher(this.publisherId, this.isApproved)
    //     .subscribe( res =>
    //     {
    //       // console.log(res)
    //     })
    // }

  }

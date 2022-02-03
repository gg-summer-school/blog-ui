import { Component, OnInit } from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";
import {Admin, roleDTO, RolePayload} from "../../model/admin";
import {TranslateService} from "@ngx-translate/core";

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
  status: string = 'Suspend';
  suspendUser: boolean = false;
  reactivate: boolean = true;
  number!: number

  constructor(private adminPagesService: AdminPagesService, public translate: TranslateService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.displayPublishers();
    // this.getArticlesById()
  }

  switchLang(lang: string) {
    console.log(lang)
    this.translate.use(lang);
  }


  displayPublishers() {
    this.adminPagesService.getPublishers(this.isApproved)
      .subscribe( res =>
      {
        this.publishers = res;
        this.number= this.publishers.length;
      })
  }

  suspendPublisher(publisherId: string) {
    this.adminPagesService.suspendUser(publisherId, this.suspendUser).subscribe((res) => {
      this.displayPublishers();
    }, (error: any) => {
      alert(error.error.message);
    })
  }

  reactivateUser(publisherId: string) {
    this.adminPagesService.reactivateUser(publisherId, this.reactivate).subscribe((res) => {
      this.displayPublishers();
    }, (error: any) => {
      alert(error.error.message);
    })
  }

  onClickSuspend() {
    this.isSuspended = true;
    this.isBlocked = false;
    }

  }

import { Component, OnInit } from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  isApproved: boolean = false;
  publishers: any;
  approveUser: boolean = true;
  number!: number;


  constructor(private adminPagesService: AdminPagesService, public translate: TranslateService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    console.log(lang)
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.displayPendingPublishers();
  }

  displayPendingPublishers() {
    this.adminPagesService.getPublishers(this.isApproved)
      .subscribe( res=>
      {
        this.publishers = res;
        this.number= this.publishers.length;
      })
  }

  approvePublisher(publisherId: string) {
    this.adminPagesService.approveUser(publisherId, this.approveUser).subscribe((res) => {
    })
    window.location.reload();
  }

  declineUser(publisherId: string) {
    this.adminPagesService.declineUser(publisherId).subscribe((res) => {
    })
    window.location.reload();
  }


}

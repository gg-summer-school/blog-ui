import { Component, OnInit } from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";
import {Admin, roleDTO, RolePayload} from "../../model/admin";
import {TranslateService} from "@ngx-translate/core";
import {NotificationMessageService} from "../../services/Notification/notification-message.service";
import {NotificationType} from "../../model/NotificationMessage";
import {NgxSpinnerService} from "ngx-spinner";

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
  success: any;

  constructor(private adminPagesService: AdminPagesService, public translate: TranslateService,
              private notificationService:NotificationMessageService,
              private  spinnerService: NgxSpinnerService) {
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
    this.spinnerService.show()
    this.adminPagesService.getPublishers(this.isApproved)
      .subscribe( res =>
      {
        this.publishers = res;
        this.number= this.publishers.length;
        this.spinnerService.hide()
      }, error =>
      {
        this.spinnerService.hide()
        this.notificationService.sendMessage({message: error.error.message, type:NotificationType.error})
      })
  }

  suspendPublisher(publisherId: string) {
    this.spinnerService.show()
    this.adminPagesService.suspendUser(publisherId, this.suspendUser).subscribe((res) => {
      this.displayPublishers();
      this.spinnerService.hide()
    }, (error: any) => {
      this.spinnerService.hide()
      this.notificationService.sendMessage({message: error.error.message, type:NotificationType.error})
    })
    // this.success = this.notificationService.sendMessage({message: "User successfully Suspended", type:NotificationType.success})
  }

  reactivateUser(publisherId: string) {
    this.spinnerService.show(
    )
    this.adminPagesService.reactivateUser(publisherId, this.reactivate).subscribe((res) => {
      this.displayPublishers();
      this.spinnerService.hide()
      this.notificationService.sendMessage({message: 'User successfully reactivated', type:NotificationType.success})
    }, (error: any) => {
      this.spinnerService.hide()
      this.notificationService.sendMessage({message: error.error.message, type:NotificationType.error})
    })
  }

  onClickSuspend() {
    this.isSuspended = true;
    this.isBlocked = false;
    }

  }

import { Component, OnInit } from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";
import {TranslateService} from "@ngx-translate/core";
import {NotificationType} from "../../model/NotificationMessage";
import {NotificationMessageService} from "../../services/Notification/notification-message.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Admin} from '../../model/admin';

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
  page = 1;
  count = 0;
  tableSize = 5;
  pub:any;
  publisher!: Admin;


    // tslint:disable-next-line:align
  constructor(private adminPagesService: AdminPagesService, public translate: TranslateService,
              private notificationService: NotificationMessageService,  private  spinnerService: NgxSpinnerService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  // tslint:disable-next-line:typedef
  switchLang(lang: string) {
    console.log(lang);
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.displayPendingPublishers();
  }

  displayPendingPublishers(): any {
    this.spinnerService.show();
    this.adminPagesService.getPublishers(this.isApproved)
      .subscribe( res =>
      {

        const pub = res;
        this.publishers = pub.reverse();
        this.number = this.publishers.length;
        this.spinnerService.hide()
      }, error =>
      {
        this.spinnerService.hide();
      });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.displayPendingPublishers();
  }

  approvePublisher(publisherId: string): any {
    this.spinnerService.show();
    this.adminPagesService.approveUser(publisherId, this.approveUser).subscribe((res) => {
      this.spinnerService.hide();
      window.location.reload();
      this.notificationService.sendMessage({message: 'User successfully approved', type: NotificationType.success});
    },
      error => {
      this.spinnerService.hide();
      this.notificationService.sendMessage({message: error.error.message, type: NotificationType.error});
      });

  }

  declinePublisher(publisherId: string): any {
    this.spinnerService.show();
    this.adminPagesService.declineUser(publisherId).subscribe((res) => {
      this.spinnerService.hide();
      window.location.reload();
      this.notificationService.sendMessage({message: 'User successfully reactivated', type: NotificationType.error});
    },
      error =>
      {
        this.spinnerService.hide();
        this.notificationService.sendMessage({message: error.error.message, type: NotificationType.error});
      });
  }

  view(pub:any)
  {
    this.pub = pub;
  }

  getPublisherId(publisherId: string): any{
    this.publisher = this.publishers.find((item: any) => item.id === publisherId);
  }
  approvePub(): any{
    this.approvePublisher(this.publisher.id);
  }
  declinePub(): any{
    this.declinePublisher(this.publisher.id);
  }




}

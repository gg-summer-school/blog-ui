import { Component, OnInit } from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";
import {Transactions} from "../../model/admin";
import {TokenStorageService} from "../../services/token-storage.service";
import {TranslateService} from "@ngx-translate/core";
import {NotificationMessageService} from "../../services/Notification/notification-message.service";
import {NotificationType} from "../../model/NotificationMessage";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.scss']
})
export class ViewTransactionsComponent implements OnInit {

  transactions: Transactions[] = [];
  userId: string = '';
  error:string= "";

  constructor(private adminPagesService: AdminPagesService, private tokenStorageService: TokenStorageService,
              public translate: TranslateService,  private notificationService:NotificationMessageService,
              private  spinnerService: NgxSpinnerService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    console.log(lang)
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.userId = this.tokenStorageService.getUser().id;
    this.transactionDetails();
  }

  transactionDetails() {
    this.spinnerService.show()
    this.adminPagesService.transactionDetails(this.userId)
      .subscribe( res =>
      {
        this.transactions = res;
        this.spinnerService.hide()
      },error =>
      {
        this.error= error.error.message;
        this.spinnerService.hide()
        // this.notificationService.sendMessage({message: this.error, type:NotificationType.error})
      })
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ArticlesService} from '../../services/articles.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {TranslateService} from "@ngx-translate/core";
import {NotificationType} from "../../model/NotificationMessage";
import {NotificationMessageService} from "../../services/Notification/notification-message.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  userid: string = '';
  articleid: string = '';

  constructor(private formBuilder: FormBuilder, private article: ArticlesService, private tokenservice: TokenStorageService,
              public translate: TranslateService, private notificationService:NotificationMessageService,
              private  spinnerService: NgxSpinnerService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }
  paymentForm = this.formBuilder.group({
    nameOfArticle: '',
    payment: ''
  });

  ngOnInit(): void {
     this.userid = this.tokenservice.getUser().id;
  }
  // tslint:disable-next-line:typedef
  payAnArticle() {
this.spinnerService.show()
    this.article.PayArticle(this.userid, this.articleid, this.paymentForm.value).subscribe((response) => {
      this.spinnerService.hide()
     },
      error => {
      this.spinnerService.hide()
        this.notificationService.sendMessage({message: error.error.message, type:NotificationType.error})
      }
    ) ;
  }


}

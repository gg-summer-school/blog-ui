import { Component, OnInit } from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";
import {Transactions} from "../../model/admin";
import {TokenStorageService} from "../../services/token-storage.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.scss']
})
export class ViewTransactionsComponent implements OnInit {

  transactions: Transactions[] = [];
  userId: string = '';

  constructor(private adminPagesService: AdminPagesService, private tokenStorageService: TokenStorageService,
              public translate: TranslateService) { }

  switchLang(lang: string) {
    console.log(lang)
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.userId = this.tokenStorageService.getUser().id;
    console.log(this.userId);
    this.transactionDetails();
  }

  transactionDetails() {
     this.adminPagesService.transactionDetails(this.userId)
       .subscribe( res =>
     {
       return this.transactions = res;
     })
  }

}

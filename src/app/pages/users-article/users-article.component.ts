import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ArticleDto, Articles} from 'src/app/model/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import {PaidArticlesService} from "../../services/user-services/paid-articles.service";

import {TokenStorageService} from "../../services/token-storage.service";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {NotificationType} from "../../model/NotificationMessage";
import {NotificationMessageService} from "../../services/Notification/notification-message.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-users-article',
  templateUrl: './users-article.component.html',
  styleUrls: ['./users-article.component.scss']
})
export class UsersArticleComponent implements OnInit {
  userPaidArticles!: ArticleDto[];
  userId: string = '';
  publisherId:string='';
  number!: number;

  constructor(private articleService: ArticlesService, private tokenStorageService: TokenStorageService,
              private paidArticlesService: PaidArticlesService, private sanitizer: DomSanitizer,
              public translate: TranslateService, private router: Router, private notificationService:NotificationMessageService,
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
    this.getBook();

  }

  getBook() {
    this.spinnerService.show()
    this.paidArticlesService.getBookTitle(this.userId)
      .subscribe(
        (res: ArticleDto[]) => {
          this.userPaidArticles = res;
          this.number=this.userPaidArticles.length;
          this.spinnerService.hide()
        },
        error =>
        {
          this.spinnerService.hide()
          this.notificationService.sendMessage({message: error.error.message, type:NotificationType.error})
        }
      )
  }


  view(id: string, doc:string)
  {
    this.router.navigate(['/view-article', id, doc]);
  }

}




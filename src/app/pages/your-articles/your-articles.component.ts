import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import {DashboardPublisherService} from "../../services/dashboard-publisher.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {ArticleDto} from "../../model/articles";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {NotificationMessageService} from "../../services/Notification/notification-message.service";
import {NotificationType} from "../../model/NotificationMessage";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-your-articles',
  templateUrl: './your-articles.component.html',
  styleUrls: ['./your-articles.component.scss']
})
export class YourArticlesComponent implements OnInit {

  pubArticles:ArticleDto[]=[];
  publisherId:string='';
  error:string='';
  doc:string = '';
  number!: number;
  page = 1;
  count = 0;
  tableSize = 5;
  constructor(private articleService: ArticlesService, private publisherService: DashboardPublisherService,
              private tokenStorage: TokenStorageService, private router: Router,
              public translate: TranslateService,
              private notificationService:NotificationMessageService,
              private  spinnerService: NgxSpinnerService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.publisherId= this.tokenStorage.getUser().id;

    this.getArticlesByPublisher();
  }

  getArticlesByPublisher()
  {
    this.spinnerService.show();
    this.publisherService.getArticlesByPublisher(this.publisherId).subscribe((res:ArticleDto[])=>
    {
      const article = res;
      this.pubArticles = article.reverse();
      this.number = this.pubArticles.length;
      this.spinnerService.hide();

    },
      error1 =>
      {
        this.error= error1.error.message;
        this.notificationService.sendMessage({message: this.error, type:NotificationType.error})
        this.spinnerService.hide();
      }
    )
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getArticlesByPublisher();
  }


  edit(id:string, catid:string)
  {
    this.router.navigate(['edit-article', id, catid]);
  }

  // previewArticle(id:string){
  //   let article:ArticleDto;
  //   for(let art of this.pubArticles){
  //     if(art.id === id){
  //       article =  art;
  //       this.doc = article.document;
  //
  //     }
  //   }
  //
  //
  // }

 previewArticle(id: string, doc:string)
 {
   this.router.navigate(['/view-article', id, doc]);
 }
}

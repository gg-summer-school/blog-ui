import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import {DashboardPublisherService} from "../../services/dashboard-publisher.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {ArticleDto} from "../../model/articles";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-your-articles',
  templateUrl: './your-articles.component.html',
  styleUrls: ['./your-articles.component.scss']
})
export class YourArticlesComponent implements OnInit {

  pubArticles:ArticleDto[]=[];
  publisherId:string='';
  deleteMessage:boolean=false;
  errorMessage:string='';
  error:boolean=false;

  constructor(private articleService: ArticlesService, private publisherService: DashboardPublisherService,
              private tokenStorage: TokenStorageService, private router: Router,
              public translate: TranslateService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    console.log(lang)
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.publisherId= this.tokenStorage.getUser().id;
    console.log(this.publisherId);
    this.getArticlesByPublisher();
  }

  getArticlesByPublisher()
  {
    this.publisherService.getArticlesByPublisher(this.publisherId).subscribe(res=>
    {
      this.pubArticles=res;
      console.log(res);
    })
  }

  delete(userId:string, articleId:string, categoryId:string)
  {
    this.publisherService.deleteArticle(userId,articleId,categoryId).subscribe(res=>
    {
      this.deleteMessage=true;
      this.getArticlesByPublisher();
      window.location.reload()

    },
      error => {
      this.error=true;
      this.errorMessage=error.error.errorMessage;
      })
  }
  edit(id:string, catid:string)
  {
    this.router.navigate(['edit-article', id, catid]);
  }


}

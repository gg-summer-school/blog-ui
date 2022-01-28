import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ArticleDto, Articles} from 'src/app/model/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import { saveAs } from 'file-saver';
import {DashboardPublisherService} from "../../services/dashboard-publisher.service";
import {PaidArticlesService} from "../../services/user-services/paid-articles.service";
import {PaidArticles} from "../../model/paidArticles";
import {TokenStorageService} from "../../services/token-storage.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-users-article',
  templateUrl: './users-article.component.html',
  styleUrls: ['./users-article.component.scss']
})
export class UsersArticleComponent implements OnInit {
  userPaidArticles!: PaidArticles[];
  userId: string = '';
  articleId!: string;
  userPaidArticle!: Articles[];
  pubArticles:ArticleDto[]=[];
  publisherId:string='';
  number!: number;

  constructor(private articleService: ArticlesService, private tokenStorageService: TokenStorageService,
              private paidArticlesService: PaidArticlesService, private sanitizer: DomSanitizer,
              public translate: TranslateService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }
  fileUrl: any;

  switchLang(lang: string) {
    console.log(lang)
    this.translate.use(lang);
  }
  ngOnInit(): void {
    this.userId = this.tokenStorageService.getUser().id;
    console.log(this.userId);
    this.getBookTitle();
    // const data = 'some text';
    // const blob = new Blob([data], { type: 'application/octet-stream' }
    // );
    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  getBookTitle() {
    this.paidArticlesService.getBookTitle(this.userId)
      .subscribe(
        res => {
          return this.userPaidArticles = res;
        }
      )
  }

  // getArticlesByPublisher()
  // {
  //   this.publisherService.getArticlesByPublisher(this.publisherId).subscribe(res=>
  //   {
  //     this.pubArticles=res;
  //     console.log(res);
  //   })
  // }
  //
  // getAllUserPaidArticles(){
  //   this.articleService.getAllUserPaidArticles(this.userId).subscribe((data: any)=> {
  //     console.log((data));
  //     this.userPaidArticles = data;
  //     console.log(this.userPaidArticles);
  //   });
  // }
  //
  // getUserPaidArticle(){
  //   this.articleService.getAllOneUserPaidArticle(this.userId, this.articleId).subscribe((data: any) => {
  //     console.log((data));
  //     this.userPaidArticle = data;
  //     console.log(this.userPaidArticle);
  //   });
  // }
  //
  // downloadArticle(){
  //  this.articleService.downloadArticle().subscribe((response: any) => {
  //   let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
  //   const url = window.URL.createObjectURL(blob);
  //   //window.open(url);
  //   saveAs(blob, 'employees.json');
  //   }), (error: any) => console.log('Error downloading the file'),
  //   () => console.info('File downloaded successfully');
  // }

}




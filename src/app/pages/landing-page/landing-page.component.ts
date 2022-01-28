import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticlesService } from "../../services/articles.service";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { TokenStorageService } from "../../services/token-storage.service";
import { ArticleDto } from "../../model/articles";
import { Subscription } from 'rxjs';
import { ArticleResource } from 'src/app/model/articleDtoList';
import { HttpErrorResponse } from '@angular/common/http';
import {TranslateService} from "@ngx-translate/core";
import { Categories } from 'src/app/model/categories';
 

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  page = 0;
  tableSize = 6;
  count = 0;
  pageSize = 8;
  nums: any;
  searchData = '';
  totalPages: number = 0;
  allArticles: ArticleDto[] = [];
  pages: any = 0;
  category: boolean = false;
  checkArticleLength!:boolean;
  pageNumberArray: number[] = [];
  pageNum: number = 0;
  subscriptions: Subscription[] = [];
  active: boolean | undefined;
  categories!: Categories[];


  constructor(private articlesService: ArticlesService, private router: Router,
    public tokenStorage: TokenStorageService, private activateRoute: ActivatedRoute, public translate:TranslateService) {
      translate.addLangs(['en', 'fre']);
      translate.setDefaultLang('en');
      // translate.use('en');
  }

  selectedLang: any;
  switchLang(lang: string) {
    // this.translate.use(lang);
  }

  ngOnDestroy(): void {
    for(const sub of this.subscriptions){
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getAllArticles(this.pageNum, this.pageSize);
    this.getAllCategories();
  }
  previous() {
    this.activateRoute.queryParams.subscribe(params => {
      if (params.page !== undefined) {
        this.pageNum = parseInt(params.page) - 1;

      }
    })
    this.getAllArticles(this.pageNum, this.pageSize);
    this.router.navigate(['/landing-page/articles'], { queryParams: { page: this.pageNum } });
  }

  Next() {
    this.activateRoute.queryParams.subscribe(params => {
      if (params.page !== undefined) {
        this.pageNum = parseInt(params.page) + 1;
      }
    })
    this.getAllArticles(this.pageNum, this.pageSize);
    this.router.navigate(['/landing-page/articles'], { queryParams: { page: (this.pageNum) } });
  }

  setPage(currentPageIndex: number, currentPage:number) {
    this.getAllArticles(currentPageIndex, this.pageSize);
    this.router.navigate(['/landing-page/articles'], { queryParams: { page: (currentPageIndex) } });
  }
  getAllArticles(page: number, pageSize: number) {

    const subscription = this.articlesService.getAllArticles(page, pageSize).subscribe((response: ArticleResource) => {
      this.allArticles = response.articleDtoList
      this.allArticles.map(article => {
        article.image ='data:'+article.contentType+';base64,'+ article.coverPage
      })  
      this.pages = response.totalPages;
      this.pageNumberArray = (Array.from(Array(this.pages).keys()));

    }, (error: HttpErrorResponse) => {

    }
    ).add(() => {
      // loader here
    })
    this.subscriptions.push(subscription);
  }

  view(id: string) {
    this.router.navigate(['/articles-detail', id]);
  }


  selectedIndex!: number;
  select(index: number) {
    this.selectedIndex = index;
  }

  onTableDataChange(){}

  getAllCategories(){
    const subscription = this.articlesService.getCategory().subscribe((response:Categories[]) => {
        this.categories = response;
    }, (error: HttpErrorResponse) => {
    }
    ).add(() => {
      // loader here
    })
    this.subscriptions.push(subscription);
  }

  getArticlesByCategory(categoryId:string){
    const subscription = this.articlesService.getArticlesByCategory(categoryId).subscribe((response:ArticleDto[]) => {
      this.allArticles = response;
      this.allArticles.map(article => {
        article.image ='data:'+article.contentType+';base64,'+ article.coverPage
      })  
      if(this.allArticles != undefined){
        this.router.navigate(['/landing-page/articles/categories'], { queryParams: { 'category-name': this.allArticles[0].categoryName } });
      }
    }, (error: HttpErrorResponse) => {
    }
    ).add(() => {
      // loader here
    })
    this.subscriptions.push(subscription);
  }

}

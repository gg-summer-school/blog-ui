import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticlesService } from "../../services/articles.service";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { TokenStorageService } from "../../services/token-storage.service";
import { Categories } from "../../model/categories";
import { ArticleDto } from "../../model/articles";
import { Subscription } from 'rxjs';
import { ArticleResource } from 'src/app/model/articleDtoList';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
 
  count = 0;
  pageSize = 3;
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
   

  constructor(private articlesService: ArticlesService, private router: Router,
    public tokenStorage: TokenStorageService, private activateRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
    for(const sub of this.subscriptions){
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getAllArticles(this.pageNum, this.pageSize);
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

}


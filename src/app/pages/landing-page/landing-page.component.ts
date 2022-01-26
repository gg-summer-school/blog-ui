import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../../services/articles.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";
import {Categories} from "../../model/categories";
import {ArticleDto} from "../../model/articles";
import {TranslateService} from "@ngx-translate/core";
// import { ArticleDtoList } from 'src/app/model/articleDtoList';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  page = 0;
  count = 0;
  pageSize = 3;
  nums:any;
  searchData='';

  totalPages: number = 0;
  //Allcategories:Categories[]=[];
  allCategories:Categories[]=[];
  allArticles!: any[];
  categoryArticles:ArticleDto[]=[];
  pages: any = 0;
  category:boolean=false;

  testArray: any[] = [];

  constructor( private articlesService:ArticlesService, private router: Router,
               public tokenStorage: TokenStorageService, public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  setPage(i: any, event: any) {
    event.preventDefault();
    this.page = i;
    this.getAllArticles();
  }

  ngOnInit(): void {
    this.nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
   this.getCategories();
   this.getAllArticles();
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  handlePageChange(event:any){
    this.pageSize = event;
    this.getAllArticles();
  }

  incrementNum() {
    this.page++
  }

  getCategories() {
    this.articlesService.getCategory().subscribe(res=>
    {
      this.allCategories=res;
    })

  }

  getAllArticles() {
    this.articlesService.getAllArticles(this.page, this.pageSize).subscribe((res: any) => {
       this.allArticles = res.articleDtoList;
       this.pages = res.totalPages;
       this.testArray = (Array.from(Array(this.pages).keys()));
    })
  }

  view(id: string)
  {
    this.router.navigate(['/articles-detail', id]);
  }
  categoryAticle(catid: string)
  {
    this.articlesService.getArticlesByCategory(catid).subscribe(res=>
    {
      this.categoryArticles= res;
      this.category=true
    },
      error => {
      console.log(error);
      })
  }

  selectedIndex!: number;
  select(index: number) {
    this.selectedIndex = index;
  }

}

import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../../services/articles.service";
import {Categories} from "../../model/categories";
import { Articles } from 'src/app/model/articles';
import { ArticleList } from 'src/app/model/articleDtoList';
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
  allCategories:any;
  allArticles!: any[];
  pages: any = 0;

  testArray: any[] = [];

  constructor( private articlesService:ArticlesService) { }

  previous(event: any) {
     
  }

  Next() {
    
  }

  setPage(i: any, event: any) {
    event.preventDefault();
    this.page = i;
    this.getAllArticles();
  }

  ngOnInit(): void {
   this.getCategories();
   this.getAllArticles();
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

}

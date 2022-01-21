import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../../services/articles.service";
import {Categories} from "../../model/categories";
import { ArticleList } from 'src/app/model/articles';
import { ArticleDto } from 'src/app/model/articlesDto';

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
  //Allcategories:Categories[]=[];
  allCategories:any;
  allArticles!: any;

  pages: any = 0;

  tesArray: any[] = []


  constructor( private articlesService:ArticlesService) { }

  setPage(i: any, event: any) {
    event.preventDefault();
    this.page = i;
    this.getAllArticles();
  }

  ngOnInit(): void {
   this.nums=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
   this.getCategories();
   this.getAllArticles();
  }
  onTableDataChange(event:any){
    this.page = event;

  }
  getCategories() {
    this.articlesService.getCategory().subscribe(res=>
    {
      this.allCategories=res;
    })

  }

  getAllArticles() {
    this.articlesService.getAllArticles(this.page, this.pageSize).subscribe((res: ArticleList) => {
        this.allArticles = res.articleDtoLIst;
        console.log(this.allArticles.title);
        
        this.pages = res.totalPages;
        console.log(res.totalElements);
        console.log(res.totalPages);
        this.tesArray = (Array.from(Array(this.pages).keys()));
    })
  }
}

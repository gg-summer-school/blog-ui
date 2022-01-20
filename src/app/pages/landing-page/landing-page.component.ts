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
  tableSize = 20;
  nums:any;
  searchData='';
  //Allcategories:Categories[]=[];
  allCategories:any;
  allArticles!: any[];


  constructor( private articlesService:ArticlesService) { }

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
    this.articlesService.getAllArticles(this.page, this.tableSize).subscribe((res: ArticleList) => {
       this.allArticles = res.articleDtoList;
       console.log(res.articleDtoList);
    })
  }

}

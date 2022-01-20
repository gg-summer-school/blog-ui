import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/model/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import {DashboardPublisherService} from "../../services/dashboard-publisher.service";

@Component({
  selector: 'app-your-articles',
  templateUrl: './your-articles.component.html',
  styleUrls: ['./your-articles.component.scss']
})
export class YourArticlesComponent implements OnInit {
  userId! : string;
  userArticles!: Articles[];
  pubArticles:any=[];

  constructor(private articleService: ArticlesService, private publisherService: DashboardPublisherService) { }

  ngOnInit(): void {
    this.getArticlesByPublisher();
  }
  getAllUserArticles(){
    this.articleService.displayAlluserArticles(this.userId).subscribe((data: any)=> {
      console.log((data))
      this.userArticles = data;
      console.log(this.userArticles)
    })
  }

  getArticlesByPublisher()
  {
    this.publisherService.getArticlesByPublisher("37d7b7d7-7e2f-4bf4-b6d4-c2d865aea491").subscribe(res=>
    {
      this.pubArticles=res;
      console.log(res);
    })
  }

}

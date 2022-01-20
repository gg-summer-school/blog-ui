import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/model/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import {DashboardPublisherService} from "../../services/dashboard-publisher.service";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-your-articles',
  templateUrl: './your-articles.component.html',
  styleUrls: ['./your-articles.component.scss']
})
export class YourArticlesComponent implements OnInit {
  userId! : string;
  userArticles!: Articles[];
  pubArticles:any=[];
  publisherId:string='';

  constructor(private articleService: ArticlesService, private publisherService: DashboardPublisherService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.publisherId= this.tokenStorage.getUser().id;
    console.log(this.publisherId);
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
    this.articleService.getArticlesByPublisher(this.publisherId).subscribe(res=>
    {
      this.pubArticles=res;
      console.log(res);
    })
  }

}

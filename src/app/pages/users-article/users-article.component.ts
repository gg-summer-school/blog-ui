import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/model/articles';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-users-article',
  templateUrl: './users-article.component.html',
  styleUrls: ['./users-article.component.scss']
})
export class UsersArticleComponent implements OnInit {
  userPaidArticles!: Articles[];
  userId!: number;
  articleId!: number;
  userPaidArticle!: Articles[];

  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {
  }
  getAllUserPaidArticles(){
    this.articleService.getAllUserPaidArticles(this.userId).subscribe((data: any)=> {
      console.log((data))
      this.userPaidArticles = data;
      console.log(this.userPaidArticles)
    })
  }
  getUserPaidArticle(){
    this.articleService.getAllOneUserPaidArticle(this.userId, this.articleId).subscribe((data: any) => {
      console.log((data))
      this.userPaidArticle = data;
      console.log(this.userPaidArticle)
    })
  }

}

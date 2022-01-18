import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/model/articles';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-your-articles',
  templateUrl: './your-articles.component.html',
  styleUrls: ['./your-articles.component.scss']
})
export class YourArticlesComponent implements OnInit {
  userId! : number;
  userArticles!: Articles[];

  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {
  }
  getAllUserArticles(){
    this.articleService.displayAlluserArticles(this.userId).subscribe((data: any)=> {
      console.log((data))
      this.userArticles = data;
      console.log(this.userArticles)
    })
  }

}

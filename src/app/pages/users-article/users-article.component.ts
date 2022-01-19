import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Articles } from 'src/app/model/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-users-article',
  templateUrl: './users-article.component.html',
  styleUrls: ['./users-article.component.scss']
})
export class UsersArticleComponent implements OnInit {
  userPaidArticles!: Articles[];
  userId!: string;
  articleId!: string;
  userPaidArticle!: Articles[];

  constructor(private articleService: ArticlesService,private sanitizer: DomSanitizer) { }
  fileUrl: any;

  ngOnInit(): void {
    const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
  getAllUserPaidArticles(){
    this.articleService.getAllUserPaidArticles(this.userId).subscribe((data: any)=> {
      console.log((data));
      this.userPaidArticles = data;
      console.log(this.userPaidArticles);
    });
  }
  getUserPaidArticle(){
    this.articleService.getAllOneUserPaidArticle(this.userId, this.articleId).subscribe((data: any) => {
      console.log((data));
      this.userPaidArticle = data;
      console.log(this.userPaidArticle);
    });
  }
  downloadArticle(){
   this.articleService.downloadArticle().subscribe((response: any) => {
    let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    //window.open(url);
    saveAs(blob, 'employees.json');
    }), (error: any) => console.log('Error downloading the file'),
    () => console.info('File downloaded successfully');
  }

}




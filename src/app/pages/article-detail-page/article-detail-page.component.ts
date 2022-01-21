import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ArticlesService} from '../../services/articles.service';
import {Password} from '../../model/users';
import {Payment} from '../../model/articles';
import {FormBuilder} from '@angular/forms';
import {TokenStorageService} from '../../services/token-storage.service';


@Component({
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.scss']
})
export class ArticleDetailPageComponent implements OnInit {
  fileUrl: any;
  sanitizer: any;
  articleid!: string;
  userid!: string;

  constructor(private formBuilder: FormBuilder, private article: ArticlesService, private tokenservice: TokenStorageService) {}

  paymentForm = this.formBuilder.group({
    nameOfArticle: '',
    payment: ''
  });

  ngOnInit(): void {
    this.userid = this.tokenservice.getUser().id;
    // const data = 'some text';
    // const blob = new Blob([data], {type: 'application/octet-stream'});
    //
    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  // tslint:disable-next-line:typedef
  payAnArticle() {
    this.article.PayArticle(this.userid, this.articleid, this.paymentForm).subscribe((response) => {
        console.log(response);
        console.log(this.paymentForm.value);
      }
    );
  }
}


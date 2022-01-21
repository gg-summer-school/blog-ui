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
  articleid = '9453c7ef-c210-474f-80cf-516756c83ac7';
  userid = 'cbaee553-0180-480a-8f41-cd684ff9b23e';

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
    console.log(this.paymentForm.value);
    this.article.PayArticle(this.userid, this.articleid, this.paymentForm.value).subscribe((response) => {
        console.log(response);     }
    );
  }
}


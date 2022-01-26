import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ArticlesService} from '../../services/articles.service';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  userid: string = '';
  articleid: string = '';

  constructor(private formBuilder: FormBuilder, private article: ArticlesService, private tokenservice: TokenStorageService) {}
  paymentForm = this.formBuilder.group({
    nameOfArticle: '',
    payment: ''
  });

  ngOnInit(): void {
     this.userid = this.tokenservice.getUser().id;
  }
  // tslint:disable-next-line:typedef
  payAnArticle() {
    console.log(this.paymentForm.value);
    this.article.PayArticle(this.userid, this.articleid, this.paymentForm.value).subscribe((response) => {
      console.log(response); }
    );
  }


}

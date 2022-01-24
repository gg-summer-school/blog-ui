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
  articleid = '9453c7ef-c210-474f-80cf-516756c83ac7';
  userid = 'cbaee553-0180-480a-8f41-cd684ff9b23e';
  constructor(private formBuilder: FormBuilder, private article: ArticlesService, private tokenservice: TokenStorageService) {}
  paymentForm = this.formBuilder.group({
    nameOfArticle: '',
    payment: ''
  });

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  payAnArticle() {
    console.log(this.paymentForm.value);
    this.article.PayArticle(this.userid, this.articleid, this.paymentForm.value).subscribe((response) => {
      console.log(response); }
    );
  }

}

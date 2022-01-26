import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute, Router} from "@angular/router";
import {DashboardPublisherService} from "../../services/dashboard-publisher.service";
import {ArticleDto, Payment} from "../../model/articles";
import {TokenStorageService} from "../../services/token-storage.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {loginData} from "../../model/users";
import {ArticlesService} from "../../services/articles.service";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.scss']
})
export class ArticleDetailPageComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  role = "PUBLISHER";
  errorMessage = '';
  fileUrl: any;
  sanitizer: any;
  articleId: string='';
  categoryId:string="";
  userId:string='';
  article!:ArticleDto;
  info:any;
  articleid: string = '';
  userid: string = '';

  constructor(private router: Router, private  route: ActivatedRoute, private  publisherService: DashboardPublisherService,
              private formBuilder: FormBuilder, private authService: AuthService,
              public tokenStorage: TokenStorageService, private articleService: ArticlesService,
              public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.articleid = '9453c7ef-c210-474f-80cf-516756c83ac7';
   this.userid = 'cbaee553-0180-480a-8f41-cd684ff9b23e';
    this.signupForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(256)]],
        role: ['', Validators.required],
        nameOfArticle: ['', Validators.required],
        payment: ['', Validators.required]
      }
    );
    // const data = 'some text';
    // const blob = new Blob([data], { type: 'application/octet-stream' });
    //
    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

    this.articleId= this.route.snapshot.params.id;
    this.getArticle();

  }
  getArticle()
  {
    this.publisherService.getArticle(this.articleId).subscribe(res=>
    {
      this.article= res;
    })
  }
  get f(): {[key: string]: AbstractControl} {
    return this.signupForm.controls;
  }

  // tslint:disable-next-line:typedef
  payAnArticle(userid: string) {
    console.log(this.signupForm.value);
    const paymentLoad: Payment = {
      nameOfArticle: this.signupForm.value.nameOfArticle,
      payment: this.signupForm.value.payment
    }
    this.articleService.PayArticle(userid, this.articleId, paymentLoad).subscribe((response) => {
      console.log('book bought');
    });
  }

  onSubmit(): void{
    this.submitted = true;
    if (this.signupForm.invalid){
      return;
    }
    else{
      this.authService.register(this.signupForm.value).subscribe(userData => {
        console.log(userData);
        const loginForm: loginData = {
          email: this.signupForm.value.email,
          password: this.signupForm.value.password
        }
        this.authService.login(loginForm).subscribe(response => {
          this.tokenStorage.saveToken(response.accessToken);
          this.tokenStorage.saveToken(response.refreshToken);
          this.tokenStorage.saveUser(response)
          console.log(response.id);

          this.payAnArticle(response.id);
        })
      }, error => {
        this.errorMessage = error.error.message;
      })
    }
  }



}

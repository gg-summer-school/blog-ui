import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardPublisherService } from "../../services/dashboard-publisher.service";
import { ArticleDto, Payment } from "../../model/articles";
import { TokenStorageService } from "../../services/token-storage.service";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { loginData, Users } from "../../model/users";
import { ArticlesService } from "../../services/articles.service";
import { Subscription } from 'rxjs';
import { ResponseObject } from 'src/app/model/response';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDto } from 'src/app/model/UserDto';
import { PayArticleDto } from 'src/app/model/articlesDto';
import {TranslateService} from "@ngx-translate/core";

declare var $: any;

@Component({
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.scss']
})
export class ArticleDetailPageComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  publisher!:UserDto;
  role = "PUBLISHER";
  errorMessage = '';
  showAbs: boolean = false;
  showTable: boolean = false
  showMore:boolean = false;
  doc:string = '';
  articleId: string = '';
  categoryId: string = "";
  userId: string = '';
  error: boolean = false;
  submitted: boolean = false;
  article!: ArticleDto;
  hasBought: boolean = false;
  subscriptions: Subscription[] = [];
  paymentForm = this.formBuilder.group({
    nameOfArticle: '',
    accountNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
  });
  authUser: Users | undefined;
  form: any;

  constructor(private router: Router, private route: ActivatedRoute, private publisherService: DashboardPublisherService,
    private formBuilder: FormBuilder, private authService: AuthService,
    public tokenStorage: TokenStorageService, private articleService: ArticlesService,
              public translate: TranslateService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    // this.translate.use(lang);
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe()
    }
  }
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        role: "READER",
      }
    );
    this.articleId = this.route.snapshot.params.id;
    this.getArticle();
    this.getPublisherByArticle(this.articleId);


  }


  getArticle() {
    const subscription = this.publisherService.getArticle(this.articleId).subscribe((res:ArticleDto) => {
      this.article = res;
      this.doc = res.document;
      if(this.article.articleAbstract.length > 400 || this.article.toc.length > 100){
        this.showMore = true;
      }
    })
    this.subscriptions.push(subscription)
  }


  submitPayment() {
    const articleId = this.article.id;
    const payload: PayArticleDto = {
      nameOfArticle: this.article.title,
      accountNumber: this.paymentForm.value.accountNumber,
    }
    let logginUserId: string = this.tokenStorage.getUser().id;
    const subscription = this.articleService.PayArticle(logginUserId, articleId, payload).subscribe((response: ResponseObject) => {
      this.router.navigate(['/users-article']);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }).add(() => {
      //loader here
    })
    this.subscriptions.push(subscription);

  }


  onSubmit(): void {
    this.submitted = true;
    let loginPayload: loginData = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    }
    const subscription = this.authService.register(this.signupForm.value).subscribe((response: ResponseObject) => {
      const subscription1 = this.authService.login(loginPayload).subscribe((response: UserDto) => {
        this.tokenStorage.saveToken(response.accessToken);
        this.tokenStorage.saveUser(response);
        //jquery code to open payment modal
        $("#editProfileModal").modal('show');
      }, (error: HttpErrorResponse) => {
        //handle error
      }).add(() => { })
      this.subscriptions.push(subscription1);
    }, (error: HttpErrorResponse) => {
      //handle error
    }).add(() => { })
    this.subscriptions.push(subscription);
  }

  showAbstract() {
    this.showAbs = !this.showAbs;
  }
  showContent() {
    this.showTable = !this.showTable;
  }
  requestText() {
    const authUser = this.tokenStorage.getUser();
    if (authUser === null) {
      //jquery code to open register modal
      $("#registerModal").modal('show');
    } else {
      const subscription = this.articleService.checkIfUserhasBoughtArticle(authUser.id, this.article.id).subscribe((response: boolean) => {
        this.hasBought = response;
        if (!this.hasBought) {
          $("#editProfileModal").modal('show');
        } else {
          this.router.navigate(['/users-article']);
        }
      }, (error) => { }).add(() => { });
      this.subscriptions.push(subscription);
    }
  }

  get registerFormControl() {
    return this.signupForm.controls
  }

  get paymentFormControl() {
    return this.paymentForm.controls;
  }

  getDocument() {
    const subscription = this.articleService.previewArticle(this.article.id, this.userId).subscribe((response) => {
    }, (error) => { }).add(() => { });
    this.subscriptions.push(subscription);
  }

  getPublisherByArticle(id:string) {
    const subscription = this.articleService.getPublisherByArticleId(id).subscribe((response:UserDto) => {
      this.publisher = response;
    }, (error) => { }).add(() => { });
    this.subscriptions.push(subscription);
  }



}

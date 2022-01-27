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

declare var $: any;

@Component({
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.scss']
})
export class ArticleDetailPageComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  submitted = false;
  role = "PUBLISHER";
  errorMessage = '';
  fileUrl: any;
  sanitizer: any;
  articleId: string = '';
  categoryId: string = "";
  userId: string = '';
  article!: ArticleDto;
  subscriptions: Subscription[] = [];
  paymentForm = this.formBuilder.group({
    nameOfArticle: ['', Validators.required],
    accountNumber: ['', Validators.required],
  });
  authUser: Users | undefined;
  form: any;


  constructor(private router: Router, private route: ActivatedRoute, private publisherService: DashboardPublisherService,
    private formBuilder: FormBuilder, private authService: AuthService,
    public tokenStorage: TokenStorageService, private articleService: ArticlesService) { }


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
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(256)]],
        role: ['', Validators.required],
        nameOfArticle: ['', Validators.required],
        payment: ['', Validators.required]
      }
    );
    this.articleId = this.route.snapshot.params.id;
    this.getArticle();
  }
  getArticle() {
    const subscription = this.publisherService.getArticle(this.articleId).subscribe(res => {
      this.article = res;
    })
    this.subscriptions.push(subscription)
  }


  submitPayment() {
    let articleId = this.article.id;
    let logginUserId: string = this.tokenStorage.getUser().id;
    const subscription = this.articleService.PayArticle(logginUserId, articleId, this.paymentForm.value).subscribe((response: ResponseObject) => {
      this.router.navigate(['/users-article'])
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }).add(() => {
      //loader her
    })
    this.subscriptions.push(subscription);

  }


  onSubmit(): void {
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
        //hanle error
      }).add(() => { })
      this.subscriptions.push(subscription1);
    }, (error: HttpErrorResponse) => {
      //handle error
    }).add(() => { })
    this.subscriptions.push(subscription);
  }


  //  getTotalNumberArticlesByPublisher(){
  //    const subscription = this.ar
  //  }





}

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
import { NotificationMessageService } from 'src/app/services/Notification/notification-message.service';
import { NotificationType } from 'src/app/model/NotificationMessage';
import {NgxSpinnerService} from "ngx-spinner";
import { PaidArticlesService } from 'src/app/services/user-services/paid-articles.service';

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
  showTocMore:boolean = false;
  userId: string = '';
  error: boolean = false;
  submitted: boolean = false;
  article!: ArticleDto;
  hasBought: boolean = false;
  subscriptions: Subscription[] = [];
  cardItems: ArticleDto[] = [];
  totalCostCartItems: number = 0;
  paymentForm = this.formBuilder.group({
    nameOfArticle: '',
    accountNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
  });
  authUser: Users | undefined;
  form: any;

  constructor(private paidArticleService: PaidArticlesService,private router: Router, private route: ActivatedRoute, private publisherService: DashboardPublisherService,
    private formBuilder: FormBuilder, private authService: AuthService,
    public tokenStorage: TokenStorageService, private articleService: ArticlesService,
              public translate: TranslateService,
              private notificationService:NotificationMessageService,
              private  spinnerService: NgxSpinnerService) {
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
    this.getCachedCartItems();
    this.calculateTotalCostItems(this.cardItems);
  }
  getArticle() {
    this.spinnerService.show()
    const subscription = this.publisherService.getArticle(this.articleId).subscribe((res:ArticleDto) => {
      this.article = res;
      if(this.article.articleAbstract.length > 400){
        this.showMore = true;
      }if(this.article.toc.length > 400){
        this.showTocMore = true;
      }
    }, (error:HttpErrorResponse) => {
      this.spinnerService.hide();
    }).add(() => {
      this.spinnerService.hide();
    })
    this.subscriptions.push(subscription)
  }
  submitPayment() {
    const articleId = this.article.id;
    const payload: PayArticleDto = {
      nameOfArticle: this.article.title,
      accountNumber: this.paymentForm.value.accountNumber,
    }
    this.spinnerService.show();
    let logginUserId: string = this.tokenStorage.getUser().id;
    const subscription = this.articleService.PayArticle(logginUserId, articleId, payload).subscribe((response: ResponseObject) => {
      this.notificationService.sendMessage({message: 'Payment made Successfully', type:NotificationType.success})
      this.router.navigate(['/users-article']);
    }, (error: HttpErrorResponse) => {
      this.notificationService.sendMessage({message: 'Payment failed', type:NotificationType.error})
    }).add(() => {
      this.spinnerService.hide()
    })
    this.subscriptions.push(subscription);

  }
  onSubmit(): void {
    
    this.submitted = true;
    let loginPayload: loginData = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    }
    this.spinnerService.show();
    const subscription = this.authService.register(this.signupForm.value).subscribe((response: ResponseObject) => {
      const subscription1 = this.authService.login(loginPayload).subscribe((response: UserDto) => {
        this.tokenStorage.saveToken(response.accessToken);
        this.tokenStorage.saveUser(response);
        this.notificationService.sendMessage({message: 'Account created Successfully', type:NotificationType.success})
        //jquery code to open payment modal
        $("#editProfileModal").modal('show');
        
      }, (error: HttpErrorResponse) => {
        this.spinnerService.hide()
        this.notificationService.sendMessage({message: 'An error occurred could not create account', type:NotificationType.error})
      }).add(() => { 
        this.spinnerService.hide();
      })
      this.subscriptions.push(subscription1);
    }, (error: HttpErrorResponse) => {
      this.notificationService.sendMessage({message: 'An error occurred could not create account', type:NotificationType.error})
    }).add(() => {
      this.spinnerService.hide();
     })
    this.subscriptions.push(subscription);
  }

  showAbstract() {
    this.showAbs = !this.showAbs;
  }
  showContent() {
    this.showTable = !this.showTable;
  }

  get registerFormControl() {
    return this.signupForm.controls
  }
  getPublisherByArticle(id:string) {
    this.spinnerService.show();
    const subscription = this.articleService.getPublisherByArticleId(id).subscribe((response:UserDto) => {
      this.publisher = response;
    }, (error) => { }).add(() => { 
      this.spinnerService.hide();
    });
    this.subscriptions.push(subscription);
  }
  addToCart(item: ArticleDto) {
    if (this.tokenStorage.getUser() === null) {
      this.notificationService.sendMessage({ message: 'Login is required to add articles to cart', type: NotificationType.error })
      this.router.navigate(['login']);
    } else {
      this.cardItems = this.tokenStorage.getCartItems();
      const subscription = this.paidArticleService.getBookTitle(this.tokenStorage.getUser().id).subscribe((response: ArticleDto[]) => {
        const paidItems: ArticleDto[] = response
        if (this.cardItems.find(item1 => item1.id === item.id) === undefined) {
          if (paidItems.find(item1 => item1.id === item.id) === undefined) {
            this.cardItems.push(item);
            this.tokenStorage.addToCart(this.cardItems);
            this.cardItems = this.tokenStorage.getCartItems();
            this.calculateTotalCostItems(this.cardItems);
            this.notificationService.sendMessage({ message: 'Article added to cart successfully', type: NotificationType.success })
          } else {
            this.notificationService.sendMessage({ message: 'User has already buy this Article', type: NotificationType.error })
            this.router.navigate(['/users-article']);
          }
        } else {
          this.notificationService.sendMessage({ message: 'Article already exist in cart', type: NotificationType.error })
        }
      })
      this.subscriptions.push(subscription);
    }
  }

  calculateTotalCostItems(items: ArticleDto[]) {
    if (items != null) {
      items.forEach(item => {
        this.totalCostCartItems += item.price
      })
    }
    return this.totalCostCartItems;
  }

  getCachedCartItems() {
    if (this.tokenStorage.getCartItems() != null) {
      this.cardItems = this.tokenStorage.getCartItems();
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticlesService } from "../../services/articles.service";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { TokenStorageService } from "../../services/token-storage.service";
import { Subscription } from 'rxjs';
import { ArticleResource } from 'src/app/model/articleDtoList';
import { HttpErrorResponse } from '@angular/common/http';
import { Categories } from 'src/app/model/categories';
import { TranslateService } from '@ngx-translate/core';
import { NotificationMessageService } from "../../services/Notification/notification-message.service";
import { NotificationType } from "../../model/NotificationMessage";
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, Validators } from '@angular/forms';
import { ArticleDto } from 'src/app/model/articles';
// import { CardItems, PayArticleDto, PayListArticleDto } from 'src/app/model/articlesDto';
// import { ResponseObject } from 'src/app/model/response';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {


  tableSize = 6;
  count = 0;
  pageSize = 8;
  nums: any;
  searchData = '';
  totalPages: number = 0;
  allArticles: ArticleDto[] = [];
  searchedArticles: ArticleDto[] = [];
  pages: any = 0;
  category: boolean = false;
  pageNumberArray: number[] = [];
  pageNum: number = 1;
  subscriptions: Subscription[] = [];
  active: boolean = false;
  categories!: Categories[];
  categoryInfo: Categories | undefined;
  isDisabled: boolean = false;
  isDisabledNext: boolean = false;
  isActive: boolean = true;
  articleExist: boolean = false;
  cardItems: ArticleDto[] = [];
  email: string = '';
  totalCostCartItems: number = 0;
  paymentForm = this.formBuilder.group({
    accountNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
  });
  constructor(private formBuilder: FormBuilder, private articlesService: ArticlesService, private router: Router,
    public tokenStorage: TokenStorageService, private activateRoute: ActivatedRoute,
    public translate: TranslateService, private notificationService: NotificationMessageService,
    private spinnerService: NgxSpinnerService, private articleService: ArticlesService,) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }
  selectedLang: any;
  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getAllArticles(this.pageNum, this.pageSize);
    this.getAllCategories();
    this.getCachedCartItems();
    this.calculateTotalCostItems(this.cardItems);
    console.log(this.cardItems);

  }
  previous() {
    const subscription = this.activateRoute.queryParams.subscribe(params => {
      if (params.page !== undefined) {
        this.pageNum = parseInt(params.page) - 1;

      }
    });
    this.subscriptions.push(subscription);
    this.getAllArticles(this.pageNum, this.pageSize);
    this.router.navigate(['/landing-page/articles'], { queryParams: { page: this.pageNum } });
  }

  Next() {
    const subscription = this.activateRoute.queryParams.subscribe(params => {
      if (params.page !== undefined) {
        this.pageNum = parseInt(params.page) + 1;
      }
    });
    this.subscriptions.push(subscription);
    this.getAllArticles(this.pageNum, this.pageSize);
    this.router.navigate(['/landing-page/articles'], { queryParams: { page: (this.pageNum) } });
  }

  setPage(currentPageIndex: number, currentPage: number) {
    this.getAllArticles(currentPageIndex, this.pageSize);
    this.pageNum = (currentPage - 1);
    this.router.navigate(['/landing-page/articles'], { queryParams: { page: (currentPageIndex) } });
  }
  getAllArticles(page: number, pageSize: number) {
    this.spinnerService.show()
    const subscription = this.articlesService.getAllArticles((page - 1), pageSize).subscribe((response: ArticleResource) => {
      this.allArticles = response.articleDtoList
      this.pages = response.totalPages;
      this.pageNumberArray = (Array.from(Array(this.pages).keys()));
      if (this.allArticles.length > 0) {
        this.articleExist = true;
      }
      if (page > 1) {
        this.isDisabled = false;
      } if (page <= 1) {
        this.isDisabled = true;
      }
      if (response.last) {
        this.isDisabledNext = !this.isDisabledNext;
      }
      if (response.pageNo == this.pageNum) {
        this.isActive = true;
      }

    }, (error: HttpErrorResponse) => {
      this.spinnerService.hide();
      this.notificationService.sendMessage({ message: "Could not fetch articles", type: NotificationType.error })
    }
    ).add(() => {
      this.spinnerService.hide();
    })
    this.subscriptions.push(subscription);
  }

  view(id: string) {
    this.router.navigate(['/articles-detail', id]);
  }

  publishArticle() {
    if (this.tokenStorage.getUser() === null) {
      this.router.navigate(['signup']);
    } else {
      this.router.navigate(['publish-article']);

    }
  }



  // onTableDataChange() { }

  getAllCategories() {
    this.spinnerService.show();
    const subscription = this.articlesService.getCategory().subscribe((response: Categories[]) => {
      this.categories = response;
    }, (error: HttpErrorResponse) => {
      this.spinnerService.hide();
      this.notificationService.sendMessage({ message: "Could not fetch categories", type: NotificationType.error })
    }
    ).add(() => {
      this.spinnerService.hide()
    })
    this.subscriptions.push(subscription);
  }
  selectedIndex!: number;
  getArticlesByCategory(categoryId: string, index: number) {
    this.selectedIndex = index;
    this.spinnerService.show()
    this.articleExist = false;
    const subscription = this.articlesService.getArticlesByCategory(categoryId).subscribe((response: ArticleDto[]) => {
      this.allArticles = response;
      this.pages = 0;
      if (this.allArticles.length > 0) {
        this.articleExist = true;
      }
      this.categoryInfo = this.getCategoryById(categoryId);
      this.router.navigate(['/landing-page/articles/categories'], { queryParams: { 'category-name': this.categoryInfo?.name } });
    }, (error: HttpErrorResponse) => {
      this.spinnerService.hide()
      this.notificationService.sendMessage({ message: "Could not fetch articles", type: NotificationType.error })
    }
    ).add(() => {
      this.spinnerService.hide();
    })
    this.subscriptions.push(subscription);
  }
  searchArticle() {
    this.spinnerService.show();
    this.articleExist = false;
    const subscription = this.articlesService.searchArticle(this.searchData).subscribe(res => {
      this.allArticles = res;
      if (this.allArticles.length > 0) {
        this.articleExist = true;
      }
    }, error => {
      this.spinnerService.hide()
      this.notificationService.sendMessage({ message: error.error.message, type: NotificationType.error })
    }).add(() => {
      this.spinnerService.hide();
    })
    this.subscriptions.push(subscription);
  }

  getCategoryById(id: string) {
    let category = this.categories.find(cat => cat.id === id)
    return category
  }

  subscribe(email: string) {
    this.notificationService.sendMessage({ message: email + ' subscribed successfully', type: NotificationType.success })
  }
  addToCart(item: ArticleDto) {
    if (this.tokenStorage.getUser() === null) {
      this.notificationService.sendMessage({ message: 'Login is required to add articles to cart', type: NotificationType.error })
      this.router.navigate(['login']);
    } else {
      this.cardItems = this.tokenStorage.getCartItems();
      if (this.cardItems.find(item1 => item1.id === item.id) === undefined) {
        this.cardItems.push(item);
        this.tokenStorage.addToCart(this.cardItems);
        this.cardItems = this.tokenStorage.getCartItems();
        this.calculateTotalCostItems(this.cardItems);
        this.notificationService.sendMessage({ message: 'Article added to cart successfully', type: NotificationType.success })
      } else {
        this.notificationService.sendMessage({ message: 'Article already exist in cart', type: NotificationType.error })
      }
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

  removeArticleCard(item: ArticleDto) {
    this.totalCostCartItems -= item.price;
    this.cardItems.splice(this.cardItems.indexOf(item), 1);
    this.tokenStorage.addToCart(this.cardItems);
  }
  get paymentFormControl() {
    return this.paymentForm.controls;
  }

  submitPayment() {

    // const payload: PayListArticleDto = {
    //   articles: this.cardItems,
    //   accountNumber: this.paymentForm.value.accountNumber,
    //   userId: this.tokenStorage.getUser().id
    // }
    
    // this.spinnerService.show();
    // let logginUserId: string = this.tokenStorage.getUser().id;
    // const subscription = this.articleService.PayArticle(logginUserId, articleId, payload).subscribe((response: ResponseObject) => {
    //   this.notificationService.sendMessage({ message: 'Payment made Successfully', type: NotificationType.success })
    //   this.router.navigate(['/users-article']);
    // }, (error: HttpErrorResponse) => {
    //   this.notificationService.sendMessage({ message: 'Payment failed', type: NotificationType.error })
    // }).add(() => {
    //   this.spinnerService.hide()
    // })
    // this.subscriptions.push(subscription);

  }


}

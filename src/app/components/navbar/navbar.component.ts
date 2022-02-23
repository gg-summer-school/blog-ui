import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleDto } from 'src/app/model/articles';
import { NotificationType } from 'src/app/model/NotificationMessage';
import { NotificationMessageService } from 'src/app/services/Notification/notification-message.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  totalCostCartItems: number = 0;
  cardItems: ArticleDto[] = [];
  controlCanvas:boolean = false;
  paymentForm = this.formBuilder.group({
    accountNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
  });
  constructor(private router: Router,  public tokenStorage: TokenStorageService, private formBuilder: FormBuilder, private notificationService: NotificationMessageService) { }

  ngOnInit(): void {
    this.getCachedCartItems();
    this.calculateTotalCostItems(this.cardItems);

  }

  removeArticleCard(item: ArticleDto) {
    this.totalCostCartItems -= item.price;
    this.cardItems.splice(this.cardItems.indexOf(item), 1);
    this.tokenStorage.addToCart(this.cardItems);
  }
  get paymentFormControl() {
    return this.paymentForm.controls;
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
  


  submitPayment() {
    this.controlCanvas = false;
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

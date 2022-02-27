import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArticlesService} from "../../services/articles.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Contributors} from "../../model/contributors";
import {Articles} from "../../model/articles";
import {ResponseObject} from "../../model/response";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {NotificationMessageService} from "../../services/Notification/notification-message.service";
import {NotificationType} from "../../model/NotificationMessage";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-publish-article',
  templateUrl: './publish-article.component.html',
  styleUrls: ['./publish-article.component.scss']
})
export class PublishArticleComponent implements OnInit {
  publish = new FormGroup({});
  selectedFile: any;
  currentFile: any;
  selectedFile1: any;
  currentFile1: any;
  categories: any;
  articleId: string = '';
  success: boolean = false;
  errorMessage = '';
  error: boolean = false;
  errorMessage1 = '';
  negative: boolean = false;
  contributor: [] = [];
  publisherId: string = '';
  accountApproved: boolean = false;
  name: string = '';


  constructor(private  articlesService: ArticlesService, private tokenStorage: TokenStorageService,
              private router: Router, public translate: TranslateService,
              private notificationService: NotificationMessageService,
              private  spinnerService: NgxSpinnerService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }



  ngOnInit(): void {
    this.publish = new FormGroup(
      {
        title: new FormControl(null, Validators.required),
        category: new FormControl(null, Validators.required),
        articleAbstract: new FormControl(null, Validators.required),
        toc: new FormControl(null, Validators.required),
        contributors: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),

      }
    );

    this.getCategories();

    this.publisherId = this.tokenStorage.getUser().id;
    this.accountApproved = this.tokenStorage.getUser().approved;
    console.log(this.accountApproved);
    this.name = this.tokenStorage.getUser().name;
    // if (this.accountApproved) {
    //   this.notificationService.sendMessage({
    //     message: 'Your account has been approved!',
    //     type: NotificationType.success
    //   });
    //   // localStorage.removeItem(JSON.stringify(this.tokenStorage.getApproval()));
    //   // console.log(this.tokenStorage.getApproval());
    // }

  }

  get f() {
    return this.publish.controls;
  }

  onSubmit(categoryId: string) {

    let contributors: Contributors[] = [];
    this.contributor = this.publish.value.contributors.split(',');
    for (let i = 0; i < this.contributor.length; i++) {
      const cont: Contributors = {
        id: "",
        name: this.contributor[i]
      }
      contributors.push(cont)
    }
    let payload: Articles = {
      title: this.publish.value.title,
      toc: this.publish.value.toc,
      articleAbstract: this.publish.value.articleAbstract,
      price: this.publish.value.price,
      contributors: contributors
    }

    if (payload.price < 0) {
      this.negative = true;
    }

    this.articlesService.createArticle(payload, this.publisherId, categoryId).subscribe((response: ResponseObject) => {
        this.articleId = response.details;


      },
      error1 => {
        this.error = true;
        this.errorMessage1 = error1.error.message;
        this.notificationService.sendMessage({message: this.errorMessage1, type: NotificationType.error})


      })
  }


  select($event: any) {
    this.selectedFile = $event.target.files;
  }

  select1($event: any) {
    this.selectedFile1 = $event.target.files;
  }

  upload() {
    this.spinnerService.show();
    this.currentFile = this.selectedFile.item(0);
    this.currentFile1 = this.selectedFile1.item(0);

    const formData: FormData = new FormData();
    formData.append('files', this.currentFile);
    formData.append('files', this.currentFile1)
    this.articlesService.uploadArticleFiles(formData, this.publisherId, this.articleId).subscribe(res => {
        this.notificationService.sendMessage({message: 'Article created Successfully!', type: NotificationType.success})
        this.router.navigate(['/your-articles']);
        this.spinnerService.hide();

      },
      error => {
        this.errorMessage = error.error.message;
        this.notificationService.sendMessage({message: this.errorMessage, type: NotificationType.error})
        this.spinnerService.hide();
      });

  }

  getCategories() {
    this.articlesService.getCategory().subscribe(res => {
        this.categories = res;
      }
    )
  }
}

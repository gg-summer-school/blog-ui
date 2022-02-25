import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationType } from 'src/app/model/NotificationMessage';
import { ArticlesService } from 'src/app/services/articles.service';
import { NotificationMessageService } from 'src/app/services/Notification/notification-message.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  email: string= '';

  constructor(private articlesService: ArticlesService, private router: Router,
    public tokenStorage: TokenStorageService, private activateRoute: ActivatedRoute,
    public translate: TranslateService, private notificationService: NotificationMessageService,
    private spinnerService: NgxSpinnerService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
  }

  
  subscribe(email:string)
  {
    this.notificationService.sendMessage({message: email+' subscribed successfully', type:NotificationType.success})
  }


}

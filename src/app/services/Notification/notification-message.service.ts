import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { NotificationMessage, NotificationType } from 'src/app/model/NotificationMessage';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class NotificationMessageService {

  private notificationSubject:Subject<NotificationMessage> = new Subject<NotificationMessage>();
  constructor(private toastr:ToastrService, public translate:TranslateService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
    
      this.notificationSubject.subscribe(message => {
        switch(message.type){
          case NotificationType.success:
              this.toastr.success(message.message);
              break;
          case NotificationType.warning:
            this.toastr.warning(message.message);
            break;
          case NotificationType.error:
            this.toastr.error(message.message);
            break;
          case NotificationType.info:
            this.toastr.info(message.message);
            break;
          default:
            case NotificationType.info:
              this.toastr.info(message.message)
        }
      }, error => {
        console.log("could not process toastr message");
        
      })
   }

  sendMessage(message:NotificationMessage){
    this.notificationSubject.next(message)
  }
   
  selectedLang: any;
  switchLang(lang: string) {
    // this.translate.use(lang);
  }
}

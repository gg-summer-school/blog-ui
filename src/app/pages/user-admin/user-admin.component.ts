import {Component, OnInit} from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";
import {Admin, roleDTO, RolePayload} from "../../model/admin";
import {TranslateService} from "@ngx-translate/core";
import {NotificationMessageService} from "../../services/Notification/notification-message.service";
import {NotificationType} from "../../model/NotificationMessage";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class DashboardComponent implements OnInit {
  isBlocked = false;
  isSuspended = false;
  readers: Admin[] = []
  number!:number
  suspendUser: boolean = false;
  addRole!: RolePayload;
  reactivate: boolean = true;
  active: boolean = false;
  role: string = 'Role'

  constructor(private adminPagesService: AdminPagesService, public translate: TranslateService,
              private notificationService:NotificationMessageService,
              private  spinnerService: NgxSpinnerService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    console.log(lang)
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.displayReaders()
  }

  displayReaders() {
    this.spinnerService.show()
    this.adminPagesService.getReaders()
      .subscribe( res=>
      {
        this.readers = res;
        this.number= this.readers.length;
        this.spinnerService.hide()
      }, (error: any) => {
        this.spinnerService.hide()
        this.notificationService.sendMessage({message: error.error.message, type:NotificationType.error})
      })
  }

  suspendPublisher(publisherId: string) {
    this.spinnerService.show()
    this.adminPagesService.suspendUser(publisherId, this.suspendUser).subscribe((res) => {
      this.displayReaders();
      this.spinnerService.hide()
    }, (error: any) => {
      this.spinnerService.hide()
      this.notificationService.sendMessage({message: error.error.message, type:NotificationType.error})
    })
  }

  reactivateUser(user_id: string) {
    this.spinnerService.show()
    this.adminPagesService.reactivateUser(user_id, this.reactivate).subscribe((res) => {
      this.displayReaders();
      this.spinnerService.hide()
    }, (error: any) => {
      this.spinnerService.hide()
      this.notificationService.sendMessage({message: error.error.message, type:NotificationType.error})
    })
  }

}

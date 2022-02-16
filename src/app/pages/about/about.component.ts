import { Component, OnInit } from '@angular/core';
import {NotificationType} from "../../model/NotificationMessage";
import {NotificationMessageService} from "../../services/Notification/notification-message.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
email: string=''
  constructor( private notificationService:NotificationMessageService,) { }

  ngOnInit(): void {
  }
  subscribe(email:string)
  {
    this.notificationService.sendMessage({message: email+' subscribed successfully', type:NotificationType.success})
  }



}

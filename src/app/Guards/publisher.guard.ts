import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationType } from '../model/NotificationMessage';
import { NotificationMessageService } from '../services/Notification/notification-message.service';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PublisherGuard implements CanActivate {
 
  constructor(private tokenStorageService: TokenStorageService, private router: Router, private notificationService: NotificationMessageService){}


  canActivate(): boolean {
    const user = this.tokenStorageService.getUser().role;
    let role = user.find((role: any )=> role === 'ROLE_PUBLISHER')
    if(role === 'ROLE_PUBLISHER') {
      return true;
    }else {
      this.notificationService.sendMessage({message: "You are not authorized to access that page! That page is meant for the publisher", type: NotificationType.error})
      this.router.navigate(['/users-article'])
      return false;
    }
  } 
}
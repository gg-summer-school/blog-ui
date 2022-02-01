import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PublisherGuard implements CanActivate {
 
  constructor(private tokenStorageService: TokenStorageService, private router: Router){}


  canActivate(): boolean {
    const user = this.tokenStorageService.getUser().role;
    let role = user.find((role: any )=> role === 'ROLE_PUBLISHER')
    if(role === 'ROLE_PUBLISHER') {
      return true;
    }else {
      alert('You are not authorized to access this page');
      this.router.navigate(['/user-admin'])
      return false;
    }
  } 
}
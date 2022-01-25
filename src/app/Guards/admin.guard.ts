import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router){}
  
  canActivate(): boolean {
    const user = this.tokenStorageService.getUser().role;
    let role = user.find((role: any )=> role === 'ROLE_ADMIN')
    if(role === 'ROLE_ADMIN') {
      return true;
    }else if(role === 'ROLE_READER') {
      alert('You are a thief!!!');
      this.router.navigate(['/user-admin'])
      return false;
    }else {
      alert('You are a thief!!!');
      this.router.navigate(['/publisher-admin'])
      return false;
    }
  } 
  
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router){}


  canActivate(): boolean {
    const user = this.tokenStorageService.getUser();
    if (!user) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}

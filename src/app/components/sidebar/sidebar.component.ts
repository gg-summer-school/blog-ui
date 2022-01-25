import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { find } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userRole: any = [];
  adminRole: boolean = false;
  publisherRole: boolean = false;
  readerRole: boolean = false;
  reader: string | any = '';
  pubOrAdmin: boolean = false;

  constructor(private tokenStore: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.userRole = this.tokenStore.getUser().role;
    this.readerRole = this.userRole.includes('ROLE_READER');
    this.publisherRole = this.userRole.includes('ROLE_PUBLISHER');
    this.adminRole = this.userRole.includes('ROLE_ADMIN');    
    }

    checkPubOrAdmin() {      
      
    }

  logOut() {
    this.tokenStore.signOut();
    this.router.navigate(['/login']);
  }

}

/*

      const reader = user.find((role: any )=> role === 'ROLE_READER');
      const publisher = user.find((role: any )=> role === 'ROLE_PUBLISHER');
*/
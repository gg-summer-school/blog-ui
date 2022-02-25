import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { find } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {TranslateService} from "@ngx-translate/core";

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

  constructor(private tokenStore: TokenStorageService, private router: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.userRole = this.tokenStore.getUser().role;
    this.readerRole = this.userRole.includes('ROLE_READER');
    this.publisherRole = this.userRole.includes('ROLE_PUBLISHER');
    this.adminRole = this.userRole.includes('ROLE_ADMIN');
    }

  logOut() {
    this.tokenStore.signOut();
    this.router.navigate(['/landing-page']);
  }

  onOpen() {
    // @ts-ignore
    document.getElementById("side").style.display = "inline-block";
    // @ts-ignore
    document.getElementById("menubar").style.display = "none";
  }

  onClose() {
    // @ts-ignore
    document.getElementById("side").style.display = "none";
    // @ts-ignore
    document.getElementById("menubar").style.display = "inline-block";
  }

}

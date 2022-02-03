import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  userName: string='';
  firstName = '';

  constructor(private tokenStorageService: TokenStorageService, translate: TranslateService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  // switchLang(lang: string) {
  //   console.log(lang)
  //   this.translate.use(lang);
  // }

  ngOnInit(): void {
   this.userName= this.tokenStorageService.getUser().name;
    const name = this.tokenStorageService.getUser().name
    this.firstName = name.split(' ').slice(0, -1).join(' ');
  }

}

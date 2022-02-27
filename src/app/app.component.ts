import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { TokenStorageService } from './services/token-storage.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blog-ui';

  constructor(public translate: TranslateService, private tokenStorage: TokenStorageService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {

    if(this.tokenStorage.getCartItems() == null){
      this.tokenStorage.addToCart([]);
    }else{
      this.tokenStorage.addToCart(this.tokenStorage.getCartItems());
    }
  }

  switchLang(lang: string) {
    console.log(lang)
    this.translate.use(lang);
  }
}

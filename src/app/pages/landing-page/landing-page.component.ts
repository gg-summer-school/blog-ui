import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {Categories} from '../../model/categories';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  page = 1;
  count = 0;
  tableSize = 6;
  nums: any;
  searchData = '';
  // Allcategories:Categories[]=[];
  allCategories: any;


  constructor( private articlesService: ArticlesService, public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }
  // tslint:disable-next-line:typedef
  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
   this.nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
   this.getCategories();
  }
  onTableDataChange(event: any){
    this.page = event;

  }
  getCategories() {
    this.articlesService.getCategory().subscribe(res =>
    {
      this.allCategories = res;
    });

  }



}

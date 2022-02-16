import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../../services/articles.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit {
  doc: string = '';
  articleId: string = '';

  constructor(private tokenStorage: TokenStorageService, private activatedRoute: ActivatedRoute,
              private  spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show()
    this.articleId = this.activatedRoute.snapshot.params.id;
    this.doc = this.activatedRoute.snapshot.params.doc;
    this.spinnerService.hide()
  }

}

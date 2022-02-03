import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../../services/articles.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit {
  publisherId: string = '';
  articleId: string = '';

  constructor(private tokenStorage: TokenStorageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.publisherId = this.tokenStorage.getUser().id;
    this.articleId = this.activatedRoute.snapshot.params.id;
    console.log(this.publisherId, this.articleId)
  }

}

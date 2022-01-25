import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";
import {DashboardPublisherService} from "../../services/dashboard-publisher.service";
import {ArticleDto} from "../../model/articles";
import {TokenStorageService} from "../../services/token-storage.service";


@Component({
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.scss']
})
export class ArticleDetailPageComponent implements OnInit {
  fileUrl: any;
  sanitizer: any;
  articleId: string='';
  categoryId:string="";
  userId:string='';
  article!:ArticleDto;

  constructor(private  route: ActivatedRoute, private  publisherService: DashboardPublisherService,
              public tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    // const data = 'some text';
    // const blob = new Blob([data], { type: 'application/octet-stream' });
    //
    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

    this.articleId= this.route.snapshot.params.id;
    this.getArticle();

  }
  getArticle()
  {
    this.publisherService.getArticle(this.articleId).subscribe(res=>
    {
      this.article= res;
    })
  }

}

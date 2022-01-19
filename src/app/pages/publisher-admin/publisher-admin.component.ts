import { Component, OnInit } from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";
import {Admin} from "../../model/admin";

@Component({
  selector: 'app-publisher-admin',
  templateUrl: './publisher-admin.component.html',
  styleUrls: ['./publisher-admin.component.scss']
})
export class PublisherAdminComponent implements OnInit {

  publishers: any;
  isApproved: boolean = true;
  publisherId: string = 'e4ab681b-34c8-4f54-8b0a-88423122bffd';
  numberOfArticles: Admin[] = [];


  constructor(private adminPagesService: AdminPagesService) { }

  ngOnInit(): void {
    this.displayPublishers();
    this.getArticlesById()
  }

  displayPublishers() {
    this.adminPagesService.getPublishers(this.isApproved)
      .subscribe( res =>
      {
        this.publishers = res;
        // console.log(this.publishers);
      })
  }

  getArticlesById() {
    this.adminPagesService.getArticlesByPublisher(this.publisherId, this.isApproved)
      .subscribe( res =>
      {
        // console.log(res)
      })
  }

  s
}

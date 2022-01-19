import { Component, OnInit } from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";

@Component({
  selector: 'app-publisher-admin',
  templateUrl: './publisher-admin.component.html',
  styleUrls: ['./publisher-admin.component.scss']
})
export class PublisherAdminComponent implements OnInit {

  publishers: any;
  isApproved: boolean = false;

  constructor(private adminPagesService: AdminPagesService) { }

  ngOnInit(): void {
    this.displayPublishers();
  }

  displayPublishers() {
    this.adminPagesService.getPublishers(this.isApproved)
      .subscribe( res=>
      {
        this.publishers = res;
      })
  }

}

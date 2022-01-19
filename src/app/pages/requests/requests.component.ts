import { Component, OnInit } from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  isApproved: boolean = false;
  publishers: any;

  constructor(private adminPagesService: AdminPagesService) { }

  ngOnInit(): void {
    this.displayPendingPublishers();
  }

  displayPendingPublishers() {
    this.adminPagesService.getPublishers(this.isApproved)
      .subscribe( res=>
      {
        this.publishers = res;
      })
  }

}

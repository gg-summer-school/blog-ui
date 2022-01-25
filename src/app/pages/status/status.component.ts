import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  userName: string='';

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
   this.userName= this.tokenStorageService.getUser().name;
  }

}

import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-publish-article',
  templateUrl: './publish-article.component.html',
  styleUrls: ['./publish-article.component.scss']
})
export class PublishArticleComponent implements OnInit {
  createP= new FormGroup({});

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit()
  {

  }

}

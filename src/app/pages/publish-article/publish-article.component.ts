import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-publish-article',
  templateUrl: './publish-article.component.html',
  styleUrls: ['./publish-article.component.scss']
})
export class PublishArticleComponent implements OnInit {
  publish= new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.publish= new FormGroup(
      {
        title: new FormControl(null, Validators.required),
        cover: new FormControl(null, Validators.required),
        category: new FormControl(null, Validators.required),
        abstract: new FormControl(null, Validators.required),
        tableContent: new FormControl(null, Validators.required),
        contributors: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),

      }
    );
  }
  get f()
  {
    return this.publish.controls;
  }


  onSubmit(form:any)
  {
     console.log(form);
  }

}

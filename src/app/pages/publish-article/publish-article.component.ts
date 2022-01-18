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
        cover_pager: new FormControl(null, Validators.required),
        category_id: new FormControl(null, Validators.required),
        article_abstract: new FormControl(null, Validators.required),
        toc: new FormControl(null, Validators.required),
        contributors: new FormControl(null, Validators.required),
        document: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),
        user_id: new FormControl(null, Validators.required),

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

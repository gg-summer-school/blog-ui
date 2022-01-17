import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-publish-article',
  templateUrl: './publish-article.component.html',
  styleUrls: ['./publish-article.component.scss']
})
export class PublishArticleComponent implements OnInit {
  publish= new FormGroup({});
  selectedFile:any;
  currentFile:any;
  selectedFile1:any;
  currentFile1:any;
  fileUpload= {
   coverPage:'',
   document:'',
  }


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


  select($event:any){
    this.selectedFile=$event.target.files;
  }
  select1($event:any){
    this.selectedFile1=$event.target.files;
  }

  upload()
  {
    this.currentFile=this.selectedFile.item(0);
    this.currentFile1=this.selectedFile1.item(0);
    this.fileUpload={
      coverPage: this.currentFile,
      document: this.currentFile1
    }

  }


}

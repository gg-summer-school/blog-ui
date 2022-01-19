import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArticlesService} from "../../services/articles.service";
import {Categories} from "../../model/categories";
import {TokenStorageService} from "../../services/token-storage.service";
import {Contributors} from "../../model/contributors";
import {Articles} from "../../model/articles";
import {ResponseObject} from "../../model/response";

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
  categories:any;
  articleId:string='';
  fileUpload= {
   coverPage:'',
   document:'',
  };
  contributor:[]=[];
  publisherId:string='';


  constructor(private  articlesService: ArticlesService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.publish= new FormGroup(
      {
        title: new FormControl(null, Validators.required),
        coverPage: new FormControl(null, Validators.required),
        category: new FormControl(null, Validators.required),
        articleAbstract: new FormControl(null, Validators.required),
        toc: new FormControl(null, Validators.required),
        contributors: new FormControl(null, Validators.required),
        document: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),

      }
    );
    this.getCategories();
    this.publisherId= this.tokenStorage.getUser().id;
    console.log(this.publisherId);

  }

  get f()
  {
    return this.publish.controls;
  }

  onSubmit(categoryId:string)
  {
    let contributors:Contributors[] = [];
    this.contributor= this.publish.value.contributors.split(',');
    for(let i =0; i < this.contributor.length; i++){
      const cont:Contributors = {
        id:"",
        name: this.contributor[i]
      }
      contributors.push(cont)
    }
    let payload:Articles = {
      title:this.publish.value.title,
      toc:this.publish.value.toc,
      articleAbstract: this.publish.value.articleAbstract,
      price: this.publish.value.price,
      contributors:contributors
    }
   this.articlesService.createArticle(payload, this.publisherId, categoryId).subscribe((response:ResponseObject) => {
    this.articleId = response.details;

   })


    //form.value.contributors= this.contributor;
    // this.articlesService.createArticle(this.publish, "37d7b7d7-7e2f-4bf4-b6d4-c2d865aea491", categoryId).subscribe((res:any) => {
    //
    //   // console.log(res)
    //   // console.log(categoryId)
    //   // console.log(form.value.contributors)
    //   this.articleId=res.details;
    // })

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
    this.articlesService.uploadArticleFiles(this.fileUpload,this.publisherId, this.articleId).subscribe(res=>
    {
      console.log(res);
    })

  }

  getCategories()
  {
    this.articlesService.getCategory().subscribe(res=>
    {
      this.categories= res;
      console.log(res);
      console.log(this.categories);
    })
  }


}

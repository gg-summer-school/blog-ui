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
 success:boolean=false;
 error:boolean= false;
 error1:boolean= false;
 errorMessage='';
 errorMessage1='';
  contributor:[]=[];
  publisherId:string='';


  constructor(private  articlesService: ArticlesService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.publish= new FormGroup(
      {
        title: new FormControl(null, Validators.required),
        category: new FormControl(null, Validators.required),
        articleAbstract: new FormControl(null, Validators.required),
        toc: new FormControl(null, Validators.required),
        contributors: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),

      }
    );
    this.getCategories();
    this.publisherId= this.tokenStorage.getUser().id;
    console.log(this.tokenStorage.getUser().id);
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

   },
     error1 =>
     {
       this.error1=true;
       this.errorMessage1= error1.error.message;
     })
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

    const formData: FormData = new FormData();
    formData.append('files', this.currentFile);
    formData.append('files', this.currentFile1)

    console.log(formData)
    this.articlesService.uploadArticleFiles(formData,this.publisherId, this.articleId).subscribe(res=>
    {
      this.success=true;
     window.location.reload();
    },
      error => {
      this.error=true;
      this.errorMessage=error.error.message;
      })

  }

  getCategories()
  {
    this.articlesService.getCategory().subscribe(res=>
    {
      this.categories= res;
    })
  }


}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArticlesService} from "../../services/articles.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {ArticleDto, updatePayload} from "../../model/articles";
import {DashboardPublisherService} from "../../services/dashboard-publisher.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  publish= new FormGroup({});
  categories:any;
  articleId:string='';
  success:boolean=false;
  success1:boolean=false;
  error:boolean= false;
  error1:boolean= false;
  errorMessage='';
  errorMessage1='';
  publisherId:string='';
  categoryId:string= '';
  oneArticle!:ArticleDto;
  baseUrl= "http://192.168.8.106:8000";



  constructor(private  articlesService: ArticlesService, private tokenStorage: TokenStorageService,
              private publisherService: DashboardPublisherService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.publish = new FormGroup(
      {
        title: new FormControl(null, Validators.required),
        articleAbstract: new FormControl(null, Validators.required),
        toc: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),

      }
    );

    this.publisherId = this.tokenStorage.getUser().id;
    this.articleId= this.route.snapshot.params.id;
    this.categoryId= this.route.snapshot.params.catid;
    this.getOneArticle();
    this.  getCategories()
  }

  get f()
  {
    return this.publish.controls;

  }
  onSubmit(form:updatePayload)
  {

    this.publisherService.editArticle(this.publisherId, this.articleId, this.categoryId, form).subscribe((response) => {
       console.log(response)
      this.success=true;
       this.router.navigate(['/your-articles'])
      },
      error1 =>
      {
        this.error1=true;
        this.errorMessage1= error1.error.message;

      })
  }


  getCategories()
  {
    this.articlesService.getCategory().subscribe(res=>
    {
      this.categories= res;
    })
  }

  getOneArticle()
  {
    this.publisherService.getOneArticle(this.publisherId, this.articleId, this.categoryId).subscribe(res=>
    {
      this.oneArticle=res;
      console.log(res)
    }
    )
  }

}

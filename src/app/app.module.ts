import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuardsComponent } from './auth/guards/guards.component';
import { InterceptorsComponent } from './auth/interceptors/interceptors.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { YourArticlesComponent } from './pages/your-articles/your-articles.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ArticleDetailPageComponent } from './pages/article-detail-page/article-detail-page.component';
import { PublishArticleComponent } from './pages/publish-article/publish-article.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    GuardsComponent,
    InterceptorsComponent,
    DashboardComponent,
    SignupComponent,
    YourArticlesComponent,
    UserProfileComponent,
    ArticleDetailPageComponent,
    PublishArticleComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

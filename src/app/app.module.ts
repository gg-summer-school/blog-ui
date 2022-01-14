import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { YourArticlesComponent } from './pages/your-articles/your-articles.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ArticleDetailPageComponent } from './pages/article-detail-page/article-detail-page.component';
import { PublishArticleComponent } from './pages/publish-article/publish-article.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { PublisherAdminComponent } from './pages/publisher-admin/publisher-admin.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { UsersArticleComponent } from './pages/users-article/users-article.component';
// @ts-ignore
import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserAdminComponent } from './pages/user-admin/user-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    PublisherAdminComponent,
    RequestsComponent,
    UserAdminComponent,
    LoginComponent,
    SignupComponent,
    YourArticlesComponent,
    UserProfileComponent,
    ArticleDetailPageComponent,
    PublishArticleComponent,
    LandingPageComponent,
    PublishArticleComponent,
    UsersArticleComponent,
    PublishArticleComponent,
    LandingPageComponent,
    SidebarComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

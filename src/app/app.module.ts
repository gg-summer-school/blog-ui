import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAdminComponent } from './pages/user-admin/user-admin.component';

import { YourArticlesComponent } from './pages/your-articles/your-articles.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ArticleDetailPageComponent } from './pages/article-detail-page/article-detail-page.component';
import { PublishArticleComponent } from './pages/publish-article/publish-article.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SearchFilterPipe } from './pipe/search-filter.pipe';

import { HttpClientModule } from '@angular/common/http';
import { PublisherAdminComponent } from './pages/publisher-admin/publisher-admin.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { UsersArticleComponent } from './pages/users-article/users-article.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StatusComponent } from './pages/status/status.component';


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
    SidebarComponent,
    SearchFilterPipe,
    StatusComponent

  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

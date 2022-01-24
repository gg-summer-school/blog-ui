import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/user-admin/user-admin.component';

import { YourArticlesComponent } from './pages/your-articles/your-articles.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ArticleDetailPageComponent } from './pages/article-detail-page/article-detail-page.component';
import { PublishArticleComponent } from './pages/publish-article/publish-article.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SearchFilterPipe } from './pipe/search-filter.pipe';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PublisherAdminComponent } from './pages/publisher-admin/publisher-admin.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { UsersArticleComponent } from './pages/users-article/users-article.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StatusComponent } from './pages/status/status.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';
import {QuillModule} from 'ngx-quill';
import { ViewTransactionsComponent } from './pages/view-transactions/view-transactions.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PaymentComponent } from './pages/payment/payment.component';
import {  HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
// tslint:disable-next-line:typedef
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
    AppComponent,
    PublisherAdminComponent,
    RequestsComponent,
    DashboardComponent,
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
    StatusComponent,
    EditArticleComponent,

    ViewTransactionsComponent,
    PageNotFoundComponent,
    PaymentComponent


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
    NgxPaginationModule,
    QuillModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: AuthInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

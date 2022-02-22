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

import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { PublisherAdminComponent } from './pages/publisher-admin/publisher-admin.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { UsersArticleComponent } from './pages/users-article/users-article.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StatusComponent } from './pages/status/status.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';
import {QuillModule} from "ngx-quill";
import { ViewTransactionsComponent } from './pages/view-transactions/view-transactions.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PaymentComponent } from './pages/payment/payment.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TruncateTextPipe } from './pipe/truncate-text.pipe';
import { ViewArticleComponent } from './pages/view-article/view-article.component';

import { UserManagementComponent } from './pages/user-management/user-management.component';
import { RoleComponent } from './role/role.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SafePipe } from './pipe/safe/safe.pipe';
import {NgxSpinnerModule} from "ngx-spinner";
import { TruncateArticleTitlePipe } from './pipe/truncate-article-title.pipe';
import { AboutComponent } from './pages/about/about.component';

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
    NavbarComponent,
    ViewTransactionsComponent,
    PageNotFoundComponent,
    PaymentComponent,
    TruncateTextPipe,
    ViewArticleComponent,
    UserManagementComponent,
    SafePipe,
    RoleComponent,
    TruncateArticleTitlePipe,
    AboutComponent,





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
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    QuillModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),


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

 export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

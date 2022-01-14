import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { DashboardComponent } from './pages/dashboard/dashboard.component';
=======
>>>>>>> ee594f177ec3e552a7cc4ae28a1585ef29e37ad7
import { PublisherAdminComponent } from './pages/publisher-admin/publisher-admin.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { UserAdminComponent } from './pages/user-admin/user-admin.component';
import { YourArticlesComponent } from './pages/your-articles/your-articles.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PublishArticleComponent } from './pages/publish-article/publish-article.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import { UsersArticleComponent } from './pages/users-article/users-article.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
// @ts-ignore
import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    DashboardComponent,
=======
>>>>>>> ee594f177ec3e552a7cc4ae28a1585ef29e37ad7
    PublisherAdminComponent,
    RequestsComponent,
    UserAdminComponent,
    YourArticlesComponent,
    UserProfileComponent,
    PublishArticleComponent,
    UsersArticleComponent,
    PublishArticleComponent,
    LandingPageComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

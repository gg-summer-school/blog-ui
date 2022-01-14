import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuardsComponent } from './auth/guards/guards.component';
import { InterceptorsComponent } from './auth/interceptors/interceptors.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { YourArticlesComponent } from './pages/your-articles/your-articles.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ArticleDetailPageComponent } from './pages/article-detail-page/article-detail-page.component';


@NgModule({
  declarations: [
    AppComponent,
    GuardsComponent,
    InterceptorsComponent,
    DashboardComponent,
    SignupComponent,
    YourArticlesComponent,
    UserProfileComponent,
    ArticleDetailPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

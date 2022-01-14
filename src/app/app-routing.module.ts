import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import {YourArticlesComponent} from './pages/your-articles/your-articles.component';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';
import {ArticleDetailPageComponent} from './pages/article-detail-page/article-detail-page.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'your-articles',
    component: YourArticlesComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'articles-detail',
    component: ArticleDetailPageComponent
  }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

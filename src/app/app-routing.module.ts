import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ArticleDetailPageComponent } from './pages/article-detail-page/article-detail-page.component';
import {YourArticlesComponent} from "./pages/your-articles/your-articles.component";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";
import {PublisherAdminComponent} from './pages/publisher-admin/publisher-admin.component';
import {UserAdminComponent} from './pages/user-admin/user-admin.component';
import {RequestsComponent} from './pages/requests/requests.component';
import {PublishArticleComponent} from './pages/publish-article/publish-article.component';
import {UsersArticleComponent} from './pages/users-article/users-article.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';


const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },

  {path: '', component: LandingPageComponent},  {path: 'your-articles', component: YourArticlesComponent},  {path: 'user-profile', component: UserProfileComponent},  {path: 'publisher-admin', component: PublisherAdminComponent},  {path: 'user-admin', component: UserAdminComponent},
  {path: 'requests', component: RequestsComponent},
  {path: 'publish-article', component: PublishArticleComponent},
  {path: 'users-article', component: UsersArticleComponent},
  {path: 'landing-page', component: LandingPageComponent},
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

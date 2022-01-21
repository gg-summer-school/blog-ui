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
import { AuthGuard } from './Guards/auth.guard';
import {EditArticleComponent} from "./pages/edit-article/edit-article.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LandingPageComponent
  },
  { path: 'your-articles',
    component: YourArticlesComponent,
    canActivate: [AuthGuard]
  },

  { path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },

  { path: 'publisher-admin',
    component: PublisherAdminComponent,
    canActivate: [AuthGuard]
  },

  { path: 'user-admin',
    component: UserAdminComponent,
    canActivate: [AuthGuard]
  },

  { path: 'requests',
    component: RequestsComponent,
    canActivate: [AuthGuard]
  },

  { path: 'publish-article',
    component: PublishArticleComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'users-article',
    component: UsersArticleComponent,
    canActivate: [AuthGuard]
  },

  { path: 'landing-page',
    component: LandingPageComponent
  },

  {
    path: 'articles-detail',
    component: ArticleDetailPageComponent,
    canActivate: [AuthGuard]
  },
 {
    path: 'edit-article/:id/:catid',
    component: EditArticleComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'signup',
    component: SignupComponent
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

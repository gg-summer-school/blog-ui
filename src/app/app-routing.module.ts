import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ArticleDetailPageComponent } from './pages/article-detail-page/article-detail-page.component';
import {YourArticlesComponent} from "./pages/your-articles/your-articles.component";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";
import {PublisherAdminComponent} from './pages/publisher-admin/publisher-admin.component';
import {RequestsComponent} from './pages/requests/requests.component';
import {PublishArticleComponent} from './pages/publish-article/publish-article.component';
import {UsersArticleComponent} from './pages/users-article/users-article.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import { AuthGuard } from './Guards/auth.guard';
import {ViewTransactionsComponent} from "./pages/view-transactions/view-transactions.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import { AdminGuard } from './Guards/admin.guard';
import { PublisherGuard } from './Guards/publisher.guard';
import { DashboardComponent } from './pages/user-admin/user-admin.component';


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
    canActivate: [AuthGuard, PublisherGuard]
  },

  { path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },

  { path: 'publisher-admin',
    component: PublisherAdminComponent,
    canActivate: [AuthGuard, PublisherGuard],
  },

  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, PublisherGuard],
  },

  { path: 'requests',
    component: RequestsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },

  { path: 'publish-article',
    component: PublishArticleComponent,
    canActivate: [AuthGuard, PublisherGuard]
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
    path: 'signup',
    component: SignupComponent
  },

  {
    path: 'view-transactions',
    component: ViewTransactionsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },

  {
    path: '**',
    redirectTo: 'page-not-found',
  },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

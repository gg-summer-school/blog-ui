import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {YourArticlesComponent} from "./pages/your-articles/your-articles.component";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";

const routes: Routes = [
  {path: 'your-articles', component: YourArticlesComponent},
  {path: 'user-profile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

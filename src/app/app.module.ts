import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { GuardsComponent } from './auth/guards/guards.component';
import { InterceptorsComponent } from './auth/interceptors/interceptors.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    GuardsComponent,
    InterceptorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

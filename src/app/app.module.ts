import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuardsComponent } from './auth/guards/guards.component';
import { InterceptorsComponent } from './auth/interceptors/interceptors.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PublisherAdminComponent } from './pages/publisher-admin/publisher-admin.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { UserAdminComponent } from './pages/user-admin/user-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    GuardsComponent,
    InterceptorsComponent,
    DashboardComponent,
    PublisherAdminComponent,
    RequestsComponent,
    UserAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ListComponent } from './list/list.component';
import { ListControllerComponent } from './list/list-controller/list-controller.component';
import { ListViewComponent } from './list/list-view/list-view.component';
import { ViewComponent } from './list/view/view.component';
import { EditComponent } from './list/edit/edit.component';
import { RawComponent } from './list/raw/raw.component';
import { VersionViewComponent } from './versions/version-view/version-view.component';
import { ViewSelectedVersionComponent } from './versions/view-selected-version/view-selected-version.component';
import { HighlightModule } from 'ngx-highlightjs';
import Prism from 'prismjs';
import { FileShareComponent } from './fileshare/fileshare.component';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, RouterModule } from '@angular/router';
import { ViewShareComponent } from './viewshare/viewshare.component';
import { NewComponent } from './list/new/new.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileShareResolver } from './shared/resolvers/fileshare.service';
import { RawShareComponent } from './list/rawshare/rawshare.component';
import { RawShareResolver } from './shared/resolvers/rawshare.service';
import { FileResolver } from './shared/resolvers/file.service';
import { RawResolver } from './shared/resolvers/raw.service';
import * as $ from 'jquery';
import { FooterComponent } from './footer/footer.component';
import { AccountComponent } from './list/account/account.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ListComponent,
    ListControllerComponent,
    ListViewComponent,
    ViewComponent,
    EditComponent,
    RawComponent,
    VersionViewComponent,
    ViewSelectedVersionComponent,
    FileShareComponent,
    ViewShareComponent,
    NewComponent,
    RawShareComponent,
    FooterComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    HighlightModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule
  ],
providers: [
  UserService,
  FileShareResolver,
  RawShareResolver,
  FileResolver,
  RawResolver,
  {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  },
  multi: true
}],
bootstrap: [AppComponent]
})
export class AppModule { }

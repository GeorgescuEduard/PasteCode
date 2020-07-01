import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ViewComponent } from './list/view/view.component';
import { EditComponent } from './list/edit/edit.component';
import { RawComponent } from './list/raw/raw.component';
import { VersionViewComponent } from './versions/version-view/version-view.component';
import { ViewSelectedVersionComponent } from './versions/view-selected-version/view-selected-version.component';
import { FileShareComponent } from './fileshare/fileshare.component';
import { NewComponent } from './list/new/new.component';
import { UserService } from './shared/user.service';
import { FileShareResolver } from './shared/resolvers/fileshare.service';
import { RawShareResolver } from './shared/resolvers/rawshare.service';
import { RawShareComponent } from './list/rawshare/rawshare.component';
import { FileResolver } from './shared/resolvers/file.service';
import { RawResolver } from './shared/resolvers/raw.service';
import { AccountComponent } from './list/account/account.component';
import { VersionListResolver } from './shared/resolvers/version-list.service';
import { SelectedVersionResolver } from './shared/resolvers/selected-version.service';


export const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'view/:file', component: ViewComponent, resolve: {file: FileResolver}, canActivate: [AuthGuard] },
  { path: 'edit/:file', component: EditComponent, resolve: {file: FileResolver}, canActivate: [AuthGuard] },
  { path: 'raw/:file', component: RawComponent, resolve: { file: RawResolver }, canActivate: [AuthGuard] },
  { path: 'version-view/:file', component: VersionViewComponent, resolve:{ file: VersionListResolver}, canActivate: [AuthGuard] },
  { path: 'view-selected-version/:file', component: ViewSelectedVersionComponent, resolve:{file: SelectedVersionResolver}, canActivate: [AuthGuard] },
  { path: 'new', component: NewComponent, canActivate: [AuthGuard] },
  { path: 'shared/:file', component: FileShareComponent, resolve: { shared: FileShareResolver } },
  { path: 'rawshare/:file', component: RawShareComponent, resolve: { shared: RawShareResolver } }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

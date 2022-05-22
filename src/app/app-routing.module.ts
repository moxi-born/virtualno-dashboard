import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AuthGuard} from "./auth.guard";
import {TokenInterceptor} from "./jwt.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {RegisterResultComponent} from "./pages/register-result/register-result.component";
import {PoolManageComponent} from "./pages/pool-manage/pool-manage.component";
import {PoolNumberManagerComponent} from "./pages/pool-number-manager/pool-number-manager.component";
import {ApplicationComponent} from "./pages/application/application.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-result', component: RegisterResultComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children:[
      {
        path:'pool/manage',component:PoolManageComponent
      },
      {
        path:"pool/number/:serialNumber", component:PoolNumberManagerComponent
      },
      {
        path:"app/manage", component:ApplicationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}]
})
export class AppRoutingModule { }

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {LoginComponent} from './pages/login/login.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzButtonModule} from "ng-zorro-antd/button";
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {RegisterComponent} from './pages/register/register.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzMessageModule, NzMessageService} from "ng-zorro-antd/message";
import {RegisterResultComponent} from './pages/register-result/register-result.component';
import {NzResultModule} from "ng-zorro-antd/result";
import {PoolManageComponent} from './pages/pool-manage/pool-manage.component';
import {HeaderUserComponent} from './pages/header-user/header-user.component';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzRadioModule} from "ng-zorro-antd/radio";
import { PoolNumberManagerComponent } from './pages/pool-number-manager/pool-number-manager.component';
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import { ApplicationComponent } from './pages/application/application.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    RegisterResultComponent,
    PoolManageComponent,
    HeaderUserComponent,
    PoolNumberManagerComponent,
    ApplicationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    HttpClientModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule,
    NzFormModule,
    NzDatePickerModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzResultModule,
    NzAvatarModule,
    NzDropDownModule,
    NzSpaceModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    NzRadioModule,
    NzPopconfirmModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, { provide: NzMessageService }],
  bootstrap: [AppComponent]
})
export class AppModule { }

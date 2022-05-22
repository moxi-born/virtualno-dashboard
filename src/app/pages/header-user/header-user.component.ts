import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {User} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'header-user',
  template: `
    <div nz-dropdown nzPlacement="bottomRight" [nzDropdownMenu]="userMenu">
      <nz-avatar nzIcon="user" style="background-color:#87d068;"></nz-avatar>
      {{user.username}}
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div nz-menu-item routerLink="/pro/account/center">
          <i nz-icon nzType="user" class="mr-sm"></i>
          用户中心
        </div>
        <div nz-menu-item routerLink="/pro/account/settings">
          <i nz-icon nzType="setting" class="mr-sm"></i>
          账户设置
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          退出登录
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserComponent implements OnInit {
  get user(): User {
    return JSON.parse(sessionStorage.getItem("user")!)
  }

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']).then(ignore =>{})
  }
}

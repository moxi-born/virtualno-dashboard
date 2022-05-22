import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-result',
  template: `
    <nz-result
      nzStatus="success"
      nzTitle="Successfully Registered!"
    >
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/login">前去登录</button>
      </div>
    </nz-result>
  `
})
export class RegisterResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

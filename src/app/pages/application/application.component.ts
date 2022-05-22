import {Component, OnInit} from '@angular/core';
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {ApplicationService} from "../../application.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {HttpErrorResponse} from "@angular/common/http";

class App {
  appId?: string;
  appName?: string;
  appKey?: string;
  secret?: string
}

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  isVisible = false;
  total = 1;
  listOfApp: App[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  addAppForm!: FormGroup;

  constructor(private applicationService: ApplicationService, private modalService: NzModalService, private fb: FormBuilder, public message: NzMessageService) { }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;
    const { pageSize, pageIndex } = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
  ): void {
    this.loading = true;
    this.applicationService.pagePool(pageIndex, pageSize).subscribe(res => {
      this.loading = false;
      this.total = res.data.totals;
      this.listOfApp = res.data.data;
    });
  }

  showModal() {
    this.addAppForm = this.fb.group({
      appId: [null, [Validators.required]],
      appName: [null, [Validators.required]],
      appKey: [null, [Validators.required]],
      secret: [null, [Validators.required]]
    });
    this.isVisible = true;
  }

  handleOk() {
    if (this.addAppForm.valid) {
      let pool = this.addAppForm.value;
      this.applicationService.addApp(pool).subscribe({
        next: () => {
          this.message.info("add success");
        },
        error: (err: HttpErrorResponse) => {
          this.message.error(err.error);
        },
        complete: () => {
        }
      });
    } else {
      Object.values(this.addAppForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.isVisible = false;
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }

  handleCancel() {
    this.isVisible = false;
  }

  generateKey() {
    this.addAppForm.controls['appKey'].setValue(this.randomstring());
  }
  generateSecret() {
    this.addAppForm.controls['secret'].setValue(this.randomstring());
  }
  // 简易的随机32位字符串
  randomstring(): string {
    let chars ='abcdefghijkmnopqrstuvwxyz1234567890';
    let maxPos = chars.length;
    let character = '';
    for (let i = 0; i < 32; i++) {
      character += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return character;
  }
}

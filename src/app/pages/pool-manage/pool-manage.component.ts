import { Component, OnInit } from '@angular/core';
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {PoolService} from "../../pool.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";

class Pool {
  serialNumber?: string;
  description?: string;
  enable?: boolean
}

@Component({
  selector: 'app-pool-manage',
  templateUrl: './pool-manage.component.html',
  styleUrls: ['./pool-manage.component.css']
})
export class PoolManageComponent implements OnInit {
  constructor(private poolService: PoolService, private modalService: NzModalService, private fb: FormBuilder, public message: NzMessageService) {}

  addPoolForm!: FormGroup;

  isVisible = false;
  total = 1;
  listOfPool: Pool[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
  ): void {
    this.loading = true;
    this.poolService.pagePool(pageIndex, pageSize).subscribe(res => {
      this.loading = false;
      this.total = res.data.totals;
      this.listOfPool = res.data.data;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;
    const { pageSize, pageIndex } = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }

  showModal(): void {
    this.addPoolForm = this.fb.group({
      serialNumber: [null, [Validators.required]],
      description: [null, [Validators.required]],
      enable: [null, [Validators.required]]
    });
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.addPoolForm.valid) {
      let pool = this.addPoolForm.value;
      this.poolService.addPool(pool).subscribe({
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
      Object.values(this.addPoolForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}


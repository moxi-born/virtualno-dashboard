import {Component, OnInit} from '@angular/core';
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {ActivatedRoute} from "@angular/router";
import {PoolService} from "../../pool.service";
import {NzMessageService} from "ng-zorro-antd/message";

class PoolNumber {
  virtualNumber?: string;
  serialNumber?: string;
  areaCode?: string;
  enable?: boolean
}

@Component({
  selector: 'app-pool-number-manager',
  templateUrl: './pool-number-manager.component.html',
  styleUrls: ['./pool-number-manager.component.css']
})
export class PoolNumberManagerComponent implements OnInit {
  isVisible = false;
  total = 1;
  listOfNumber: PoolNumber[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  serialNumber = this.activatedRoute.snapshot.params['serialNumber'];

  constructor(private activatedRoute: ActivatedRoute, private poolService: PoolService, public message: NzMessageService) { }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, this.serialNumber);
  }

  handleOk() {

  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;
    const { pageSize, pageIndex } = params;
    this.loadDataFromServer(pageIndex, pageSize, this.serialNumber);
  }

  private loadDataFromServer(pageIndex: number, pageSize: number, serialNumber: string) : void {
    this.loading = true;
    this.poolService.pagePoolNumbers(serialNumber, pageIndex, pageSize)
      .subscribe(res => {
        this.loading = false;
        this.total = res.data.totals;
        this.listOfNumber = res.data.data;
      });
  }

  enableOrDisableNumber(virtualNumber: string, enable: boolean) {
    this.poolService.enableDisableNumber(virtualNumber, enable)
      .subscribe(() => {
        this.message.success(`${enable ? '启用' : '禁用'}成功`);
        this.loadDataFromServer(this.pageIndex, this.pageSize, this.serialNumber);
      })
  }
}

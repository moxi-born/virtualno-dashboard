import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PoolService {

  constructor(private httpClient: HttpClient) { }
  /**
   * 分页获取号码池数据
   * @returns {Observable<result<any>>}
   * @param pageNum
   * @param pageSize
   */
  pagePool(pageNum: number, pageSize: number): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/v1/pool/${pageNum}/${pageSize}`)
        .pipe(catchError((error) => {
          return throwError(error);
        }));
  }

  /**
   * 添加号码池
   * @param pool
   */
  addPool(pool: Pool): Observable<any> {
    return this.httpClient.post(`${environment.api}/api/v1/pool/`, pool)
      .pipe(catchError((error) => {
        return throwError(error);
      }));
  }

  /**
   * 分页查询号码池下面的号码
   * @param serialNumber
   * @param pageNum
   * @param pageSize
   */
  pagePoolNumbers(serialNumber: string,pageNum: number, pageSize: number): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/v1/pool/number/${serialNumber}/${pageNum}/${pageSize}`)
      .pipe(catchError((error) => {
        return throwError(error);
      }));
  }

  enableDisableNumber(virtualNumber: string,enable: boolean): Observable<any> {
    return this.httpClient.patch(`${environment.api}/api/v1/pool/number`, {"virtualNumber": virtualNumber, "enable": enable})
      .pipe(catchError((error) => {
        return throwError(error);
      }));
  }
}

export class Pool {
  // 号码池编号
  serialNumber?: string = '';
  // 备注
  description?: string = '';
  // 是否可用
  enable?: boolean = true;
}

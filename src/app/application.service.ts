import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClient: HttpClient) { }

  /**
   * 分页获取应用数据
   * @returns {Observable<result<any>>}
   * @param pageNum
   * @param pageSize
   */
  pagePool(pageNum: number, pageSize: number): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/v1/app/${pageNum}/${pageSize}`)
      .pipe(catchError((error) => {
        return throwError(error);
      }));
  }

  /**
   * 添加应用
   * @param pool
   */
  addApp(pool: App): Observable<any> {
    return this.httpClient.post(`${environment.api}/api/v1/app/`, pool)
      .pipe(catchError((error) => {
        return throwError(error);
      }));
  }
}

export class App {
  appId?: string;
  appName?: string;
  appKey?: string;
  secret?: string
}

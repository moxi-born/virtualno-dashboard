import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }
  /**
   * 登录
   *
   * @param {User} user
   * @returns {Observable<result<string>>}
   */
  login(user: User): Observable<any> {
    const options = {
      responseType: 'text' as 'json'
    }
    return new Observable<any>((subscriber : any) => {
      this.httpClient.post(`${environment.api}/api/v1/token`, user, options).subscribe({
        next(z: any) {
          subscriber.next(z);
          subscriber.complete();
        },
        error(k: any) {
          subscriber.error(k);
          subscriber.complete();
        },
        complete() {
          subscriber.complete();
        }
      });
    });
  }

  logout() {
    sessionStorage.clear();
  }

  refreshToken(): Observable<any> {
    const options = {
      responseType: 'text' as 'json'
    }
    return new Observable<any>(subscriber => {
      this.httpClient.post<any>(`${environment.api}/api/v1/refresh-token`, {}, options)
        .subscribe({
          next: ((res: HttpResponse<string>) => {
            // this.startRefreshTokenTimer();
            subscriber.next(res.body);
            subscriber.complete();
          }),
          error: ((err: HttpErrorResponse) => {
            subscriber.error(err);
            subscriber.complete();
          }),
          complete:(() => {
            subscriber.complete();
          })
        })
    });
  }

  /**
   * 刷新token，目前没对接oauth2，暂时不用
   * @private
   */
  // private startRefreshTokenTimer() {
  //   // 拿到token的payload部分
  //   let payloadPart = sessionStorage.getItem("token")?.split('.')[1];
  //   if(payloadPart !== undefined) {
  //     // base64转成实际json
  //     const payload = JSON.parse(atob(payloadPart));
  //     // 过期前刷新
  //     const expires = new Date(payload.exp * 1000);
  //     const timeout = expires.getTime() - Date.now() - (60 * 1000);
  //     this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  //   }
  // }
}

/**
 * 用户对象
 *
 * @export
 * @class User
 */
export class User {
  // 用户名
  username?: string = '';
  // 密码
  password?: string = '';
}


import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import {Observable, of, tap} from 'rxjs';
import {Router} from "@angular/router";
import {environment} from "../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>   {
    // 统一加上服务端前缀
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      const baseUrl = environment.api;
      url = baseUrl + (baseUrl.endsWith('/') && url.startsWith('/') ? url.substring(1) : url);
    }

    // 设置Authorization的请求头
    const authToken = sessionStorage.getItem("token")
    if (authToken) {
      // 服务请求时所有的请求加入token
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'bearer' + authToken),
        url: req.url
      });
      // 服务器响应结果
      return next.handle(authReq).pipe(tap(event => {
        if (event instanceof HttpResponse) {
          this.handleData(event);
        }
      }));
    }
    // 若token不存在，则不对请求进行处理
    return next.handle(req).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        this.handleData(event);
      }
    }));
  }
  handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    switch (event.status) {
      case 200:
        return of(event);
      case 401:
        this.router.navigate(['/login']).then(ignore => {});
        return of(event);
      case 404:
        this.router.navigate(['/404']).then(ignore => {});
        return of(event);
      case 500:
        return of(event);
      default:
        return of(event);
    }
  }
}


import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageObserver } from '../storage.observer';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(
        private storageObserver: StorageObserver,
        private toast: HotToastService
    ) { }

    private tokenKey: string = 'jwt_token'

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let httpHeaders: any = {},
            params: any = {},
            paramKeys = request.params.keys(),
            token: any = this.storageObserver.getCookie(this.tokenKey);

        //SETTING PARAMS
        if (paramKeys.length > 0) {
            for (let pki = 0; pki < paramKeys.length; ++pki) {
                params[paramKeys[pki]] = request.params.get(paramKeys[pki]);
            }
        }

        //SETTING BASE URL
        request = request.clone({
            url:
                request.url.indexOf('http') == -1
                    ? environment.apiUrl + request.url
                    : request.url,
            setHeaders: httpHeaders,
            setParams: params,
        });

        // SETTING HEADERS
        httpHeaders['Access-Control-Allow-Origin'] = 'http://localhost:4200';
        if (!request.url.includes('auth/signup') && !request.url.includes('auth/login') && !request.url.includes('auth/verify-account')) {
            if (token) {
                httpHeaders['Authorization'] = `Bearer ${this.storageObserver.getCookie('jwt_token')}`;
            } else {
                this.toast.error('Please login first');
            }
        }

        // Pass the modified request to the next handler
        return next.handle(request).pipe(
            retry(3),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body.hasOwnProperty('success')) {
                        // check for any errors from server
                        if (!event.body.success) {
                            console.log('Error:', event.body.message);
                            // throw new Error('Alert!', event.body.message);
                        }
                    } else {
                        console.log('Error:', event.body.message);
                        // throw new Error('Server Error', event.body.message);
                    }
                }
                return event;
            })
        );
    }

}

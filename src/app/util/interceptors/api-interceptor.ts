import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let httpHeaders: any = {},
            params: any = {},
            paramKeys = request.params.keys();

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
        // httpHeaders['Authorization'] = 'Bearer <your-token>';

        // Pass the modified request to the next handler
        return next.handle(request).pipe(
            retry(3),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body.hasOwnProperty('success')) {
                        // check for any errors from server
                        if (!event.body.success) {
                            throw new Error('Alert!', event.body.message);
                        }
                    } else {
                        throw new Error('Server Error', event.body.message);
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data: any = {};
                data = {
                    reason:
                        error && error.error.reason
                            ? error.error.reason
                            : `${error.status} ${error.statusText}`,
                    status: error.status,
                };
                throw new Error(error.message ? error.message : data.reason, data.reason);
            })
        );
    }

}

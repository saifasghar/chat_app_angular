import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './util/interceptors/api-interceptor';
import { StorageObserver } from './util/storage.observer';
import { Validator } from './util/validator/validator';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: 'http://localhost:3000', options: {
    query: {
      token: new StorageObserver().getCookie('jwt_token'),
    },
  },
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    StorageObserver,
    Validator
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

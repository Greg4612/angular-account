import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AccountService } from './account.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FakeDataInterceptorService } from './fake-data-interceptor.service';

@NgModule({
  imports:      [ 
    BrowserModule, FormsModule, HttpClientModule,
     ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: FakeDataInterceptorService, multi: true } ],
  
})
export class AppModule { }

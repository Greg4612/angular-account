import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IAccount } from './account';
import { ACCOUNTS } from './mock-account';

@Injectable()
export class FakeDataInterceptorService implements HttpInterceptor{
  accounts : IAccount[] = [];
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

     return of(null).pipe(mergeMap(() => {
      //intercepts the accounts so that we can simulate data
      if (request.url.endsWith('api/accounts') && request.method === 'GET') {
        this.accounts = ACCOUNTS;
        this.sizeData(request.params.get('moreData'), request.params.get('pageSize'));
        this.sortData(request.params.get('sortDirection'), request.params.get('sortBy'));
        let totalDataSize = ACCOUNTS.length;

          return of(new HttpResponse({ status: 200, body: {accounts : this.accounts , totalData : totalDataSize} }));
      } 
    }));
  }

  /* Slice the data thats given based on the page size. 
      If more data is true then double the size of the data. 
   */
  private sizeData(moreData, pageSize){
    let endSize = pageSize;
    if(moreData){
      endSize = moreData === 'true' ? pageSize * 2 : pageSize;
    }
    this.accounts = this.accounts.slice(0, endSize);
  }

  /*Sorting all data  */
  private sortData( sortDirection:string,sortBy:string){
    if(sortBy && sortDirection){

    console.log(this.accounts)
      if(sortDirection === 'asc'){
       this.accounts = this.accounts.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);
      }
      else{
       this.accounts = this.accounts.sort((a, b) => (a[sortBy] > b[sortBy]) ? -1 : 1);
      }
    }
  }
}

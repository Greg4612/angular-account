import { Injectable } from '@angular/core';
import { IAccount } from './account';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable()
export class AccountService {

private coreUrl = 'api/accounts';   

  constructor(
    private http: HttpClient) { }

  /*
  gets all the accounts  based on the params 
  pagesize is the size of the data 
  column is the sort column 
  direction is the direction that the data will be sorted 
  displayMoreData is if the user wants more data*/
  getAccounts( pagesize: number, column: string, direction: string, displayMoreData: boolean  ): Observable<IAccount[]> {
    let params = new HttpParams();
    if (direction !== undefined && direction !== '') {
      params = params.set('sortDirection', direction);
    }
    if (pagesize !== undefined ) {
      params =  params.set('pageSize',  pagesize.toString());
    }

    if (column !== undefined && column !== '') {
      params =  params.set('sortBy',  column);
    }
    if (displayMoreData !== undefined) {
      params =  params.set('moreData',  displayMoreData.toString());
    }
    return this.http.get<IAccount[]>(this.coreUrl, {params})
      .pipe(
       catchError(this.handleError<IAccount[]>('getAccounts', []))
      );
  }


private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
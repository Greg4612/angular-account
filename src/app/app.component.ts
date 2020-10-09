import { Component, OnInit } from '@angular/core';
import { IAccount } from './account';
import { AccountService } from './account.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  currentEventColumn = undefined;
  /** @description Holds accounts. */
  accounts: IAccount[];
  /** @description Holds the total accounts . */
  totalAccounts: number;
  /** @description Holds default sort column. */
  sortColumn = '';
  /** @description Holds default sort direction. */
  sortDirection = '';
  /** @description Holds default dataSize. */
  size = 3;
  moreLoaded = false;
constructor(private accountService: AccountService) { }
/*Loads the initial data */
ngOnInit() {
    this.loadAccounts(this.size, false, undefined, undefined);
  }

/*Loads the account data */
  private loadAccounts(size: number, loadMore: boolean, column: string, direction): void {
    this.accountService.getAccounts(size, column, direction, loadMore)
    .subscribe(accounts => {
      this.accounts = accounts['accounts'];
      this.size = this.accounts.length;
      this.totalAccounts = accounts['totalData'];
    });
  }

/*converts all pased in number to percentages */
  public convertPercentage(percentage) : number{
    return percentage.toFixed(2);
  }

/*converts all pased in number to cash */
  public convertCashValue(cash): string {
    return cash.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  
/*based on the acounts isPositive the color will change. 
  if the account is postive and changePercentage is greater than 0 it will change the color to green
  if the account is negative and changePercentage is greater than 0 it will change the color to red
  default color is grey  */
  public colorConvert(account: IAccount) : string {
    let className = 'gray';
    if(account.changePercentage > 0){
      if(account.isPositive){
        className = 'green'
      }
      else if(!account.isPositive){
        className = 'red'
      }
    }
    return className;
  }

  public loadMore(){
    this.moreLoaded = true;
    this.loadAccounts(this.size, this.moreLoaded, this.sortColumn, this.sortDirection);
  }

/* checks to see if the total amount of data is the same of the total list*/
  public checkAccountTotal(){
    return this.totalAccounts === this.accounts.length;
  }

  public sortData(event){
    this.currentEventColumn = event;
    let target = event.currentTarget,
      classList = target.classList;
      
    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');

    this.sortDirection = 'asc'; 
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');

    this.sortDirection = 'desc'; 
    }


    this.loadAccounts(this.size, this.moreLoaded, this.sortColumn, this.sortDirection);
  }
  
}




import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { XService } from 'src/app/services/x.service';
import { GlobalConstants as GC } from 'src/app/global-constants';

@Component({
  selector: 'app-loan-accounts',
  templateUrl: './loan-accounts.component.html',
  styleUrls: ['./loan-accounts.component.scss'],
})
export class LoanAccountsComponent implements OnInit, OnDestroy {
  accs = [
    ...this.accService.accounts,
    {
      name: 'Contract',
      id: this.accService.accounts.length,
      balances: [],
      address: GC.hookAddress,
    },
  ];
  addresses = [...this.accs.map((acc) => acc.address)];
  currencies = GC.currencies;

  constructor(private accService: AccountService, private x: XService) {}

  ngOnInit(): void {
    this.subscribe();
  }

  ngOnDestroy(): void {
    console.log('Loan unsubscribe');
    this.x.client.request({
      id: 'loan',
      command: 'unsubscribe',
      accounts: this.addresses,
    });
  }

  async subscribe() {
    await this.x.client.request({
      id: 'loan',
      command: 'subscribe',
      accounts: this.addresses,
    });
    this.x.client.on('transaction', (tx) => {
      if (tx.transaction.TransactionType == 'Payment') {
        // console.log('Socket-Payment:', tx);
        this.fetchAccDetails([
          tx.transaction.Destination,
          tx.transaction.Account,
        ]);
      }
    });
    await this.fetchAccDetails();
  }

  async fetchAccDetails(ads?: string[]) {
    for (var acc of this.accs) {
      if (!ads || ads.includes(acc.address)) {
        const balances = await this.x.client.getBalances(acc.address);
        acc.balances[0] = +balances[0].value;
        for (var balance of balances) {
          for (let i = 0; i < this.currencies.length; i++) {
            if (
              balance.issuer == this.currencies[i].address &&
              balance.currency == this.currencies[i].name
            ) {
              acc.balances[i] = +balance.value;
            }
          }
        }
      }
    }
  }

  openStream() {
    window.open(
      'https://hooks-testnet-v2-debugstream.xrpl-labs.com/' + GC.hookAddress,
      '_blank'
    );
  }

  openExplorer(address: string) {
    window.open(
      'https://hooks-testnet-v2-explorer.xrpl-labs.com/' + address,
      '_blank'
    );
  }
}

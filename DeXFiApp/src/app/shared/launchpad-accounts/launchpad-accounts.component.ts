import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalConstants as GC } from 'src/app/global-constants';
import { AccountService } from 'src/app/services/account.service';
import { XService } from 'src/app/services/x.service';
import * as xrpl from 'xrpl';
import { Project } from '../../../assets/projects';

@Component({
  selector: 'app-launchpad-accounts',
  templateUrl: './launchpad-accounts.component.html',
  styleUrls: ['./launchpad-accounts.component.scss'],
})
export class LaunchpadAccountsComponent implements OnInit, OnDestroy {
  accs = [
    ...this.accService.accounts,
    {
      name: Project.projects[0].name,
      id: this.accService.accounts.length,
      nfts: [],
      balances: [],
      address: Project.projects[0].address,
    },
    {
      name: Project.projects[1].name,
      id: this.accService.accounts.length + 1,
      nfts: [],
      balances: [],
      address: Project.projects[1].address,
    },
  ];
  addresses = [...this.accs.map((acc) => acc.address)];
  currencies = GC.currencies;

  constructor(private accService: AccountService, private x: XService) {}

  ngOnInit(): void {
    this.subscribe();
  }

  ngOnDestroy(): void {
    // console.log('Launchpad unsubscribe');
    this.x.client.request({
      id: 'launchpad',
      command: 'unsubscribe',
      accounts: this.addresses,
    });
  }

  async subscribe() {
    await this.x.client.request({
      id: 'launchpad',
      command: 'subscribe',
      accounts: this.addresses,
    });
    this.x.client.on('transaction', (tx) => {
      // console.log('Socket-Payment Launchpad:', tx);
      if (tx.transaction.TransactionType == 'NFTokenAcceptOffer') {
        this.fetchAccDetails([
          this.accs[this.accs.length - 1].address,
          this.accs[this.accs.length - 2].address,
        ]);
      }
      if (tx.transaction.TransactionType == 'Payment') {
        // console.log('Socket-Payment:', tx);
        this.fetchAccDetails([
          tx.transaction.Destination,
          tx.transaction.Account,
        ]);
      } else this.fetchAccDetails([tx.transaction.Account]);
      if (tx.transaction.TransactionType == 'NFTokenCreateOffer') {
        this.x.setNewNFTOfferId(tx.transaction.NFTokenID);
      }
    });
    await this.fetchAccDetails();
  }

  async fetchAccDetails(ads?: string[]) {
    for (var acc of this.accs) {
      if (!ads || ads.includes(acc.address)) {
        acc.balances[0] = +(await this.x.client.getXrpBalance(acc.address));
        const nfts = await this.x.client.request({
          command: 'account_nfts',
          account: acc.address,
        });
        acc.nfts = nfts.result.account_nfts;
      }
    }
  }

  openUri(uri: string) {
    if (uri) window.open(xrpl.convertHexToString(uri), '_blank');
    else console.log('No URI provided');
  }

  openStream() {
    window.open(
      'https://hooks-testnet-v2-debugstream.xrpl-labs.com/' +
        this.accs[this.accs.length - 1].address,
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

import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { XService } from 'src/app/services/x.service';
import { GlobalConstants as GC } from 'src/app/global-constants';
import { Game } from 'src/assets/games';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-lottery-accounts',
  templateUrl: './lottery-accounts.component.html',
  styleUrls: ['./lottery-accounts.component.scss'],
})
export class LotteryAccountsComponent implements OnInit {
  accs = [
    ...this.accService.accounts,
    {
      name: Game.games[0].name,
      id: this.accService.accounts.length,
      nfts: [],
      balances: [],
      address: Game.games[0].address,
    },
    {
      name: Game.games[1].name,
      id: this.accService.accounts.length + 1,
      nfts: [],
      balances: [],
      address: Game.games[1].address,
    },
    {
      name: Game.games[2].name,
      id: this.accService.accounts.length + 2,
      nfts: [],
      balances: [],
      address: Game.games[2].address,
    },
  ];
  addresses = [...this.accs.map((acc) => acc.address)];
  currencies = GC.currencies;

  constructor(
    private accService: AccountService,
    private x: XService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.subscribe();
  }

  ngOnDestroy(): void {
    // console.log('Launchpad unsubscribe');
    this.x.client.request({
      id: 'lottery',
      command: 'unsubscribe',
      accounts: this.addresses,
    });
  }

  async subscribe() {
    await this.x.client.request({
      id: 'lottery',
      command: 'subscribe',
      accounts: this.addresses,
    });
    this.x.client.on('transaction', (tx) => {
      // console.log('Socket-Payment Launchpad:', tx);
      if (tx.transaction.TransactionType == 'Payment') {
        // console.log('Socket-Payment:', tx);
        if (tx.transaction.Account == this.accs[this.accs.length - 1].address)
          this.doublerWon();
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
        acc.balances[0] = +(await this.x.client.getXrpBalance(acc.address));
      }
    }
  }

  doublerWon() {
    this.snackBarService.openSnackBar(
      'Doubler: Congrats! You doubled your money! ',
      '',
      5000
    );
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

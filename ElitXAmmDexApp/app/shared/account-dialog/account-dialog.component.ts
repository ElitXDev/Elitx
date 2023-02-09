import { Component } from '@angular/core';
import { XService } from 'src/app/services/x.service';
import { XummService } from 'src/app/services/xumm.service';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss'],
})
export class AccountDialogComponent {
  address?: string;
  balances: typeof this.x.balances = [];

  constructor(private x: XService, private xummService: XummService) {
    this.getBalances();
    this.address = this.xummService.Address;
  }

  async getBalances() {
    if (this.xummService.Address)
      this.balances = await this.x.getBalances(this.xummService.Address);
  }

  xummLogOut() {
    this.xummService.logout();
  }

  openExplorer() {
    window.open('https://livenet.xrpl.org/accounts/' + this.address, '_blank');
  }
}

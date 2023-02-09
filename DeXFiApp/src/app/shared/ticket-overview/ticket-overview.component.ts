import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/services/account.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { XService } from 'src/app/services/x.service';
import { AccountState, ProjectData } from '../../interface';
import * as xrpl from 'xrpl';
import { Ticket } from 'src/assets/tickets';
const shajs = require('sha.js');

@Component({
  selector: 'app-ticket-overview',
  templateUrl: './ticket-overview.component.html',
  styleUrls: ['./ticket-overview.component.scss'],
})
export class TicketOverviewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  expandedElement!: ProjectData | null;
  loading = false;
  filterValue = '';
  tickets = Ticket.tickets;
  dataSource = new MatTableDataSource(this.tickets);
  readonly description = 'Description';
  readonly plain = 'text/plain';
  acc = 0;
  category = 0;
  readonly accs = [...this.accService.accounts];
  readonly cols = ['name', 'business', 'website'];
  key = '';
  eleAnimation = 'expand_out_right';
  offers = {} as xrpl.NFTSellOffersResponse['result']['offers'];
  now = Date.now();
  // SnackBar
  readonly addressSnackbarMessage = 'Address copied to the clipboard';
  readonly addressSnackbarAction = '';
  readonly addressSnackbarDuration = 3000;
  readonly errorSnackbarMessage = 'An error occured. Try again later.';
  readonly errorSnackbarAction = '';
  readonly errorSnackbarDuration = 3000;

  constructor(
    public snackBarService: SnackbarService,
    private x: XService,
    private accService: AccountService
  ) {}

  ngOnInit(): void {
    this.x.newNFTOfferId.subscribe((id) => this.getNFTOffers(id));
    this.setAvailableNfts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async expand(data: ProjectData) {
    if (this.expandedElement === data) {
      this.eleAnimation = 'expand_out_right';
      await new Promise((resolve) => setTimeout(resolve, 300));
      this.expandedElement = null;
    } else {
      this.eleAnimation = 'expand_in_right';
      this.expandedElement = data;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  getXAddress(address: string, tag: number) {
    return xrpl.classicAddressToXAddress(address, tag, false);
  }

  register() {
    this.snackBarService.openSnackBar(
      'Please wait for Mainnet launch.',
      this.errorSnackbarAction,
      this.errorSnackbarDuration
    );
  }

  async sendTx(data: ProjectData, tag: number) {
    this.loading = true;
    try {
      var preparedPayment: xrpl.Payment = await this.x.client.autofill({
        TransactionType: 'Payment',
        Account: this.accs[this.acc].address,
        Amount: xrpl.xrpToDrops(tag == 2 ? data.price[this.category] : 1),
        Destination: data.address,
        Fee: '100000',
        DestinationTag: tag,
      });
      // console.log(preparedPayment);
      var signed = this.accs[this.acc].wallet!.sign(preparedPayment);
      var submit = await this.x.client.submitAndWait(signed.tx_blob);
      if (
        typeof submit.result.meta! !== 'string' &&
        submit.result.meta!.TransactionResult == 'tesSUCCESS'
      ) {
        this.setAvailableNfts();
        this.snackBarService.openSnackBar(
          'Congrats! Everything worked as expected!',
          this.errorSnackbarAction,
          this.errorSnackbarDuration
        );
      }
    } catch (error: any) {
      this.snackBarService.openSnackBar(
        error,
        this.errorSnackbarAction,
        this.errorSnackbarDuration
      );
    }
    this.loading = false;
  }

  async getNFTOffers(id: string) {
    if (!id) return;
    this.loading = true;
    try {
      const sellOffers = (
        await this.x.client.request({
          command: 'nft_sell_offers',
          nft_id: id,
          ledger_index: 'validated',
        })
      ).result.offers;
      if (sellOffers) {
        this.accs[this.acc].nftSellOffers = sellOffers;
        this.snackBarService.openSnackBar(
          `New NFT sell offer!`,
          this.errorSnackbarAction,
          this.errorSnackbarDuration
        );
      }
    } catch (error: any) {
      this.snackBarService.openSnackBar(
        error,
        this.errorSnackbarAction,
        this.errorSnackbarDuration
      );
    }
    this.loading = false;
  }

  async acceptOffer(id: string) {
    this.loading = true;
    try {
      var preparedPayment: xrpl.NFTokenAcceptOffer =
        await this.x.client.autofill({
          TransactionType: 'NFTokenAcceptOffer',
          Account: this.accs[this.acc].address,
          NFTokenSellOffer: id,
        });
      // console.log(preparedPayment);
      var signed = this.accs[this.acc].wallet!.sign(preparedPayment);
      var submit = await this.x.client.submitAndWait(signed.tx_blob);
      if (
        typeof submit.result.meta! !== 'string' &&
        submit.result.meta!.TransactionResult == 'tesSUCCESS'
      ) {
        this.accs[this.acc].nftSellOffers = undefined;
        this.snackBarService.openSnackBar(
          'Congrats! Check out your new NFT!',
          this.errorSnackbarAction,
          this.errorSnackbarDuration
        );
      }
    } catch (error: any) {
      this.snackBarService.openSnackBar(
        error,
        this.errorSnackbarAction,
        this.errorSnackbarDuration
      );
    }
    this.loading = false;
  }

  async setAvailableNfts() {
    try {
      var hash: string = shajs('sha256')
        .update('ticket')
        .digest('hex')
        .toUpperCase();
      for (const [i, _] of this.tickets.entries()) {
        var state = (await this.x.client.request({
          command: 'account_namespace',
          account: this.tickets[i].address,
          namespace_id: hash,
        })) as AccountState;
        // console.log('Hook state:', state);
        for (const entry of state.result.namespace_entries) {
          if (parseInt(entry.HookStateKey[63], 16) == 9) {
            for (const [j, _] of this.tickets[i].shares.entries()) {
              var idx = (this.tickets[i].shares.length + j) * 2;
              this.tickets[i].shares[j] =
                this.tickets[i].maxShares[j] -
                parseInt(entry.HookStateData.substring(idx, idx + 2), 16);
            }
          }
        }
      }
    } catch (error) {
      console.log('Hook state error:', error);
    }
  }
}

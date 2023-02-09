import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/services/account.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { XService } from 'src/app/services/x.service';
import { Game } from 'src/assets/games';
import { AccountState, LotteryData } from '../../interface';
import * as xrpl from 'xrpl';
const shajs = require('sha.js');

@Component({
  selector: 'app-lottery-overview',
  templateUrl: './lottery-overview.component.html',
  styleUrls: ['./lottery-overview.component.scss'],
})
export class LotteryOverviewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  expandedElement!: LotteryData | null;
  loading = false;
  filterValue = '';
  games = Game.games;
  dataSource = new MatTableDataSource(this.games);
  acc = 0;
  size = 0;
  tickets = 1;
  number = 1;
  availableNumbers: number[][] = [[], [], []];
  readonly accs = [...this.accService.accounts];
  readonly cols = ['name', 'subtitle'];
  eleAnimation = 'expand_out_right';
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
    for (let i = 0; i < 3; i++) {
      this.availableNumbers[i] = Array.from({ length: 100 }, (_, j) => j + 1);
    }
    for (const acc of this.accs) {
      acc.tickets = [
        [0, 0, 0],
        [0, 0, 0],
      ];
      acc.numbers = [[], [], []];
    }
    this.getTickets();
    this.getNumbers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async expand(data: LotteryData) {
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

  async sendTx(data: LotteryData) {
    this.loading = true;
    var amt =
      data.id == 0
        ? data.amounts[this.size] * this.tickets
        : data.amounts[this.size];
    try {
      var preparedPayment: xrpl.Payment = await this.x.client.autofill({
        TransactionType: 'Payment',
        Account: this.accs[this.acc].address,
        Amount: xrpl.xrpToDrops(amt),
        Destination: data.address,
        Fee: '100000',
      });
      if (data.id == 1) preparedPayment['DestinationTag'] = this.number;
      // console.log(preparedPayment);
      var signed = this.accs[this.acc].wallet!.sign(preparedPayment);
      var submit = await this.x.client.submitAndWait(signed.tx_blob);
      this.snackBarService.openSnackBar(
        typeof submit.result.meta! !== 'string' &&
          submit.result.meta!.TransactionResult == 'tesSUCCESS'
          ? 'Congrats! Everything worked as expected!'
          : 'Sorry! Invalid transaction sent!',
        this.errorSnackbarAction,
        this.errorSnackbarDuration
      );
      if (data.id == 0) this.getTickets();
      else if (data.id == 1) this.getNumbers();
    } catch (error: any) {
      this.snackBarService.openSnackBar(
        error,
        this.errorSnackbarAction,
        this.errorSnackbarDuration
      );
    }
    this.loading = false;
  }

  async getState(idx: number) {
    var hash: string = shajs('sha256')
      .update('lottery')
      .digest('hex')
      .toUpperCase();
    return (await this.x.client.request({
      command: 'account_namespace',
      account: this.games[idx].address,
      namespace_id: hash,
    })) as AccountState;
  }

  async getNumbers() {
    try {
      for (const acc of this.accs) {
        acc.tickets![1] = [0, 0, 0];
        acc.numbers = [[], [], []];
      }
      var state = await this.getState(1);
      // console.log('Hook state 1:', state);
      for (const entry of state.result.namespace_entries) {
        if (parseInt(entry.HookStateKey[63], 16) == 9) {
          for (const [j, _] of this.games[1].tickets.entries()) {
            var idx = j * 2;
            this.games[1].availableTickets[j] =
              this.games[1].tickets[j] -
              parseInt(entry.HookStateData.substring(idx, idx + 2), 16);
          }
        } else if (
          parseInt(entry.HookStateKey[1], 16) == 0 &&
          parseInt(entry.HookStateKey[7], 16) == 0
        ) {
          var address = xrpl.encodeAccountID(
            Buffer.from(entry.HookStateData.substring(0, 40), 'hex')
          );
          for (const acc of this.accs) {
            if (acc.address == address) {
              var one = parseInt(entry.HookStateKey.substring(56, 58), 16);
              if (one > 0) {
                acc.numbers![0].push(one);
                ++acc.tickets![1][0];
                this.availableNumbers[0].splice(
                  this.availableNumbers[0].indexOf(one),
                  1
                );
              }
              var two = parseInt(entry.HookStateKey.substring(58, 60), 16);
              if (two > 0) {
                acc.numbers![1].push(two);
                ++acc.tickets![1][1];
                this.availableNumbers[1].splice(
                  this.availableNumbers[1].indexOf(two),
                  1
                );
              }
              var three = parseInt(entry.HookStateKey.substring(60, 62), 16);
              if (three > 0) {
                acc.numbers![2].push(three);
                ++acc.tickets![1][2];
                this.availableNumbers[2].splice(
                  this.availableNumbers[2].indexOf(three),
                  1
                );
              }
            }
          }
        }
      }
    } catch (error) {
      console.log('Hook state error numbers:', error);
    }
  }

  async getTickets() {
    try {
      for (const acc of this.accs) acc.tickets![0] = [0, 0, 0];
      var state = await this.getState(0);
      // console.log('Hook state 0:', state);
      for (const entry of state.result.namespace_entries) {
        if (parseInt(entry.HookStateKey[63], 16) == 9) {
          for (const [j, _] of this.games[0].tickets.entries()) {
            var idx = j * 2;
            this.games[0].availableTickets[j] =
              this.games[0].tickets[j] -
              parseInt(entry.HookStateData.substring(idx, idx + 2), 16);
          }
        } else if (
          parseInt(entry.HookStateKey[1], 16) == 0 &&
          parseInt(entry.HookStateKey[7], 16) == 0
        ) {
          var address = xrpl.encodeAccountID(
            Buffer.from(entry.HookStateData.substring(0, 40), 'hex')
          );
          this.accs.findIndex((acc) => {
            if (acc.address == address) {
              if (parseInt(entry.HookStateKey.substring(56, 58), 16) > 0)
                ++acc.tickets![0][0];
              if (parseInt(entry.HookStateKey.substring(58, 60), 16) > 0)
                ++acc.tickets![0][1];
              if (parseInt(entry.HookStateKey.substring(60, 62), 16) > 0)
                ++acc.tickets![0][2];
            }
          });
        }
      }
    } catch (error) {
      console.log('Hook state error tickets:', error);
    }
  }
}

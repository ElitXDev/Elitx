import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountState, OfferData } from 'src/app/interface';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants as GC } from '../../global-constants';
import { XService } from '../../services/x.service';
import * as xrpl from 'xrpl';
const shajs = require('sha.js');
import { AccountService } from 'src/app/services/account.service';

enum Role {
  borrower = 1,
  lender,
}

@Component({
  selector: 'app-take-loan',
  templateUrl: './take-loan.component.html',
  styleUrls: ['./take-loan.component.scss'],
})
export class TakeLoanComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  expandedElement!: OfferData | null;
  isLoading = false;
  readonly hookAddress = GC.hookAddress;
  readonly hookNamespace = GC.hookNamespace;
  runningOffers = [] as OfferData[];
  borrowerOffers = [] as OfferData[];
  lenderOffers = [] as OfferData[];
  failedTxs: string[] = [];
  readonly description = 'Description';
  readonly plain = 'text/plain';
  showCurrentLoans = false;
  offerMemoPrefix = '3';
  loanMemoPrefix = '4';
  filterValue = '';
  eleAnimation = 'expand_out_right';
  role = 1;
  dataSource = new MatTableDataSource(this.lenderOffers);
  readonly currencies = GC.currencies;
  readonly roles = GC.roles;
  acc = 0;
  readonly accs = [...this.accService.accounts];
  readonly hookAcc = GC.hookAddress;
  readonly offerCols = [
    'collateralAmount',
    'collateralCurrency',
    'loanAmount',
    'loanCurrency',
    'period',
    'interestRate',
    'interest',
    'expires',
  ];
  // SnackBar
  readonly addressSnackbarMessage = 'Address copied to the clipboard';
  readonly addressSnackbarAction = '';
  readonly addressSnackbarDuration = 3000;
  readonly errorSnackbarMessage = 'An error occured. Try again later.';
  readonly errorSnackbarAction = '';
  readonly errorSnackbarDuration = 3000;
  key = '';

  constructor(
    public snackBarService: SnackbarService,
    private x: XService,
    private accService: AccountService
  ) {}

  ngOnInit(): void {
    this.x.newOffer.subscribe((_) => this.getOffers());
  }

  async expand(data: OfferData) {
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

  cancelOffer(offer: OfferData) {
    this.sendTx('1', '2' + offer.key);
  }

  acceptOffer(offer: OfferData) {
    var amount;
    if (
      (offer.role == Role.borrower && offer.loanCurrency != 'XRP') ||
      (offer.role == Role.lender && offer.collateralCurrency != 'XRP')
    ) {
      amount =
        offer.role == Role.borrower
          ? {
              currency: offer.loanCurrency,
              value: offer.loanAmount + '',
              issuer: offer.loanCurrencyAddress,
            }
          : {
              currency: offer.collateralCurrency,
              value: offer.collateralAmount + '',
              issuer: offer.collateralCurrencyAddress,
            };
    } else
      amount =
        offer.role == Role.borrower
          ? xrpl.xrpToDrops(offer.loanAmount)
          : xrpl.xrpToDrops(offer.collateralAmount);
    this.sendTx(amount, '3' + offer.key);
  }

  repayLoan(offer: OfferData) {
    var amount =
      offer.loanCurrency != 'XRP'
        ? {
            currency: offer.loanCurrency,
            value: offer.loanAmount + '',
            issuer: offer.loanCurrencyAddress,
          }
        : xrpl.xrpToDrops(offer.loanAmount);
    this.sendTx(amount, '4' + offer.key);
  }

  closeLoan(offer: OfferData) {
    this.sendTx('1', '5' + offer.key);
  }

  resend() {
    this.sendTx('1', '6' + this.key);
  }

  async sendTx(amount: any, key: string) {
    this.isLoading = true;
    try {
      var preparedPayment: xrpl.Payment = await this.x.client.autofill({
        TransactionType: 'Payment',
        Account: this.accs[this.acc].address,
        Amount: amount,
        Destination: this.hookAcc,
        Fee: '100000',
        Memos: [
          {
            Memo: {
              MemoType: xrpl.convertStringToHex(this.description),
              MemoFormat: xrpl.convertStringToHex(this.plain),
              MemoData: xrpl.convertStringToHex(key),
            },
          },
        ],
      });
      var signed = this.accs[this.acc].wallet!.sign(preparedPayment);
      var submit = await this.x.client.submitAndWait(signed.tx_blob);
      if (
        typeof submit.result.meta! !== 'string' &&
        submit.result.meta!.TransactionResult == 'tesSUCCESS'
      ) {
        this.getOffers();
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
    this.isLoading = false;
  }

  async getOffers() {
    this.runningOffers = [];
    this.borrowerOffers = [];
    this.lenderOffers = [];
    this.failedTxs = [];
    try {
      var hash: string = shajs('sha256')
        .update(this.hookNamespace)
        .digest('hex')
        .toUpperCase();
      var state = (await this.x.client.request({
        command: 'account_namespace',
        account: this.hookAddress,
        namespace_id: hash,
      })) as AccountState;
      for (const loan of state.result.namespace_entries) {
        if (parseInt(loan.HookStateKey[63], 16) == 9) {
          // console.log('Failed Tx:', loan.HookStateKey, loan.HookStateData);
          this.failedTxs.push(loan.HookStateKey);
        } else if (parseInt(loan.HookStateKey[63], 16) == 8) {
          // console.log('Fee:', loan.HookStateKey, loan.HookStateData);
        } else if (parseInt(loan.HookStateKey[63], 16) == 7) {
          // console.log('State counter:', loan.HookStateKey, loan.HookStateData);
        } else {
          const offer = {
            key: loan.HookStateKey,
            state: parseInt(loan.HookStateData.substring(0, 2), 16),
            role: parseInt(loan.HookStateData.substring(2, 4), 16),
            returned: parseInt(loan.HookStateData.substring(4, 6), 16),
            loanCurrency:
              this.currencies[parseInt(loan.HookStateData.substring(6, 8), 16)]
                .name,
            collateralCurrency:
              this.currencies[parseInt(loan.HookStateData.substring(8, 10), 16)]
                .name,
            loanCurrencyAddress:
              this.currencies[parseInt(loan.HookStateData.substring(6, 8), 16)]
                .address,
            collateralCurrencyAddress:
              this.currencies[parseInt(loan.HookStateData.substring(8, 10), 16)]
                .address,
            period: parseInt(loan.HookStateData.substring(10, 18), 16),
            interestRate:
              parseInt(loan.HookStateData.substring(18, 26), 16) / 1000,
            loanAmount:
              parseInt(loan.HookStateData.substring(26, 42), 16) / 1000000,
            collateralAmount:
              parseInt(loan.HookStateData.substring(42, 58), 16) / 1000000,
            interest:
              parseInt(loan.HookStateData.substring(58, 74), 16) / 1000000,
            timestamp: parseInt(loan.HookStateData.substring(74, 90), 16),
            makerAccId: xrpl.encodeAccountID(
              Buffer.from(loan.HookStateData.substring(90, 130), 'hex')
            ),
            takerAccId: xrpl.encodeAccountID(
              Buffer.from(loan.HookStateData.substring(130, 170), 'hex')
            ),
            isExpired:
              parseInt(loan.HookStateData.substring(74, 90), 16) + 946684800 <
              Math.floor(Date.now() / 1000)
                ? true
                : false,
          };
          if (offer.state === 2) this.runningOffers.push(offer);
          else if (offer.role === Role.borrower)
            this.borrowerOffers.push(offer);
          else if (offer.role === Role.lender) this.lenderOffers.push(offer);
        }
      }
      this.updateTable();
    } catch (error: any) {
      this.snackBarService.openSnackBar(
        error,
        this.errorSnackbarAction,
        this.errorSnackbarDuration
      );
    }
  }

  async updateTable() {
    await new Promise((resolve) => setTimeout(resolve, 1));
    if (this.showCurrentLoans)
      this.dataSource = new MatTableDataSource(this.runningOffers);
    else if (this.role === Role.lender)
      this.dataSource = new MatTableDataSource(this.borrowerOffers);
    else if (this.role === Role.borrower)
      this.dataSource = new MatTableDataSource(this.lenderOffers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

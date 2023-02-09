import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AmmService } from 'src/app/services/amm.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import * as xrpl from 'xrpl';

@Component({
  selector: 'app-amm-auction',
  templateUrl: './amm-auction.component.html',
  styleUrls: ['./amm-auction.component.scss'],
})
export class AmmAuctionComponent implements OnInit {
  @Input() pool!: xrpl.AMMInfoResponse['result']['amm'];
  @Input() poolData = {} as any;
  mode = 0;
  modes = [
    [
      'Minimum Amount',
      'Pay at least this amount for the slot. Setting this value higher makes it harder for others to outbid you.',
    ],
    [
      'Maximum Amount',
      'Pay at most this amount for the slot. If the cost to win the bid is higher than this amount, the transaction fails.',
    ],
  ];
  currentPriceToWin = 0;
  payAmount = 0;
  tx = {} as xrpl.AMMBid;
  form = new FormGroup({
    Min: new FormControl(1, [
      Validators.required,
      Validators.min(0.000001),
      Validators.max(1000000000),
    ]),
    Max: new FormControl(1, [
      Validators.required,
      Validators.min(0.000001),
      Validators.max(1000000000),
    ]),
    Accounts: new FormControl(''),
  });

  constructor(private ammS: AmmService, private sb: SnackbarService) {}

  ngOnInit(): void {
    this.getForm();
    this.form.valueChanges.subscribe((v) => {
      if (this.form.valid) this.payAmount = this.mode ? v.Max! : v.Min!;
    });
    this.calcCurrentPriceToWin();
  }

  getForm() {
    setTimeout(() => {
      this.form.reset();
      this.form.disable();
      this.form.get('Accounts')?.enable();
      this.payAmount = 0;
      if (this.mode == 0) {
        this.form.get('Min')?.enable();
        this.form.get('Min')?.setValue(Math.ceil(this.currentPriceToWin));
      } else {
        this.form.get('Max')?.enable();
        this.form.get('Max')?.setValue(Math.ceil(this.currentPriceToWin));
      }
    }, 1);
  }

  calcCurrentPriceToWin() {
    const minBid = this.ammS.getValue(this.pool.lp_token) * 0.00001;
    const currentBid = this.ammS.getValue(this.pool.auction_slot!.price);
    const timeIntervall = Math.pow(
      this.pool.auction_slot!.time_interval * 0.05,
      60
    );
    this.currentPriceToWin = Math.max(
      currentBid * 1.05 * (1 - timeIntervall),
      minBid
    );
  }

  parseTx() {
    this.sb.openSnackBar(
      'Real transactions can be made as soon as we are live!'
    );
    this.tx = {
      Account: 'r...', // TODO: Add wallet
      TransactionType: 'AMMBid',
      Asset: this.ammS.getAsset(this.pool.amount),
      Asset2: this.ammS.getAsset(this.pool.amount2),
    };
    var accounts =
      this.form.value.Accounts?.replace(/\s/g, '').split(',') || [];
    if (accounts.length > 0) {
      this.tx.AuthAccounts = [];
      for (const a of accounts) {
        if (a.length > 0 && this.tx.AuthAccounts.length < 4)
          this.tx.AuthAccounts.push({
            AuthAccount: { Account: a },
          });
      }
    }
    switch (this.mode) {
      case 0:
        this.tx.BidMin = {
          value: this.payAmount + '',
          currency: this.pool.lp_token.currency,
          issuer: this.pool.lp_token.issuer,
        };
        break;
      case 1:
        this.tx.BidMax = {
          value: this.payAmount + '',
          currency: this.pool.lp_token.currency,
          issuer: this.pool.lp_token.issuer,
        };
        break;
    }
  }
}

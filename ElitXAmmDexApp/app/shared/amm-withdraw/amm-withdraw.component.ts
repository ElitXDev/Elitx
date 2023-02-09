import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AmmService } from 'src/app/services/amm.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import * as xrpl from 'xrpl';
import { Amount } from 'xrpl/dist/npm/models/common';

@Component({
  selector: 'app-amm-withdraw',
  templateUrl: './amm-withdraw.component.html',
  styleUrls: ['./amm-withdraw.component.scss'],
})
export class AmmWithdrawComponent {
  @Input() pool!: xrpl.AMMInfoResponse['result']['amm'];
  @Input() poolData = {} as any;
  form = new FormGroup({
    Amount: new FormControl(1, [
      Validators.required,
      Validators.min(0.000001),
      Validators.max(1000000000),
    ]),
    EPrice: new FormControl(1, [
      Validators.required,
      Validators.min(0.000001),
      Validators.max(1000000000),
    ]),
    LPTokenOut: new FormControl(1, [
      Validators.required,
      Validators.min(0.000001),
      Validators.max(1000000000),
    ]),
  });
  mode = 0;
  modes = [
    ['One Asset', 'I want to withdraw one asset'],
    ['Both Assets', 'I want to withdraw both assets'],
  ];
  txType = 0;
  txTypes: any = [
    [
      'Asset',
      'Withdraw exactly the specified amount of one asset, by returning as many LP Tokens as necessary',
      524288,
    ],
    [
      'LP Token',
      'Withdraw up to the specified amount of one asset, by returning up to the specified amount of LP Tokens.',
      2097152,
    ],
    [
      'Withdraw All',
      "Withdraw at least the specified amount of one asset, by returning all of your LP Tokens. Fails if you can't receive at least the specified amount. The specified amount can be 0, meaning the transaction succeeds if it withdraws any positive amount.",
      262144,
    ],
    [
      'Assets',
      "Withdraw both of this AMM's assets, in up to the specified amounts. The actual amounts received maintains the balance of assets in the AMM's pool.",
      1048576,
    ],
    [
      'LP Token',
      "Return the specified amount of LP Tokens and receive both assets from the AMM's pool in amounts based on the returned LP Tokens' share of the total LP Tokens issued.",
      65536,
    ],
    [
      'Withdraw All',
      "Return all of your LP Tokens and receive as much as you can of both assets in the AMM's pool.",
      131072,
    ],
  ];
  payAmount = 0;
  receiveAmount = 0;
  receiveAmount2 = 0;
  tx = {} as xrpl.AMMWithdraw;

  constructor(private ammS: AmmService, private sb: SnackbarService) {}

  ngOnInit(): void {
    this.getForm();
    this.form.valueChanges.subscribe((v) => {
      // console.log(this.form);
      if (this.form.valid || this.form.disabled) this.setUserInfo();
    });
  }

  getForm() {
    this.payAmount = 0;
    this.receiveAmount2 = 0;
    this.receiveAmount = 0;
    setTimeout(() => {
      if (this.mode) this.txType = this.txType < 3 ? 3 : this.txType;
      else this.txType = this.txType > 2 ? 0 : this.txType;
      this.form.reset();
      this.form.disable();
      if (this.txType == 0 || this.txType == 3) {
        this.form.get('Amount')?.enable();
      } else if (this.txType == 1 || this.txType == 4) {
        this.form.get('LPTokenOut')?.enable();
      }
    }, 1);
  }

  setUserInfo() {
    this.payAmount = 0;
    this.receiveAmount = 0;
    this.receiveAmount2 = 0;
    switch (this.txType) {
      case 0:
        this.payAmount =
          this.poolData.LPToken *
          (1 -
            Math.pow(
              1 -
                this.form.value.Amount! /
                  (this.poolData.Amount *
                    (1 - (1 - 0.5) * (this.poolData.TradingFee / 100))),
              0.5
            ));
        this.receiveAmount = this.form.value.Amount!;
        break;
      case 1:
        this.payAmount = this.form.value.LPTokenOut!;
        this.receiveAmount =
          this.poolData.Amount *
          (1 - Math.pow(1 - this.payAmount / this.poolData.LPToken, 1 / 0.5)) *
          (1 - (1 - 0.5) * (this.poolData.TradingFee / 100));
        break;
      case 2:
        this.payAmount = 10000; //TODO: Get all LP Tokens from wallet
        this.receiveAmount =
          this.poolData.Amount *
          (1 - Math.pow(1 - this.payAmount / this.poolData.LPToken, 1 / 0.5)) *
          (1 - (1 - 0.5) * (this.poolData.TradingFee / 100));
        break;
      case 3:
        this.payAmount =
          (this.poolData.LPToken / (this.poolData.Amount * 2)) *
          this.form.value.Amount! *
          2;
        this.receiveAmount = this.form.value.Amount!;
        this.receiveAmount2 =
          (this.form.value.Amount! / this.poolData.Amount) *
          this.poolData.Amount2;
        break;
      case 4:
        this.payAmount = this.form.value.LPTokenOut!;
        this.receiveAmount =
          (this.payAmount / this.poolData.LPToken) * this.poolData.Amount!;
        this.receiveAmount2 =
          (this.payAmount / this.poolData.LPToken) * this.poolData.Amount2!;
        break;
      case 5:
        this.payAmount = 257895.172765637; //TODO: Get all LP Tokens from wallet
        this.receiveAmount =
          (this.payAmount / this.poolData.LPToken) * this.poolData.Amount;
        this.receiveAmount2 =
          (this.payAmount / this.poolData.LPToken) * this.poolData.Amount2;
        break;
      default:
        break;
    }
  }

  parseTx() {
    this.sb.openSnackBar(
      'Real transactions can be made as soon as we are live!'
    );
    this.tx = {
      Account: 'r...', // TODO: Add wallet
      TransactionType: 'AMMWithdraw',
      Flags: this.txTypes[this.txType][2],
      Asset: this.ammS.getAsset(this.pool.amount),
      Asset2: this.ammS.getAsset(this.pool.amount2),
    };
    switch (this.txType) {
      case 0:
        this.tx.Amount = this.ammS.getAmount(
          this.tx.Asset,
          this.form.value.Amount!
        );
        break;
      case 1:
        this.tx.LPTokenIn = {
          value: this.payAmount + '',
          currency: this.pool.lp_token.currency,
          issuer: this.pool.lp_token.issuer,
        };
        this.tx.Amount = this.ammS.getMinAmount(
          this.tx.Asset,
          this.receiveAmount
        );
        break;
      case 2:
        this.tx.Amount = this.ammS.getMinAmount(
          this.tx.Asset,
          this.receiveAmount
        );
        break;
      case 3:
        this.tx.Amount = this.ammS.getAmount(this.tx.Asset, this.receiveAmount);
        this.tx.Amount2 = this.ammS.getMaxAmount(
          this.tx.Asset,
          this.receiveAmount2
        );
        break;
      case 4:
        this.tx.LPTokenIn = {
          value: this.form.value.LPTokenOut! + '',
          currency: this.pool.lp_token.currency,
          issuer: this.pool.lp_token.issuer,
        };
        break;
      default:
        break;
    }
  }
}

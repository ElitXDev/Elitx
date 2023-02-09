import { Component, Input, OnInit } from '@angular/core';
import { AmmService } from '../../services/amm.service';
import * as xrpl from 'xrpl';
import { SnackbarService } from '../../services/snackbar.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { XummService } from 'src/app/services/xumm.service';

@Component({
  selector: 'app-amm-deposit',
  templateUrl: './amm-deposit.component.html',
  styleUrls: ['./amm-deposit.component.scss'],
})
export class AmmDepositComponent implements OnInit {
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
    ['One Asset', 'I want to provide one asset'],
    ['Both Assets', 'I want to provide both assets'],
  ];
  txType = 0;
  txTypes: any = [
    [
      'Asset',
      'Deposit exactly the specified amount of one asset, and receive an amount of LP Tokens based on the resulting share of the pool (minus fees).',
      524288,
    ],
    [
      'LP Token',
      'Deposit up to the specified amount of one asset, so that you receive exactly the specified amount of LP Tokens in return (after fees).',
      2097152,
    ],
    [
      'Limit',
      'Deposit up to the specified amount of one asset, but pay no more than the specified effective price per LP Token (after fees).',
      4194304,
    ],
    [
      'Assets',
      "Deposit both of this AMM's assets, up to the specified amounts. The actual amounts deposited must maintain the same balance of assets as the AMM already holds, so the amount of either one deposited MAY be less than specified. The amount of LP Tokens you get in return is based on the total value deposited.",
      1048576,
    ],
    [
      'LP Token',
      "Deposit both of this AMM's assets, in amounts calculated so that you receive the specified amount of LP Tokens in return. The amounts deposited maintain the relative proportions of the two assets the AMM already holds.",
      65536,
    ],
  ];
  payAmount = 0;
  payAmount2 = 0;
  receiveAmount = 0;
  tx = {} as xrpl.AMMDeposit;

  constructor(private ammS: AmmService, private sb: SnackbarService) {}

  ngOnInit(): void {
    this.getForm();
    this.form.valueChanges.subscribe((v) => {
      if (this.form.valid) this.setUserInfo();
    });
  }

  getForm() {
    this.payAmount = 0;
    this.payAmount2 = 0;
    this.receiveAmount = 0;
    setTimeout(() => {
      if (this.mode) this.txType = this.txType < 3 ? 3 : this.txType;
      else this.txType = this.txType > 2 ? 0 : this.txType;
      this.form.reset();
      this.form.disable();
      if (this.txType == 0 || this.txType == 3) {
        this.form.get('Amount')?.enable();
      } else if (this.txType == 1) {
        this.form.get('LPTokenOut')?.enable();
      } else if (this.txType == 2) {
        this.form.get('Amount')?.enable();
        this.form.get('EPrice')?.enable();
      } else if (this.txType == 4) {
        this.form.get('Asset')?.disable();
        this.form.get('LPTokenOut')?.enable();
      }
    }, 1);
  }

  setUserInfo() {
    this.payAmount = 0;
    this.payAmount2 = 0;
    this.receiveAmount = 0;
    switch (this.txType) {
      case 0:
        this.receiveAmount =
          this.poolData.LPToken *
          (Math.pow(
            1 +
              (this.form.value.Amount! -
                (this.poolData.TradingFee / 100) *
                  0.5 *
                  this.form.value.Amount!) /
                this.poolData.Amount,
            0.5
          ) -
            1);
        this.payAmount = this.form.value.Amount!;
        break;
      case 1:
        this.receiveAmount = this.form.value.LPTokenOut!;
        this.payAmount =
          ((Math.pow(
            this.form.value.LPTokenOut! / this.poolData.LPToken + 1,
            1 / 0.5
          ) -
            1) /
            (1 - (this.poolData.TradingFee / 100) * 0.5)) *
          this.poolData.Amount;
        break;
      case 2:
        this.receiveAmount =
          this.poolData.LPToken *
          (Math.pow(
            1 +
              (this.form.value.Amount! -
                (this.poolData.TradingFee / 100) *
                  0.5 *
                  this.form.value.Amount!) /
                this.poolData.Amount,
            0.5
          ) -
            1);
        this.payAmount = this.form.value.Amount!;
        break;
      case 3:
        this.receiveAmount =
          (this.poolData.LPToken / (this.poolData.Amount * 2)) *
          this.form.value.Amount! *
          2;
        this.payAmount = this.form.value.Amount!;
        this.payAmount2 =
          (this.form.value.Amount! / this.poolData.Amount) *
          this.poolData.Amount2;
        break;
      case 4:
        this.receiveAmount = this.form.value.LPTokenOut!;
        this.payAmount =
          (this.form.value.LPTokenOut! / this.poolData.LPToken) *
          this.poolData.Amount;
        this.payAmount2 =
          (this.form.value.LPTokenOut! / this.poolData.LPToken) *
          this.poolData.Amount2;
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
      TransactionType: 'AMMDeposit',
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
        this.tx.LPTokenOut = {
          value: this.form.value.LPTokenOut! + '',
          currency: this.pool.lp_token.currency,
          issuer: this.pool.lp_token.issuer,
        };
        this.tx.Amount = this.ammS.getMaxAmount(this.tx.Asset, this.payAmount);
        break;
      case 2:
        this.tx.Amount = this.ammS.getAmount(this.tx.Asset, this.payAmount);
        this.tx.EPrice = this.ammS.getAmount(
          this.tx.Asset,
          this.form.value.EPrice!
        );
        break;
      case 3:
        this.tx.Amount = this.ammS.getAmount(this.tx.Asset, this.payAmount);
        this.tx.Amount2 = this.ammS.getMaxAmount(
          this.tx.Asset,
          this.payAmount2
        );
        break;
      case 4:
        this.tx.LPTokenOut = {
          value: this.form.value.LPTokenOut! + '',
          currency: this.pool.lp_token.currency,
          issuer: this.pool.lp_token.issuer,
        };
        break;
      default:
        break;
    }
    // this.xummService.sendPayload({
    //   TransactionType: 'Payment',
    //   Amount: '1000000',
    //   Destination: 'rBkMusgy38X6aiPtA44iUo4xejgjuDXbwj',
    // });
  }
}

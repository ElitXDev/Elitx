import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AmmService } from 'src/app/services/amm.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import * as xrpl from 'xrpl';

@Component({
  selector: 'app-amm-swap',
  templateUrl: './amm-swap.component.html',
  styleUrls: ['./amm-swap.component.scss'],
})
export class AmmSwapComponent implements OnInit {
  @Input() pool!: xrpl.AMMInfoResponse['result']['amm'];
  @Input() poolData = {} as any;
  form = new FormGroup({
    Amount: new FormControl(1, [
      Validators.required,
      Validators.min(0.00001),
      Validators.max(1000000000),
    ]),
  });
  payAmount = 0;
  receiveAmount = 0;
  tx = {} as xrpl.Payment;

  constructor(private ammS: AmmService, private sb: SnackbarService) {}

  ngOnInit() {
    this.form.valueChanges.subscribe((v) => {
      if (this.form.valid) this.setUserInfo();
    });
    this.setUserInfo();
  }

  setUserInfo() {
    this.payAmount = this.form.value.Amount!;

    this.receiveAmount =
      this.poolData.Amount2 *
      (1 -
        this.poolData.Amount /
          (this.poolData.Amount +
            this.payAmount * (1 - this.poolData.TradingFee / 100)));
  }

  parseTx() {
    this.sb.openSnackBar(
      'Real transactions can be made as soon as we are live!'
    );
    this.tx = {
      Account: 'r...', // TODO: Add wallet
      Destination: this.pool.amm_account,
      TransactionType: 'Payment',
      Flags: 262144,
      Amount: this.ammS.getAmount(
        this.ammS.getAsset(this.pool.amount2),
        this.receiveAmount
      ),
      SendMax: this.ammS.getAmount(
        this.ammS.getAsset(this.pool.amount),
        this.payAmount
      ),
    };
  }
}

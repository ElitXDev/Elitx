import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AmmService } from 'src/app/services/amm.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import * as xrpl from 'xrpl';

@Component({
  selector: 'app-amm-create',
  templateUrl: './amm-create.component.html',
  styleUrls: ['./amm-create.component.scss'],
})
export class AmmCreateComponent {
  @Input() asset = {} as xrpl.AMMDeposit['Asset'];
  @Input() asset2 = {} as xrpl.AMMDeposit['Asset'];
  form = new FormGroup({
    Amount: new FormControl(1, [
      Validators.required,
      Validators.min(0.000001),
      Validators.max(1000000000),
    ]),
    Amount2: new FormControl(1, [
      Validators.required,
      Validators.min(0.000001),
      Validators.max(1000000000),
    ]),
    Fee: new FormControl(0.5, [
      Validators.required,
      Validators.min(0.001),
      Validators.max(1),
    ]),
  });
  tx = {} as xrpl.AMMCreate;

  constructor(private ammS: AmmService, private sb: SnackbarService) {}

  parseTx() {
    this.sb.openSnackBar(
      'Real transactions can be made as soon as we are live!'
    );
    this.tx = {
      Account: 'r...', // TODO: Add wallet
      TransactionType: 'AMMCreate',
      Amount: this.ammS.getAmount(this.asset, this.form.value.Amount!),
      Amount2: this.ammS.getAmount(this.asset2, this.form.value.Amount2!),
      TradingFee: this.form.value.Fee!,
    };
  }
}

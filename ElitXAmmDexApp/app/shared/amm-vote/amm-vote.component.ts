import { Component, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AmmService } from 'src/app/services/amm.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import * as xrpl from 'xrpl';

@Component({
  selector: 'app-amm-vote',
  templateUrl: './amm-vote.component.html',
  styleUrls: ['./amm-vote.component.scss'],
})
export class AmmVoteComponent {
  @Input() pool!: xrpl.AMMInfoResponse['result']['amm'];
  @Input() poolData = {} as any;
  form = new FormGroup({
    Fee: new FormControl(0.5, [
      Validators.required,
      Validators.min(0.001),
      Validators.max(1),
    ]),
  });

  tx = {} as xrpl.AMMVote;

  constructor(private ammS: AmmService, private sb: SnackbarService) {}

  parseTx() {
    this.sb.openSnackBar(
      'Real transactions can be made as soon as we are live!'
    );
    this.tx = {
      Account: 'r...', // TODO: Add wallet
      TransactionType: 'AMMVote',
      Asset: this.ammS.getAsset(this.pool.amount),
      Asset2: this.ammS.getAsset(this.pool.amount2),
      TradingFee: this.form.value.Fee!,
    };
  }
}

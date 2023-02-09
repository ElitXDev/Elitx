import { Component } from '@angular/core';

@Component({
  selector: 'app-funds-disclaimer',
  templateUrl: './funds-disclaimer.component.html',
  styleUrls: ['./funds-disclaimer.component.scss'],
})
export class FundsDisclaimerComponent {
  visible = true;
  text =
    'This is an early beta release on the AMM testnet. DO NOT MAKE REAL TRANSACTIONS TO ANY OF THE ADDRESSES SHOWN! Only use the one-click sending method.';
  eleAnimation = '';

  async invisible() {
    this.eleAnimation = 'expand_out';
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.visible = false;
  }
}

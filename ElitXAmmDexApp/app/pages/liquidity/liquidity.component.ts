import { Component, OnInit } from '@angular/core';
import { AmmService } from '../../services/amm.service';
import * as xrpl from 'xrpl';
import { Pools as P } from '../../pairs/pools';
import { Tokens as T } from '../../pairs/tokens';
import { HttpService } from '../../services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-liquidity',
  templateUrl: './liquidity.component.html',
  styleUrls: ['./liquidity.component.scss'],
})
export class LiquidityComponent implements OnInit {
  tokens = T.tokens;
  filteredTokens!: Observable<typeof this.tokens>;
  pools = P.pools;
  connected = false;
  showApp = -1;
  assets = [...this.pools[0]];
  pool!: xrpl.AMMInfoResponse['result']['amm'];
  poolData = {} as any;
  buttonNames = [
    'Provide Liquidity',
    'Redeem LP-Token',
    'Swap Assets',
    'Vote',
    'Auction',
  ];
  constructor(
    private ammS: AmmService,
    private sb: SnackbarService /*private httpS: HttpService*/
  ) {}

  ngOnInit(): void {
    this.ammS.connected$.subscribe((value) => {
      this.connected = value;
      if (this.connected) this.getPool();
    });
    // this.httpS.getTokenList();
  }

  compareObjects(o1: any, o2: any) {
    return o1.currency == o2.currency && o1.issuer == o2.issuer;
  }

  async getPool() {
    if (
      this.assets[0]?.currency == this.assets[1]?.currency &&
      'issuer' in this.assets[0]! &&
      'issuer' in this.assets[1]! &&
      this.assets[0]?.issuer == this.assets[1]?.issuer
    ) {
      this.sb.openSnackBar('Please choose different assets');
      return;
    }
    setTimeout(async () => {
      try {
        var tmp = this.showApp;
        this.showApp = 0;
        this.pool = await this.ammS.getPool(this.assets[0], this.assets[1]);
        this.poolData = this.ammS.getPoolData(this.pool);
        if (tmp < 1 || tmp == 6) this.showApp = 1;
        else this.showApp = tmp;
        this.sb.openSnackBar('Pool updated');
      } catch (error) {
        this.showApp = 6;
      }
    }, 1);
  }

  swap() {
    [this.assets[0], this.assets[1]] = [this.assets[1], this.assets[0]];
    this.getPool();
  }
}

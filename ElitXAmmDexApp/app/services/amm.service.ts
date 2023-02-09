import { Injectable } from '@angular/core';
// import { IAMMData } from '../interfaces/interface';
import * as xrpl from 'xrpl';
import { BehaviorSubject, of } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { Pools as P } from '../pairs/pools';

@Injectable({
  providedIn: 'root',
})
export class AmmService {
  ammClient = new xrpl.Client('wss://amm.devnet.rippletest.net:51233');
  // pools = P.pools;
  poolData = {} as any;
  // private _amms: xrpl.AMMInfoResponse['result']['amm'][] = [];
  readonly amms$ = new BehaviorSubject<xrpl.AMMInfoResponse['result']['amm'][]>(
    []
  );
  readonly connected$ = new BehaviorSubject(false);

  constructor(private snackBarService: SnackbarService) {
    this.connect();
  }

  async connect() {
    try {
      if (!this.ammClient.isConnected()) {
        this.ammClient.on('disconnected', (msg) => {
          console.log('AMM-Socket-Disconnected:', msg);
          this.connected$.next(false);
          this.reconnect();
        });
        this.ammClient.on('error', (e) => {
          console.log('AMM-Socket-Error:', e);
          this.connected$.next(false);
          this.reconnect();
        });
        this.ammClient.on('connected', () => {
          console.log('AMM-Socket is connected');
          this.connected$.next(true);
          // this.fetchAllPools();
        });
        // this.ammClient.on('transaction', (msg) => {
        //   console.log('AMM-Socket transaction:', msg);
        // });
        await this.ammClient.connect();
      }
    } catch (e) {
      console.log('AMM-Socket-Connect-Error:', e);
    }
  }

  // async fetchAllPools() {
  //   try {
  //     for (const pool of this.pools) {
  //       const req: xrpl.AMMInfoRequest = {
  //         command: 'amm_info',
  //         asset: pool[0],
  //         asset2: pool[1],
  //       };
  //       this._amms.push((await this.ammClient.request(req)).result.amm);
  //     }
  //     this.amms$.next(this._amms);
  //   } catch (error: any) {
  //     throw error;
  //   }
  // }

  async getPool(
    asset: xrpl.AMMInfoRequest['asset'],
    asset2: xrpl.AMMInfoRequest['asset2']
  ) {
    try {
      const req: xrpl.AMMInfoRequest = {
        command: 'amm_info',
        asset: asset,
        asset2: asset2,
      };
      return (await this.ammClient.request(req)).result.amm;
    } catch (error: any) {
      throw error;
    }
  }

  // async getRatio(idx: number) {
  //   try {
  //     if (this._amms[idx].ratio.length) return;
  //     // var ledgerIndex = (await this.ammClient.getLedgerIndex()) - 10;
  //     while (this._amms[idx].ratio.length < 14) {
  //       const req: xrpl.AMMInfoRequest = {
  //         command: 'amm_info',
  //         asset: this.pools[idx][0],
  //         asset2: this.pools[idx][1],
  //         // ledger_index: ledgerIndex,
  //       };
  //       // ledgerIndex -= 1000; //20000;
  //       var res = (await this.ammClient.request(req)).result.amm;
  //       var am1 =
  //         typeof res.Amount == 'string'
  //           ? +res.Amount
  //           : +res.Amount.value * 1000000;
  //       var am2 =
  //         typeof res.Amount2 == 'string'
  //           ? +res.Amount2
  //           : +res.Amount2.value * 1000000;
  //       this._amms[idx].ratio.push(am1 / am2);
  //       this.amms$.next(this._amms);
  //     }
  //   } catch (e) {}
  // }

  // async fetchOrders() {
  //   while (1) {
  //     var req: xrpl.BookOffersRequest = {
  //       command: 'book_offers',
  //       taker_pays: this.asset1,
  //       taker_gets: this.asset2,
  //       limit: 30,
  //     };
  //     this.buyOrders.next(await this.ammClient.request(req));
  //     req.taker_pays = this.asset2;
  //     req.taker_gets = this.asset1;
  //     this.sellOrders.next(await this.ammClient.request(req));
  //     await new Promise((resolve) => setTimeout(resolve, 1000000));
  //   }
  // }

  getPoolData(pool: any) {
    return {
      Asset: this.getCurrencyCode(pool.amount),
      Asset2: this.getCurrencyCode(pool.amount2),
      Amount: this.getValue(pool.amount),
      Amount2: this.getValue(pool.amount2),
      Issuer: this.getIssuer(pool.amount),
      Issuer2: this.getIssuer(pool.amount2),
      LPToken: this.getValue(pool.lp_token),
      TradingFee: pool.trading_fee / 1000,
    };
  }
  getAmount(
    asset: xrpl.AMMDeposit['Asset'],
    amt: number
  ): xrpl.Payment['Amount'] {
    if ('issuer' in asset) return { value: amt + '', ...asset };
    else return amt * 1000000 + '';
  }
  getMinAmount(
    asset: xrpl.AMMDeposit['Asset'],
    amt: number
  ): xrpl.Payment['Amount'] {
    if ('issuer' in asset) return { value: amt * 0.99 + '', ...asset };
    else return amt * 0.99 * 1000000 + '';
  }
  getMaxAmount(
    asset: xrpl.AMMDeposit['Asset'],
    amt: number
  ): xrpl.Payment['Amount'] {
    if ('issuer' in asset) return { value: amt * 1.01 + '', ...asset };
    else return amt * 1.01 * 1000000 + '';
  }
  getAsset(amt: xrpl.Payment['Amount']): xrpl.AMMDeposit['Asset'] {
    if (typeof amt == 'string') return { currency: 'XRP' };
    else return { currency: amt.currency, issuer: amt.issuer };
  }
  getCurrencyCode(amt: xrpl.Payment['Amount']): string {
    return typeof amt == 'string' ? 'XRP' : amt.currency;
  }
  getValue(amt: xrpl.Payment['Amount']): number {
    return typeof amt == 'string' ? +amt / 1000000 : +amt.value;
  }
  getIssuer(amt: xrpl.Payment['Amount']): string | undefined {
    return typeof amt == 'string' ? undefined : amt.issuer;
  }

  async reconnect() {
    while (!this.ammClient.isConnected()) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await this.ammClient.connect();
    }
  }
}

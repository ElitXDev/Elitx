import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import * as xrpl from 'xrpl';
import { Accs } from '../interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  names = ['Alice', 'Bob', 'Chris', 'David'];
  accs = [] as Accs[];
  public ready = new BehaviorSubject(this.accs);

  constructor(private http: HttpService) {}

  async createAccount(seeds: string[]) {
    this.accs = [];
    try {
      if (seeds.length != 4) seeds = (await this.http.getCreds()).seeds;
      for (const seed of seeds) {
        this.accs.push({
          name: this.names[this.accs.length],
          id: this.accs.length,
          balances: [],
          wallet: xrpl.Wallet.fromSeed(seed),
          address: xrpl.Wallet.fromSeed(seed).classicAddress,
        });
        window.localStorage.setItem('w' + (this.accs.length - 1), seed);
      }
      this.ready.next(this.accs);
    } catch (error: any) {
      console.log(error);
    }
  }

  get accounts() {
    return this.accs;
  }
}

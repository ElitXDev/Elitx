import { Injectable } from '@angular/core';
import * as xrpl from 'xrpl';
import { BehaviorSubject } from 'rxjs';
import { Tokens as T } from '../pairs/tokens';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  bookClient = new xrpl.Client('wss://xrplcluster.com');
  buyOrders = new BehaviorSubject({} as xrpl.BookOffersResponse);
  sellOrders = new BehaviorSubject({} as xrpl.BookOffersResponse);
  tokens = T.tokens;
  asset1 = this.tokens[0];
  asset2 = this.tokens[1];

  constructor() {
    this.connect();
  }

  async connect() {
    try {
      if (!this.bookClient.isConnected()) {
        this.bookClient.on('disconnected', (msg) => {
          console.log('Book-Socket-Disconnected:', msg);
          this.reconnect();
        });
        this.bookClient.on('error', (e) => {
          console.log('Book-Socket-Error:', e);
          this.reconnect();
        });
        this.bookClient.on('connected', () => {
          // console.log('Book-Socket is connected');
          // this.fetchOrders();
        });
        // this.bookClient.on('transaction', (msg) => {
        //   console.log('Book-Socket transaction:', msg);
        // });
        this.bookClient.connect();
      }
    } catch (e) {
      console.log('Book-Socket-Connect-Error:', e);
    }
  }

  async fetchOrders() {
    // while (1) {
    //   var req: xrpl.BookOffersRequest = {
    //     command: 'book_offers',
    //     taker_pays: this.asset1,
    //     taker_gets: this.asset2,
    //     limit: 30,
    //   };
    //   this.buyOrders.next(await this.bookClient.request(req));
    //   req.taker_pays = this.asset2;
    //   req.taker_gets = this.asset1;
    //   this.sellOrders.next(await this.bookClient.request(req));
    //   await new Promise((resolve) => setTimeout(resolve, 1000000));
    // }
  }

  async reconnect() {
    while (!this.bookClient.isConnected()) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await this.bookClient.connect();
    }
  }
}

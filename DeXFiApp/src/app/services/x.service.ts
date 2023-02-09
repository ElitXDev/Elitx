import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as xrpl from 'xrpl';

@Injectable({
  providedIn: 'root',
})
export class XService {
  public connected = new BehaviorSubject(false);
  public newOffer = new BehaviorSubject(false);
  public newNFTOfferId = new BehaviorSubject('');
  client = new xrpl.Client('wss://hooks-testnet-v2.xrpl-labs.com');
  constructor() {}

  connect() {
    try {
      this.client.on('disconnected', (msg) => {
        console.log('Socket-Disconnected:', msg);
        this.connected.next(false);
        this.client.connect();
      });
      this.client.on('error', (msg) => {
        console.log('Socket-Error:', msg);
        this.connected.next(false);
        this.client.connect();
      });
      this.client.on('connected', () => {
        console.log('Socket-Connected');
        this.connected.next(true);
      });
      if (!this.client.isConnected()) {
        console.log('Socket-Connect');
        this.client.connect();
      } else {
        console.log('Socket-Already-Connected');
        this.connected.next(true);
      }
    } catch (error) {
      console.log('Socket-Error:', error);
    }
  }

  disconnect() {
    console.log('Socket-Disconnect');
    this.client.disconnect();
  }

  setNewOffer() {
    this.newOffer.next(true);
  }

  setNewNFTOfferId(id: string) {
    this.newNFTOfferId.next(id);
  }
}

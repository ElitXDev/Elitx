import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as xrpl from 'xrpl';
import { INetwork } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class XService {
  client!: xrpl.Client;
  balances: Array<{
    value: string;
    currency: string;
    issuer?: string | undefined;
  }> = [];
  _networks: INetwork[] = [
    {
      name: 'Mainnet',
      address: 'wss://xrplcluster.com',
      explorerAddress: 'https://mainnet.xrpl.org/accounts/',
    },
    {
      name: 'Testnet',
      address: 'wss://s.altnet.rippletest.net:51233',
      explorerAddress: 'https://testnet.xrpl.org/accounts/',
    },
    {
      name: 'Devnet',
      address: 'wss://s.devnet.rippletest.net:51233',
      explorerAddress: 'https://devnet.xrpl.org/accounts/',
    },
    {
      name: 'NFT-Devnet',
      address: 'wss://xls20-sandbox.rippletest.net:51233',
      explorerAddress: 'https://nft-devnet.xrpl.org/accounts/',
    },
    {
      name: 'AMM-Devnet',
      address: 'wss://amm.devnet.rippletest.net:51233',
      explorerAddress: 'https://amm-devnet.xrpl.org/accounts/', // FAUCET: https://ammfaucet.devnet.rippletest.net/
    },
    {
      name: 'Hooks-Testnet',
      address: 'wss://hooks-testnet-v2.xrpl-labs.com',
      explorerAddress: 'https://hooks-testnet-v2-explorer.xrpl-labs.com/',
    },
  ];
  public network = new BehaviorSubject(this._networks[0]);
  public connected = new BehaviorSubject(false);

  constructor() {}

  get networks() {
    return this._networks;
  }

  async getBalances(address: string) {
    this.balances = await this.client.getBalances(address);
    for (var b of this.balances) {
      if (b.currency.length != 3)
        b.currency = xrpl.convertHexToString(b.currency);
    }
    return this.balances;
  }

  async connect(idx: number) {
    try {
      if (this.client?.isConnected()) {
        await this.client.disconnect();
        this.connected.next(false);
      }
      this.client = new xrpl.Client(this._networks[idx].address);
      this.network.next(this._networks[idx]);
      this.client.on('disconnected', (msg) => {
        console.log('Socket-Disconnected:', msg);
        this.connected.next(false);
        setTimeout(() => this.client.connect(), 1000);
      });
      this.client.on('error', async (msg) => {
        console.log('Socket-Error:', msg);
        this.connected.next(false);
        setTimeout(() => this.client.connect(), 1000);
      });
      this.client.on('connected', () => {
        this.connected.next(true);
      });
      if (!this.client.isConnected()) await this.client.connect();
      else this.connected.next(true);
    } catch (error) {
      console.log('Socket-Error:', error);
    }
  }

  async disconnect() {
    this.connected.next(false);
    try {
      await this.client.disconnect();
    } catch (error) {
      console.log(error);
    }
  }
}

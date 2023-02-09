import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url = 'https://api.ripplecharts.com';
  options = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
    },
  }; // /api/exchange_rates /api/offers /api/account_offers_exercised

  constructor(private http: HttpClient) {}

  // async getCreds() {
  //   try {
  //     return await lastValueFrom(this.http.post(this.url /*, this.options*/));
  //   } catch (error: any) {
  //     console.log('HTTP:', error['statusText']);
  //     return { seeds: [] };
  //   }
  // }
  async getTokenList() {
    try {
      var tokenList = [];
      const tokens: [] = (
        await lastValueFrom<any>(
          this.http.get('https://api.onthedex.live/public/v1/daily/tokens')
        )
      ).tokens;
      console.log(tokens);
      for (const t of tokens) {
        //{ currency: 'USD', issuer: 'r9mPBSygJeYxqzha5gCPQaVSXfx1nVf2pV' },
        tokenList.push({ currency: t['currency'] });
      }
      console.log(tokenList);
      return [];
    } catch (e) {
      return [];
    }
  }
}

import * as xrpl from 'xrpl';
import { Amount } from 'xrpl/dist/npm/models/common';

export class Xclient extends xrpl.Client {
  constructor(server: string, options?: xrpl.ClientOptions | undefined) {
    super(server, options);
  }

  getCurrencyCode(amount: Amount) {
    return typeof amount == 'string' ? 'XRP' : amount.currency;
  }
  getValue(amount: Amount): number {
    return typeof amount == 'string' ? +amount / 1000000 : +amount.value;
  }
  getIssuer(amount: Amount): string | undefined {
    return typeof amount == 'string' ? undefined : amount.issuer;
  }
}

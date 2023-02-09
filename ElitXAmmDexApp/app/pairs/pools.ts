import * as xrpl from 'xrpl';

export class Pools {
  public static readonly pools: xrpl.AMMInfoRequest['asset'][][] = [
    [
      { currency: 'XRP' },
      { currency: 'USD', issuer: 'rKniUPCvcZa4YuMwyBKHHBMcnVndHwJ2A1' },
    ],
    [
      { currency: 'XRP' },
      { currency: 'EUR', issuer: 'rKniUPCvcZa4YuMwyBKHHBMcnVndHwJ2A1' },
    ],
    [
      { currency: 'XRP' },
      { currency: 'BTC', issuer: 'rKniUPCvcZa4YuMwyBKHHBMcnVndHwJ2A1' },
    ],
    [
      { currency: 'XRP' },
      { currency: 'ETH', issuer: 'rKniUPCvcZa4YuMwyBKHHBMcnVndHwJ2A1' },
    ],
  ];
}

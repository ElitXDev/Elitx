import * as xrpl from 'xrpl';

export class Tokens {
  public static readonly tokens: xrpl.AMMInfoRequest['asset'][] = [
    { currency: 'XRP' },
    { currency: 'USD', issuer: 'rKniUPCvcZa4YuMwyBKHHBMcnVndHwJ2A1' },
    { currency: 'EUR', issuer: 'rKniUPCvcZa4YuMwyBKHHBMcnVndHwJ2A1' },
    { currency: 'ETH', issuer: 'rKniUPCvcZa4YuMwyBKHHBMcnVndHwJ2A1' },
    { currency: 'BTC', issuer: 'rKniUPCvcZa4YuMwyBKHHBMcnVndHwJ2A1' },
    // { currency: 'USD', issuer: 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq' },
    // { currency: 'EUR', issuer: 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq' },
    // { currency: 'SOLO', issuer: 'rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz' },
    // { currency: 'CORE', issuer: 'rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz' },
    // { currency: 'USD', issuer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B' },
    // { currency: 'USDC', issuer: 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq' },
  ];
}

import * as xrpl from 'xrpl';

export interface IOffersExercised {
  startTime: Date;
  endTime: Date;
  base: xrpl.BookOffersRequest['taker_gets'];
  counter: xrpl.BookOffersRequest['taker_gets'];
  timeIncrement: string;
  timeMultiple: number;
  results: Result[];
}

export interface Result {
  startTime: Date;
  openTime: Date;
  closeTime: Date;
  baseVolume: number;
  counterVolume: number;
  count: number;
  open: number;
  high: number;
  low: number;
  close: number;
  vwap: number;
  partial: boolean;
}

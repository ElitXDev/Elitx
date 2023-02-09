import { Injectable } from '@angular/core';
import { IMenuItem } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  menuItems: IMenuItem[] = [
    {
      label: 'Liquidity',
      icon: 'join_right',
      route: 'liquidity',
    },
    {
      label: 'Trade',
      icon: 'candlestick_chart',
      route: 'trade',
    },
    // {
    //   label: 'Swap',
    //   icon: 'currency_exchange',
    //   route: 'swap',
    // },
  ];

  constructor() {}

  public get items() {
    return this.menuItems;
  }
}

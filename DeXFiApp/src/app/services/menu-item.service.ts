import { Injectable } from '@angular/core';
import { MenuItem } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  menuItems: MenuItem[] = [
    {
      label: 'Loans',
      icon: 'credit_score',
      route: 'loan',
    },
    {
      label: 'Launchpad',
      icon: 'rocket_launch',
      route: 'launchpad',
    },
    {
      label: 'Lottery',
      icon: 'emoji_events',
      route: 'lottery',
    },
    {
      label: 'Ticket',
      icon: 'stadium',
      route: 'ticket',
    },
  ];

  constructor() {}

  public get items() {
    return this.menuItems;
  }
}

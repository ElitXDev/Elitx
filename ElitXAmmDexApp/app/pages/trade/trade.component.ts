import { Component, OnInit } from '@angular/core';
import { TradeService } from '../../services/trade.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
})
export class TradeComponent implements OnInit {
  constructor(private trade: TradeService) {}

  ngOnInit(): void {
    this.trade.buyOrders.subscribe((v) => console.log('Buy:', v));
    this.trade.sellOrders.subscribe((v) => console.log('Sell:', v));
  }
}

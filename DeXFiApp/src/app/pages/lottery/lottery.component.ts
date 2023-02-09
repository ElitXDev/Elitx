import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { XService } from 'src/app/services/x.service';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss'],
})
export class LotteryComponent implements OnInit {
  title = 'DeXentralized Lottery';
  desc = 'It has never been so safe and easy to win a prize';
  connected = false;
  ready = false;

  constructor(private accService: AccountService, private x: XService) {}

  ngOnInit(): void {
    this.x.connected.subscribe((value) => (this.connected = value));
    this.accService.ready.subscribe((_) => (this.ready = true));
  }

  retry() {
    if (!this.connected) this.x.connect();
    if (!this.ready) this.accService.createAccount([]);
  }
}

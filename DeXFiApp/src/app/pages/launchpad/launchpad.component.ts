import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { XService } from 'src/app/services/x.service';

@Component({
  selector: 'app-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss'],
})
export class LaunchpadComponent implements OnInit {
  title = 'Launchpad';
  desc = 'Invest in the best XRPL-based projects';
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

import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { XService } from 'src/app/services/x.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  title = 'Tickets';
  desc = 'The easiest way to your ticket';
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

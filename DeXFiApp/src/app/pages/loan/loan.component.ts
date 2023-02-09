import { Component, OnInit } from '@angular/core';
import { async, firstValueFrom } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { XService } from 'src/app/services/x.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
})
export class LoanComponent implements OnInit {
  title = 'Your Loan - Your Terms';
  desc = 'It has never been so safe and easy to get a loan';
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

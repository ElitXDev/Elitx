import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  async retry() {
    for (var i = 0; i < 4; i++) window.localStorage.removeItem('w' + i);
    // window.localStorage.removeItem('cookiesConsent');
    // await this.accountService.createAccount([]);
    // await new Promise((r) => setTimeout(r, 4000));
    // console.log('RE');
    // location.reload();
  }
}

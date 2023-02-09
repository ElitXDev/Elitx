import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-cookie-dialog',
  templateUrl: './cookie-dialog.component.html',
  styleUrls: ['./cookie-dialog.component.scss'],
})
export class CookieDialogComponent implements OnInit {
  message =
    'This website uses cookies to ensure you get the best experience on our website.';

  constructor(private dialogRef: MatDialogRef<CookieDialogComponent>) {
    dialogRef.disableClose = true;
    // this.dialogRef.updatePosition({ bottom: '10px', right: '10px' });
  }

  ngOnInit(): void {}

  public close(value = true) {
    window.localStorage.setItem('cookiesConsent', 'true');
    this.dialogRef.close(value);
  }
}

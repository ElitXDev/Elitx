import { Component, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-donation-dialog',
  templateUrl: './donation-dialog.component.html',
  styleUrls: ['./donation-dialog.component.scss'],
})
export class DonationDialogComponent {
  donationAddress = 'rSHn6f85TaKrrLurnQVjZ3oJqKvfUWyMo';
  donationTitle = 'Donation address:';
  donationSubtitle = 'Thank you for your tip.';
  donationThanks = 'I very much appreciate you!';
  tooltipShowDelay = 500;
  tooltipHideDelay = 0;
  qrLevel = 'Q';
  qrSize = 150;
  addressQrTooltip = 'Copy to the clipboard';
  addressSnackbarMessage = 'Address copied to the clipboard';
  addressSnackbarAction = '';
  addressSnackbarDuration = 3000;

  constructor(
    private dialogRef: MatDialogRef<DonationDialogComponent>,
    public dialogService: DialogService,
    public snackBarService: SnackbarService
  ) {
    // dialogRef.disableClose = true;
  }

  public cancel() {
    this.close(false);
  }

  public close(value = true) {
    this.dialogRef.close(value);
  }
  public confirm() {
    this.dialogRef.close(true);
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close(false);
  }

  save() {
    this.dialogRef.close(/* this.form.value */);
  }
}

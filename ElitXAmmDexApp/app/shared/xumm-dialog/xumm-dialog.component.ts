import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-xumm-dialog',
  templateUrl: './xumm-dialog.component.html',
  styleUrls: ['./xumm-dialog.component.scss'],
})
export class XummDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<XummDialogComponent>,
    public dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: { always: string; qr: string }
  ) {}

  public close() {
    this.dialogRef.close();
  }
}

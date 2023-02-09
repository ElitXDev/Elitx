import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DonationDialogComponent } from '../shared/donation-dialog/donation-dialog.component';
import { VideoDialogComponent } from '../shared/video-dialog/video-dialog.component';
import { AccountDialogComponent } from '../shared/account-dialog/account-dialog.component';
import { XummDialogComponent } from '../shared/xumm-dialog/xumm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  // errorDialogRef!: MatDialogRef<ErrorDialogComponent>;
  donationDialogRef!: MatDialogRef<DonationDialogComponent>;
  // cookieDialogRef!: MatDialogRef<CookieDialogComponent>;
  videoDialogRef!: MatDialogRef<VideoDialogComponent>;
  accountDialogRef!: MatDialogRef<AccountDialogComponent>;
  xummDialogRef!: MatDialogRef<XummDialogComponent>;

  constructor(private dialog: MatDialog) {}

  // public openErrorDialog(
  //   title = 'An error occured!',
  //   message = 'Please try again later.'
  // ) {
  //   this.errorDialogRef = this.dialog.open(ErrorDialogComponent, {
  //     data: {
  //       title: title,
  //       message: message,
  //     },
  //   });
  // }

  public openDonationDialog(
    title = 'Donate!',
    message = 'We will use it wisely.'
  ) {
    this.donationDialogRef = this.dialog.open(DonationDialogComponent, {
      data: {
        title: title,
        message: message,
      },
      // panelClass: 'orange-dark',
    });
  }

  public openAccountDialog() {
    this.accountDialogRef = this.dialog.open(AccountDialogComponent);
  }

  public openXummDialog(always: string, qr: string, disableClose = false) {
    this.xummDialogRef = this.dialog.open(XummDialogComponent, {
      data: { always: always, qr: qr },
      // disableClose: disableClose,
    });
  }
  public closeXummDialog() {
    this.xummDialogRef.close();
  }

  // public openCreateLoanDialog(data: CreateLoanDialog) {
  //   this.createLoanDialogRef = this.dialog.open(CreateLoanDialogComponent, {
  //     data: data,
  //     maxWidth: '100vw',
  //     maxHeight: '100vh',
  //     height: '100%',
  //     width: '100%',
  //     panelClass: 'full-screen-modal',
  //   });
  // }

  // public openCookieDialog() {
  //   this.cookieDialogRef = this.dialog.open(CookieDialogComponent);
  // }

  // public cookieAccept(): Observable<any> {
  //   return this.donationDialogRef.afterClosed().pipe(
  //     take(1),
  //     map((res) => {
  //       return res;
  //     })
  //   );
  // }

  public openVideoDialog(params: YT.PlayerOptions) {
    this.videoDialogRef = this.dialog.open(VideoDialogComponent, {
      // width: '90vw',
      // height: '90vw*9/16+120',
      backdropClass: 'bdrop',
      data: {
        ...params,
      },
    });
  }
}
